import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { LS_KEY_NOTES } from "./constants/ls-keys";

import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

import Auth from "./pages/Auth";
import { Home } from "./pages/Home";
import { ListView } from "./pages/ListView";
import { SharedLayout } from "./pages/SharedLayout";
import { AddNote } from "./pages/AddNote";
import { EditNote } from "./pages/EditNote";

function App() {
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem(LS_KEY_NOTES));
    if (!notes) {
      localStorage.setItem(LS_KEY_NOTES, JSON.stringify({}));
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<PublicRoute restricted={true} component={<Home />} />}
      />
      <Route
        path="/signin"
        element={<PublicRoute restricted={true} component={<Auth />} />}
      />
      <Route
        path="/signup"
        element={<PublicRoute restricted={true} component={<Auth />} />}
      />

      <Route path="/" element={<PrivateRoute component={<SharedLayout />} />}>
        <Route
          path="/list"
          element={<PrivateRoute component={<ListView />} />}
        />
        <Route path="/add" element={<PrivateRoute component={<AddNote />} />} />
        <Route
          path="/edit/:id"
          element={<PrivateRoute component={<EditNote />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
