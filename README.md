# Behisebe

**Behisebe** (Amharic/Bengali for "accountant") is a native Android expense tracker built with Kotlin and Jetpack Compose. All data is stored locally using Room (SQLite). No network access, no accounts, no cloud.

## Features

- Add, edit, and delete expenses
- Assign expenses to categories (with emoji icon and color)
- Monthly summary with total spending
- Stats screen with a donut chart and per-category breakdown
- Browse historical months via ← → navigation
- Create, edit, and delete custom categories
- Fully offline — all data stored on-device with SQLite

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Kotlin |
| UI | Jetpack Compose + Material3 |
| Database | Room (SQLite) |
| Architecture | MVVM |
| Navigation | Navigation Compose |
| Build | Gradle (Kotlin DSL) |

## Getting Started

### Prerequisites
- Android Studio or a JDK + Android SDK setup
- A connected Android device or emulator (API 26+)

### Build & Run

```bash
# Install debug APK on connected device
./gradlew installDebug

# Build a debug APK
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk

# Clean
./gradlew clean
```

### VS Code Tasks
Two tasks are configured in `.vscode/tasks.json`:
- **Run on Device (Debug)** (`Ctrl+Shift+B`) — builds and installs on connected device
- **Build APK & Export** — builds and copies APK to `~/Behisebe.apk`

## Project Structure

```
app/src/main/kotlin/com/nil/behisebe/
├── BehisebeApp.kt           # Application class (lazy singletons)
├── MainActivity.kt
├── data/
│   ├── db/                  # Room DAOs + AppDatabase
│   ├── model/               # Category, Expense entities
│   └── repository/          # CategoryRepository, ExpenseRepository
├── ui/
│   ├── components/          # ExpenseItem, CategoryChip, DonutChart
│   ├── navigation/          # AppNavigation (bottom tabs + AddEdit)
│   ├── screens/
│   │   ├── home/            # Expense list grouped by month
│   │   ├── addedit/         # Add / edit expense form
│   │   ├── stats/           # Donut chart + category breakdown
│   │   └── categories/      # Category management
│   └── theme/               # Color, Type, Theme
└── utils/
    └── FormatUtils.kt       # Date & currency formatting
```

## License

MIT
