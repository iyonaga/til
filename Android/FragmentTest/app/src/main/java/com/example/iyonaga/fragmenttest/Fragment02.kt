package com.example.iyonaga.fragmenttest


import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.fragment_fragment02.*


// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_COUNTER = "counter"

/**
 * A simple [Fragment] subclass.
 * Use the [Fragment02.newInstance] factory method to
 * create an instance of this fragment.
 *
 */
class Fragment02 : Fragment() {
//    // TODO: Rename and change types of parameters
//    private var param1: String? = null
//    private var param2: String? = null
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        arguments?.let {
//            param1 = it.getString(ARG_PARAM1)
//            param2 = it.getString(ARG_PARAM2)
//        }
//    }
    private var cnt = 0

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_fragment02, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val args = arguments
        if (args != null) {
            val count = args.getInt(ARG_COUNTER)
            cnt = count + 1
            textview_02.text = "Fragment02: ${count}"
        }

        button_02.setOnClickListener {
            val fragmentManager = getFragmentManager()

            if (fragmentManager != null) {
                val fragmentTransaction = fragmentManager.beginTransaction()
                fragmentTransaction.apply {
                    addToBackStack(null)

                    replace(R.id.container, Fragment01.newInstance(cnt))
                    commit()
                }


            }
        }

        pop_02.setOnClickListener {
            val fragmentManager = getFragmentManager()
            if (fragmentManager != null) {
                fragmentManager.popBackStack()
            }
        }
    }


    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment Fragment02.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(count: Int) =
            Fragment02().apply {
                arguments = Bundle().apply {
                    putInt(ARG_COUNTER, count)
                }
            }
    }
}
