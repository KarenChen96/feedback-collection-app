import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "materialize-css/dist/css/materialize.min.css";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// arguemnt explanation:
// 1st: all the different producers insides our application, a dummy reducer here
// 2nd: used to deal with server side rendering, setting up some types of initail state
// const store = createStore(() => [], {}, applyMiddleware(reduxThunk));
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// ReactDOM takes 2 arguments: First is the root component;
// Second is where we render this component to inside of our dom.
// Here, we want to render it to App component.

// root is inside of index.html in public folder
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
