import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const { store, persistor } = reduxStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
