import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {router} from "./routes/router.jsx";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
