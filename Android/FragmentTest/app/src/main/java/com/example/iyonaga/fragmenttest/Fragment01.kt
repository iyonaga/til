package com.example.iyonaga.fragmenttest


import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.fragment_fragment01.*


// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_COUNTER = "counter"

/**
 * A simple [Fragment] subclass.
 * Use the [Fragment01.newInstance] factory method to
 * create an instance of this fragment.
 *
 */
class Fragment01 : Fragment() {
    // TODO: Rename and change types of parameters
//    private var param1: String? = null

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        arguments?.let {
//            param1 = it.getString(ARG_PARAM1)
//        }
//    }

    private var cnt = 0

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_fragment01, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val args = arguments
        if (args != null) {
            val count = args.getInt(ARG_COUNTER)
            cnt = count + 1
            textview_01.text = "Fragment01: ${count}"
        }

        button_01.setOnClickListener {
            val fragmentManager = getFragmentManager()

            if (fragmentManager != null) {
                val fragmentTransaction = fragmentManager.beginTransaction()
                fragmentTransaction.apply {
                    addToBackStack(null)

                    replace(R.id.container, Fragment02.newInstance(cnt))
                    commit()
                }

            }
        }

        pop_01.setOnClickListener {
            val fragmentManager = getFragmentManager()
            if (fragmentManager != null) {
                fragmentManager.popBackStack()
            }
        }
    }


    companion object {
        fun newInstance(count: Int) =
            Fragment01().apply {
                arguments = Bundle().apply {
                    putInt(ARG_COUNTER, count)
                }
            }
    }
}
