import React from "react";
import ReactDOM from "react-dom";
import "./map.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Si vous souhaitez que votre application fonctionne hors connexion et se charge plus rapidement, vous pouvez modifier
// unregister() pour register() ci-dessous. Notez que cela comporte quelques pièges.
// En savoir plus sur serviceWorker : https://bit.ly/CRA-PWA
serviceWorker.unregister();
