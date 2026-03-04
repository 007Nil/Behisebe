# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Behisebe** (Amharic/Bengali for "accountant") is a native Android expense tracker built with Kotlin and Jetpack Compose. All data is stored locally using Room (SQLite). No network access.

## Commands

```bash
# Build debug APK
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug

# Build release APK
./gradlew assembleRelease

# Clean
./gradlew clean
```

## Architecture

Standard Android MVVM with a clean layered structure:

```
UI (Compose Screens)  →  ViewModel  →  Repository  →  Room DAO  →  SQLite
```

### Source root
`app/src/main/kotlin/com/nil/behisebe/`

### Layers

**Data layer** (`data/`):
- `model/` — Room `@Entity` data classes: `Category`, `Expense`, `ExpenseWithCategory` (relation)
- `db/` — `CategoryDao`, `ExpenseDao`, `AppDatabase` (singleton; seeds default categories on first create)
- `repository/` — `ExpenseRepository`, `CategoryRepository` (thin wrappers over DAOs, expose `Flow`)

**UI layer** (`ui/`):
- `theme/` — `BehisebeTheme`, `Color.kt`, `Type.kt` (light & minimal color scheme)
- `navigation/AppNavigation.kt` — Single `NavHost` with bottom nav: Home | Stats | Categories. AddEdit is a full-screen destination pushed on top.
- `screens/home/` — Expense list grouped by month with a total card. Month filter chips at top.
- `screens/addedit/` — Add or edit an expense. Amount, note, date picker, horizontal category chip row.
- `screens/stats/` — Category breakdown with percentage progress bars for the selected month.
- `screens/categories/` — Manage categories (name, emoji icon, color). Add via dialog.
- `components/` — `ExpenseItem`, `CategoryChip` (shared composables)

**Application class** (`BehisebeApp`): Holds lazy singletons for `AppDatabase`, `ExpenseRepository`, `CategoryRepository`. ViewModels access repos via `(app as BehisebeApp).expenseRepository`.

### Database schema

| Table | Key columns |
|---|---|
| `categories` | `id`, `name`, `icon` (emoji), `color` (ARGB Int) |
| `expenses` | `id`, `amount`, `note`, `categoryId` (FK → categories, SET NULL), `date` (ISO `yyyy-MM-dd`) |

Default categories are seeded in `AppDatabase.Companion.seedDefaultCategories()` on first DB create.

### Date handling
Dates stored as ISO strings (`yyyy-MM-dd`). Formatting utilities in `utils/FormatUtils.kt`: `toIso()`, `toDisplayDate()`, `toDisplayMonth()`, `toCurrency()`.

## Key dependencies (version catalog at `gradle/libs.versions.toml`)
- Jetpack Compose BOM `2024.09.03`
- Room `2.6.1` with KSP
- Navigation Compose `2.8.2`
- Vico charts (`compose-m3`) — available but not yet wired in; for future chart enhancements
