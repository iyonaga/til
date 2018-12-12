package com.example.iyonaga.sleeptimer

import android.content.*
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.IBinder
import android.preference.PreferenceManager
import android.support.v4.content.LocalBroadcastManager
import android.util.Log
import android.view.View
import com.triggertrap.seekarc.SeekArc
import kotlinx.android.synthetic.main.activity_sleep_timer.*

class SleepTimerActivity : AppCompatActivity() {

    companion object {
        const val ACTION_TIMER_FINISH = "com.example.iyonaga.sleeptimer.ACTION_TIMER_FINISH"
        const val ACTION_TIMER_UPDATE = "com.example.iyonaga.sleeptimer.ACTION_TIMER_UPDATE"
    }

    private var mService: SleepTimerService? = null
    private var mBound = false

    private var lastUsedTimePreference
        get() = PreferenceManager.getDefaultSharedPreferences(this)
            .getInt(getString(R.string.preference_last_used_time_key), resources.getInteger(R.integer.default_time))
        set(value) = PreferenceManager.getDefaultSharedPreferences(this)
            .edit()
            .putInt(getString(R.string.preference_last_used_time_key), value)
            .apply()

    private val broadcastReceiver = object: BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            Log.d("SleeptimerAc", "onReceive")
            when (intent?.action) {
                ACTION_TIMER_UPDATE -> handleTimerUpdate(
                    intent.getIntExtra("timeLeft", 0)
                )
                ACTION_TIMER_FINISH -> handletimerFinished()
            }
        }
    }

    private val mConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as SleepTimerService.LocalBinder
            mService = binder.getService()
            mBound = true
            updateUiAfterBinding()
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            mBound = false
        }
    }

    private fun updateUiAfterBinding() {
        if (mService!!.running) {
            handleTimerUpdate(mService!!.timeLeft)
            updateUiTimeRunning()
        } else {
            seekArc.progress = lastUsedTimePreference
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sleep_timer)

        val serviceToStart = Intent(this, SleepTimerService::class.java)
        bindService(serviceToStart, mConnection, Context.BIND_AUTO_CREATE)

        seekArc.setOnSeekArcChangeListener(object : SeekArc.OnSeekArcChangeListener {
            override fun onProgressChanged(p0: SeekArc?, p1: Int, p2: Boolean) {
                seekArcProgress.text = String.format(resources.getString(R.string.progress_text), p1)
            }

            override fun onStartTrackingTouch(p0: SeekArc?) {}

            override fun onStopTrackingTouch(p0: SeekArc?) {}

        })

        startButton.setOnClickListener {
            startTimer()
        }

        stopButton.setOnClickListener {
            stopTimer()
        }

        extendButton.setOnClickListener {
            extendTimer()
        }

        val intentFilter = IntentFilter(ACTION_TIMER_FINISH)
            intentFilter.addAction(ACTION_TIMER_UPDATE)

        LocalBroadcastManager.getInstance(this)
            .registerReceiver(broadcastReceiver, intentFilter)
    }

    override fun onDestroy() {
        super.onDestroy()
        val serviceStop = Intent(this, SleepTimerService::class.java)
        if (mService!!.running) stopService(serviceStop)
        unbindService(mConnection)
        LocalBroadcastManager.getInstance(this)
            .unregisterReceiver(broadcastReceiver)
    }

    fun startTimer() {
        val timerValueInMinutes = seekArc.progress
        Log.d("SleeptimerAc", timerValueInMinutes.toString())
        lastUsedTimePreference = timerValueInMinutes

        val serviceToStart = Intent(this, SleepTimerService::class.java)
        startService(serviceToStart)

        mService?.startTimer(timerValueInMinutes)
        updateUiTimeRunning()
    }

    fun stopTimer() {
        mService?.stopTimerService()
        updateUiTimerStopped()
    }

    fun extendTimer() {
        mService?.extendTimer()
    }

    private fun handleTimerUpdate(timeLeft: Int) {
        seekArc.progress = timeLeft
    }

    private fun handletimerFinished() {
        updateUiTimerStopped()
        seekArc.progress = lastUsedTimePreference
    }

    private fun updateUiTimeRunning() {
        startButton.visibility = View.GONE
        stopButton.visibility = View.VISIBLE
        extendButton.visibility = View.VISIBLE
        seekArc.isEnabled = false
    }

    private fun updateUiTimerStopped() {
        startButton.visibility = View.VISIBLE
        stopButton.visibility = View.GONE
        extendButton.visibility = View.GONE
        seekArc.isEnabled = true
    }
}
