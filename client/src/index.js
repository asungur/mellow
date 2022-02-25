import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from "./lib/Store";
import Application from "./components/Application";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <Application />
        </DndProvider>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
