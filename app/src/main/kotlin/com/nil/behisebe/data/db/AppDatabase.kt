package com.nil.behisebe.data.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.nil.behisebe.data.model.Category
import com.nil.behisebe.data.model.Expense
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Database(entities = [Category::class, Expense::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun categoryDao(): CategoryDao
    abstract fun expenseDao(): ExpenseDao

    companion object {
        @Volatile private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "behisebe.db"
                )
                    .addCallback(object : Callback() {
                        override fun onCreate(db: SupportSQLiteDatabase) {
                            super.onCreate(db)
                            INSTANCE?.let { database ->
                                CoroutineScope(Dispatchers.IO).launch {
                                    seedDefaultCategories(database.categoryDao())
                                }
                            }
                        }
                    })
                    .build()
                    .also { INSTANCE = it }
            }

        private suspend fun seedDefaultCategories(dao: CategoryDao) {
            dao.insertAll(
                listOf(
                    Category(name = "Food",          icon = "🍔", color = 0xFFFF6B6B.toInt()),
                    Category(name = "Transport",      icon = "🚌", color = 0xFF4ECDC4.toInt()),
                    Category(name = "Shopping",       icon = "🛍️", color = 0xFFA78BFA.toInt()),
                    Category(name = "Health",         icon = "💊", color = 0xFF34D399.toInt()),
                    Category(name = "Entertainment",  icon = "🎬", color = 0xFFFB923C.toInt()),
                    Category(name = "Bills",          icon = "⚡", color = 0xFF60A5FA.toInt()),
                    Category(name = "Other",          icon = "📦", color = 0xFF94A3B8.toInt()),
                )
            )
        }
    }
}
