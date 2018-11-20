package com.example.iyonaga.android_and_ios

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.example.iyonaga.android_and_ios.common.createApplicationScreenMessage
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        textView.text = createApplicationScreenMessage()
    }
}
