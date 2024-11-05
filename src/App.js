import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utilities/PrivateRoute.jsx";
import store from "./redux/store";
import { Group } from "./components/group/Group.jsx";
import Login from "./components/login/Login";
import authToken from "./utilities/authToken.js";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      authToken(localStorage.token);
    }

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>
              <Group />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;