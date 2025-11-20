# Expanse Tracker

A minimal client-side expense tracker that stores entries and the current balance in the browser's localStorage.

## Files
- [tracker.html](tracker.html) — main UI
- [style.css](style.css) — styles
- [script.js](script.js) — application logic
- [README.md](README.md) — this file

## Key features
- Add income and expenses using the UI.
- Persistent data via localStorage.
- Switch currency between dollars and euros.
- Filter entries by type and by date.

## How to run
1. Open [tracker.html](tracker.html) in a browser.
2. (Optional) Serve the folder with a local server for full browser behavior:
   - Python: `python -m http.server`
   - npm: `npx http-server` or `npx live-server`

## Usage
- Click "Add Money" or "Add Expense" to open the entry modal (`openEntryMenu`).
- Fill amount and reason, then submit (`createEntry`).
- Delete an entry with the "Delete" button (`removeEntry`).
- Change currency with the "Change Currency" filter (`changeCurrency`).
- Filter entries by type using the Filters dropdown (wired to `displayEntries`).
- Find entries by date using the date filter modal (`toggleDateFilter`, `filterDate`).

D## eveloper notes
- Main logic lives in [script.js](script.js). Important symbols:
  - [`Entry`](script.js)
  - [`createEntry`](script.js)
  - [`updateTotal`](script.js)
  - [`displayEntries`](script.js)
  - [`removeEntry`](script.js)
  - [`changeCurrency`](script.js)
  - [`filterDate`](script.js)
  - [`toggleDateFilter`](script.js)
- Styling in [style.css](style.css).

## Known issues / TODO
- Improve validation and UX for date inputs.
- Fix a stray quote in the filtered HTML template in [`displayEntries`](script.js).
- Polish currency conversion and rounding logic in [`updateTotal`](script.js).
- Add unit tests and modularize code.

## License
- MIT

## Author/Developer
- Zdravko Georgiev