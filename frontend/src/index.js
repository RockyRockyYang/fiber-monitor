import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EventsContextProvider } from './store/events-context'
import { RoutesContextProvider } from './store/routes-context'
import { FiltersContextProvider } from './store/filters-context'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EventsContextProvider>
      <RoutesContextProvider>
        <FiltersContextProvider>
          <App />
        </FiltersContextProvider>
      </RoutesContextProvider>
    </EventsContextProvider>
  </React.StrictMode>
);
