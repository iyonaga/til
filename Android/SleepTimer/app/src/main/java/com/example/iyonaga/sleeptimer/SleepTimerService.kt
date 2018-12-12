package com.example.iyonaga.sleeptimer

import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.CountDownTimer
import android.os.IBinder
import android.preference.PreferenceManager
import android.support.v4.content.LocalBroadcastManager
import android.util.Log
import kotlin.math.roundToInt

class SleepTimerService : Service() {

    companion object {
        const val ACTION_EXTEND_TIMER = "com.example.iyonaga.sleeptimer.ACTION_EXTEND_TIMER"
        const val ACTION_STOP_TIMER = "com.example.iyonaga.sleeptimer.ACTION_STOP_TIMER"
    }

    private val mBinder = LocalBinder()
    private var countDownTimer:CountDownTimer? = null

    var timeLeft = 0
    var running = false

    inner class LocalBinder: Binder() {
        fun getService(): SleepTimerService {
            return this@SleepTimerService
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return mBinder
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("SleeptimerAc", "${intent?.action}")
        when (intent?.action) {
            ACTION_EXTEND_TIMER -> extendTimer()
            ACTION_STOP_TIMER -> stopTimerService()
        }
        return super.onStartCommand(intent, flags, startId)
    }

    fun startTimer(timerValueInMinutes: Int) {
        val timerValueInMs = (timerValueInMinutes * 60 * 1000).toLong()

        countDownTimer = object : CountDownTimer(timerValueInMs, 600) {

            override fun onTick(millisUntilFinished: Long) {
                timeLeft = (millisUntilFinished / 60.0 / 1000.0).roundToInt()
                Log.d("SleeptimerAc", "${millisUntilFinished}")
                sendTimerUpdateBroadcast()
            }

            override fun onFinish() {
                Log.d("SleeptimerAc", "finished")
                timeLeft = 0
                stopTimerService()
            }

        }.start()
    }

    fun stopTimerService() {
        running = false
        countDownTimer?.cancel()
        sendTimerFinishedBroadcast()
        stopSelf()
    }

    fun extendTimer() {
        val extendTime = PreferenceManager.getDefaultSharedPreferences(this)
            .getInt(getString(R.string.preference_extend_time_key), resources.getInteger(R.integer.preference_extend_time_default))
        val newTime = timeLeft + extendTime
        countDownTimer?.cancel()
        startTimer(newTime)
    }

    private fun sendTimerUpdateBroadcast() {
        val timerUpdateBroadcast = Intent(SleepTimerActivity.ACTION_TIMER_UPDATE)
            .putExtra("timeLeft", timeLeft)
        LocalBroadcastManager.getInstance(this@SleepTimerService)
            .sendBroadcast(timerUpdateBroadcast)
    }

    private fun sendTimerFinishedBroadcast() {
        val timerFinishedBroadcast = Intent(SleepTimerActivity.ACTION_TIMER_FINISH)
        LocalBroadcastManager.getInstance(this@SleepTimerService)
            .sendBroadcast(timerFinishedBroadcast)
    }
}