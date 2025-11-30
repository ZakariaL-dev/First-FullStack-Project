import "./index.css";
import NavBar from "./Components/NavBar";
import DemoDisplay from "./Components/DemoDisplay";
import AddDemoDialog from "./Components/AddDemoDialog";
import { ToggleThemeContext } from "./Context/DarkLightContext";
import { useState } from "react";
import {
  ToggleDialogContext,
  ToggleUpdateContext,
} from "./Context/ToggleDialogContext";
import Login from "./Components/LogIn";
import Signup from "./Components/SignUP";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [Theme, setTheme] = useState("light");
  const [Show, setShow] = useState("hidden");
  const [ShowUpdate, setShowUpdate] = useState("hidden");
  return (
    <ToggleThemeContext.Provider value={{ Theme, setTheme }}>
      <div className={`${Theme} bg-[var(--bodybg)] relative min-h-screen `}>
        <ToggleDialogContext.Provider value={{ Show, setShow }}>
          <ToggleUpdateContext.Provider value={{ ShowUpdate, setShowUpdate }}>
            {/*  */}
            <Router>
              <NavBar />
              <AddDemoDialog />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoutes />}>
                  <Route exact path="/demostore" element={<DemoDisplay />} />
                </Route>
              </Routes>
            </Router>
            {/*  */}
          </ToggleUpdateContext.Provider>
        </ToggleDialogContext.Provider>
      </div>
    </ToggleThemeContext.Provider>
  );
}

export default App;
