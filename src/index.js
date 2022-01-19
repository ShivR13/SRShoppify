import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
ReactDOM.render(
  <Auth0Provider
    domain="shivaneeratnaparkhi.us.auth0.com"
    clientId="gBPU0PZt2PU5urz5QtpdYbxpXO0yRXqg"
    redirectUri="http://localhost:3000"
    cacheLocation="localstorage"
  >
    <AppWrapper />
  </Auth0Provider>,
  document.getElementById("root")
);
