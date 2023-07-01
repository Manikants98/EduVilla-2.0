import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { Store } from "../src/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
    <Provider store={Store}>
      <QueryClientProvider client={client}>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          toastClassName="!rounded !mx-10 top-3 lg:!mx-0"
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <App />
      </QueryClientProvider>
    </Provider>
  </SnackbarProvider>
);
