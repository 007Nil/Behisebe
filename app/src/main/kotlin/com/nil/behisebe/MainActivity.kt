package com.nil.behisebe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.nil.behisebe.ui.navigation.AppNavigation
import com.nil.behisebe.ui.theme.BehisebeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BehisebeTheme {
                AppNavigation()
            }
        }
    }
}
