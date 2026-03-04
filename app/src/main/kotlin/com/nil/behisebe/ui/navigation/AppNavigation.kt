package com.nil.behisebe.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.nil.behisebe.ui.screens.addedit.AddEditScreen
import com.nil.behisebe.ui.screens.categories.CategoriesScreen
import com.nil.behisebe.ui.screens.home.HomeScreen
import com.nil.behisebe.ui.screens.stats.StatsScreen

sealed class Screen(val route: String, val label: String) {
    object Home : Screen("home", "Home")
    object Stats : Screen("stats", "Stats")
    object Categories : Screen("categories", "Categories")
    object AddEdit : Screen("add_edit?expenseId={expenseId}", "Add")
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val topLevelRoutes = listOf(Screen.Home, Screen.Stats, Screen.Categories)

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination
    val showBottomBar = topLevelRoutes.any { it.route == currentDestination?.route }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar {
                    topLevelRoutes.forEach { screen ->
                        NavigationBarItem(
                            selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = {
                                Icon(
                                    imageVector = when (screen) {
                                        Screen.Home -> Icons.Default.Home
                                        Screen.Stats -> Icons.Default.BarChart
                                        Screen.Categories -> Icons.Default.Category
                                        else -> Icons.Default.Add
                                    },
                                    contentDescription = screen.label
                                )
                            },
                            label = { Text(screen.label) }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding),
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onAddExpense = { navController.navigate("add_edit") },
                    onEditExpense = { id -> navController.navigate("add_edit?expenseId=$id") },
                )
            }
            composable(Screen.Stats.route) {
                StatsScreen()
            }
            composable(Screen.Categories.route) {
                CategoriesScreen()
            }
            composable(
                route = Screen.AddEdit.route,
                arguments = listOf(navArgument("expenseId") {
                    type = NavType.LongType
                    defaultValue = -1L
                })
            ) { backStackEntry ->
                val expenseId = backStackEntry.arguments?.getLong("expenseId") ?: -1L
                AddEditScreen(
                    expenseId = if (expenseId == -1L) null else expenseId,
                    onDone = { navController.popBackStack() },
                )
            }
        }
    }
}
