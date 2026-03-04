package com.nil.behisebe.ui.screens.addedit

import android.app.DatePickerDialog
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nil.behisebe.ui.components.CategoryChip
import com.nil.behisebe.utils.toDisplayDate
import com.nil.behisebe.utils.toIso
import java.time.LocalDate

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddEditScreen(
    expenseId: Long?,
    onDone: () -> Unit,
    viewModel: AddEditViewModel = viewModel(),
) {
    val state by viewModel.uiState.collectAsState()
    val categories by viewModel.categories.collectAsState()
    val context = LocalContext.current

    LaunchedEffect(expenseId) {
        if (expenseId != null) viewModel.loadExpense(expenseId)
    }

    LaunchedEffect(state.isSaved) {
        if (state.isSaved) onDone()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (expenseId != null) "Edit Expense" else "Add Expense") },
                navigationIcon = {
                    IconButton(onClick = onDone) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            // Amount
            OutlinedTextField(
                value = state.amountText,
                onValueChange = viewModel::onAmountChange,
                label = { Text("Amount (₹)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.fillMaxWidth(),
                textStyle = MaterialTheme.typography.headlineMedium,
                singleLine = true,
            )

            // Note
            OutlinedTextField(
                value = state.note,
                onValueChange = viewModel::onNoteChange,
                label = { Text("Note (optional)") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
            )

            // Date
            OutlinedTextField(
                value = state.date.toIso().toDisplayDate(),
                onValueChange = {},
                label = { Text("Date") },
                readOnly = true,
                modifier = Modifier.fillMaxWidth(),
                trailingIcon = {
                    IconButton(onClick = {
                        val d = state.date
                        DatePickerDialog(context, { _, y, m, day ->
                            viewModel.onDateChange(LocalDate.of(y, m + 1, day))
                        }, d.year, d.monthValue - 1, d.dayOfMonth).show()
                    }) {
                        Icon(Icons.Default.CalendarToday, contentDescription = "Pick date")
                    }
                }
            )

            // Category picker
            Text("Category", style = MaterialTheme.typography.titleMedium)
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                categories.forEach { cat ->
                    CategoryChip(
                        category = cat,
                        selected = cat.id == state.selectedCategoryId,
                        onClick = {
                            viewModel.onCategorySelected(
                                if (cat.id == state.selectedCategoryId) null else cat.id
                            )
                        },
                    )
                }
            }

            Spacer(Modifier.height(8.dp))

            Button(
                onClick = { viewModel.save(expenseId) },
                enabled = state.amountText.toDoubleOrNull() != null,
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text(if (expenseId != null) "Update" else "Save")
            }
        }
    }
}
