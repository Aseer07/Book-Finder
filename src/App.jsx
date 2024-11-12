import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopNavbar from "./components/Navbar";
import Home from "./page/Home";
import About from "./page/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
