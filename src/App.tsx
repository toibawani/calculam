import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/workspace"
          element={<Workspace />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;