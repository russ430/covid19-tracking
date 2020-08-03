# U.S. Coronavirus Tracking

A simple web app created to track the current COVID-19 Coronavirus pandemic in the United States.

You can find the live project [here](https://us-coronavirus-tracking.netlify.app).

## About

I developed this project because I wanted to create a simple dashboard to view how the U.S. was doing with its fight against the coronavirus pandemic. The dashboard includes an interactive graph that changes depending on the type of data selected and the state or territory selected, a sortable data table which holds current data for every U.S. state and territory, and lastly a sidebar that contains a list of links to coronavirus-related resources posted daily by the CDC.

In an effort to reduce network requests all data for individual states is cached in session storage in the browser after the initial request.

This project was developed using the JavaScript library React, the state management container Redux, and the graph was created with d3.js. Styling was done using styled-components and icons were used from react-icons.

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [d3](https://d3js.org/)
* [styled-components](https://styled-components.com/)
* [react-icons](https://react-icons.github.io/)

## Author

[Alex Russian](https://github.com/russ430)

## License

The data for this project is obtained from [The Covid Tracking Project](https://covidtracking.com) at The Atlantic and is used and published under a [Creative Commons CC BY-NC-4.0 License](https://creativecommons.org/licenses/by-nc/4.0/).

This project is licensed under the MIT License.
