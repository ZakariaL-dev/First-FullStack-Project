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

function App() {
  const [Theme, setTheme] = useState("light");
  const [Show, setShow] = useState("hidden");
  const [ShowUpdate, setShowUpdate] = useState("hidden");
  return (
    <ToggleThemeContext.Provider value={{ Theme, setTheme }}>
      <div className={`${Theme} bg-[var(--bodybg)] relative min-h-screen `}>
        <ToggleDialogContext.Provider value={{ Show, setShow }}>
          <ToggleUpdateContext.Provider value={{ ShowUpdate, setShowUpdate }}>
            <NavBar />
            <AddDemoDialog />
            <DemoDisplay />
          </ToggleUpdateContext.Provider>
        </ToggleDialogContext.Provider>
      </div>
    </ToggleThemeContext.Provider>
  );
}

export default App;
