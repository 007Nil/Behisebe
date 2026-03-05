package com.nil.behisebe.ui.screens.stats

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.lifecycle.viewmodel.compose.viewModel
import com.nil.behisebe.ui.components.DonutChart
import com.nil.behisebe.ui.components.DonutSlice
import com.nil.behisebe.utils.toCurrency
import com.nil.behisebe.utils.toDisplayMonth

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StatsScreen(viewModel: StatsViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsState()

    val currentIndex = state.months.indexOf(state.selectedMonth)
    val canGoPrev = currentIndex < state.months.size - 1
    val canGoNext = currentIndex > 0
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("Stats") },
                scrollBehavior = scrollBehavior,
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
                .padding(padding)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Spacer(Modifier.height(8.dp))

            // Month navigator: <- March 2026 ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                IconButton(
                    onClick = { if (canGoPrev) viewModel.selectMonth(state.months[currentIndex + 1]) },
                    enabled = canGoPrev,
                ) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Previous month")
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = state.selectedMonth.toDisplayMonth(),
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                    )
                    Text(
                        text = state.grandTotal.toCurrency(),
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold,
                    )
                }
                IconButton(
                    onClick = { if (canGoNext) viewModel.selectMonth(state.months[currentIndex - 1]) },
                    enabled = canGoNext,
                ) {
                    Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = "Next month")
                }
            }

            Spacer(Modifier.height(24.dp))

            if (state.categoryTotals.isEmpty()) {
                Box(
                    Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        "No expenses this month.",
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            } else {
                // Donut chart
                val slices = state.categoryTotals.map { ct ->
                    DonutSlice(
                        color = ct.category?.let { Color(it.color) } ?: Color(0xFF94A3B8),
                        fraction = if (state.grandTotal > 0) (ct.total / state.grandTotal).toFloat() else 0f,
                    )
                }
                DonutChart(
                    slices = slices,
                    centerLabel = "${state.categoryTotals.size} categories",
                )

                Spacer(Modifier.height(28.dp))

                // Category breakdown list
                Text(
                    text = "Breakdown",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                )
                Spacer(Modifier.height(8.dp))

                state.categoryTotals.forEach { ct ->
                    val fraction = if (state.grandTotal > 0) ct.total / state.grandTotal else 0.0
                    val color = ct.category?.let { Color(it.color) } ?: Color(0xFF94A3B8)

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 4.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(MaterialTheme.colorScheme.surface)
                            .padding(12.dp),
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(color.copy(alpha = 0.15f)),
                                contentAlignment = Alignment.Center,
                            ) {
                                Text(ct.category?.icon ?: "📦")
                            }
                            Spacer(Modifier.width(10.dp))
                            Column(Modifier.weight(1f)) {
                                Text(
                                    ct.category?.name ?: "Uncategorised",
                                    style = MaterialTheme.typography.titleMedium,
                                )
                                Text(
                                    "%.0f%%".format(fraction * 100),
                                    style = MaterialTheme.typography.labelMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                            Text(
                                ct.total.toCurrency(),
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.SemiBold,
                            )
                        }
                        Spacer(Modifier.height(8.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(6.dp)
                                .clip(RoundedCornerShape(3.dp))
                                .background(color.copy(alpha = 0.15f)),
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth(fraction.toFloat().coerceIn(0f, 1f))
                                    .height(6.dp)
                                    .clip(RoundedCornerShape(3.dp))
                                    .background(color),
                            )
                        }
                    }
                }
            }
            Spacer(Modifier.height(16.dp))
        }
    }
}
