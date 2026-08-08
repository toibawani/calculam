import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import About from "./pages/About";

import BasicCalculatorPage from "./pages/BasicCalculator";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/workspace" element={<Workspace />} />
  <Route path="/workspace/basic" element={<BasicCalculatorPage />} />
  <Route path="/about" element={<About />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;