import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;