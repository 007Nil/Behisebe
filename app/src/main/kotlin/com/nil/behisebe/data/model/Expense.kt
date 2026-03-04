package com.nil.behisebe.data.model

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey
import androidx.room.Relation

@Entity(
    tableName = "expenses",
    foreignKeys = [
        ForeignKey(
            entity = Category::class,
            parentColumns = ["id"],
            childColumns = ["categoryId"],
            onDelete = ForeignKey.SET_NULL,
        )
    ]
)
data class Expense(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val amount: Double,
    val note: String = "",
    val categoryId: Long?,
    val date: String, // ISO date: yyyy-MM-dd
)

data class ExpenseWithCategory(
    @Embedded val expense: Expense,
    @Relation(parentColumn = "categoryId", entityColumn = "id")
    val category: Category?,
)
