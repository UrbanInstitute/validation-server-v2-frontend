# Changelog

All changes will be recorded in this document.

## 0.8.2

### Enhancement

- Show extra columns from CSV table (if they exist)

## 0.8.1

### Bug Fixes

- Sort data for area plot by X values to remove odd clips of shaded area in privacy graph

## 0.8.0

### Enhancements

- Add download script button to accordion
- Add delete job button to accordion
- Add Google Tag Manager datalayers

### Bug Fixes

- Change values that a NaN to N/A or keep N/A
- Change "Initial Results Available" to "Results Available"
- Add error message in analysis list
- Show "Released" for only the released analysis on step 2
- Change text on release dialog
- Change text on refine dialog
- Show new release instead of new results when model is released
- Navigate back to run result rather than release after refinement

## 0.7.0

### Enhancements

- Remove login button when logged out
- Update notification query to include userID
- Update "Step 1. Submit a Script" text
- Update "Step 3. Release Final Results" text
- Update About Page text
- Update Help Page text

## 0.6.1

### Bug Fix

- Fix estimate column in refine run table
- Fix display of error and estimate in privacy graph

## 0.6.0

### New Features

- Toasts added for notifications to make them more visible

### Enhancements

- Formatting of numbers adds commas and rounds to 2 decimal points
- Fewer notifications overall
- Added wait screen between script submit and step 2

## 0.5.0

### New Features

- Split csv restults into analyses and added individual view
- Added onHover animation and tooltip to graph

### Enhancements

- Improved notification timestamps
- Added job timestamps to jobs list
- Re-worked new script routing to avoid dash on header under dashboard
- Fixed labeling on graph when near edge
- Improved labelling and text on pages

## 0.4.0

### New Features

- Added links in notifications
- Added release results step
- Added download release values button to analyses table
- Added refinement and release values to table

### Enhancements

- Cleaned up formatting on pages to remove clipped components
- Improved plot
- Various component improvements based on QA

## 0.3.0

### New Features

- Added notifications for updates on runs
- Added confirmation dialog for submitting refinement
- Cleanup components
- Add Feature flags provider

## 0.2.0

### New Features

- View Privacy vs. Noise graph
- Edit epsilon for one or multiple stats
- Submit a refinement

## 0.1.0

### New Features

- App is dockerized
- About, Help & Dashboard pages added
- Added authentication with server
- Upload script and create new job

## 0.0.0

- Initial App framework
- Core components created
