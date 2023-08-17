import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./components/AuthWrapper";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <AuthWrapper> */}
        <App />
        {/* </AuthWrapper> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
