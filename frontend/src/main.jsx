import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.jsx";
import languageChange from "./i18n"; // Import the i18n configuration
import { I18nextProvider } from "react-i18next";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={languageChange}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
