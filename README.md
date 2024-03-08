# Timeseries Data Visualization

## Description
This project is a Vue.js application for visualizing time-series data. 
It includes a table to display time-series values and a line chart to help users understand trends over time.

## Core Requirements
- **Framework Choice**: The application is developed using Vue.js.
- **Data Representation**: 
  - The application uses a JSON file with 3 timeseries datasets, each containing timestamps and values.
  - It displays the timeseries values in a table.
  - The data is visualized using a line chart with trends over time.

## Enhanced Features
The application also includes the following enhanced features:
- **Data Filtering**:
  - Implemented a date range picker allowing users to filter data in the table and chart based on selected start and end dates.
  - The data can be updated automatically when the date range changes.
- **Interactive Data Control**:
  - Added checkboxes for each time-series dataset, enabling users to show or hide specific datasets in the chart.

## Dependencies
- **Vue.js**: Main framework for building the application.
- **Vuex**: For state management in Vue applications.
- **Moment.js**: For manipulating and formatting dates.
- **@vuepic/vue-datepicker**: Date picker component for selecting date ranges.
- **vue3-apexcharts**: Vue.js wrapper for ApexCharts library.
- **apexcharts**: Library for creating interactive charts.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Scripts
- `dev`: Run the development server with Vite.
- `build`: Build the project for production.
- `preview`: Preview the built project locally.

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Visit `http://localhost:5173` to view the application. (Default port in Vite)