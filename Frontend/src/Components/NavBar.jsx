import { MdAddCircleOutline } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

// MUI
import IconButton from "@mui/material/IconButton";

import { useContext } from "react";
import { ToggleThemeContext } from "../Context/DarkLightContext";
import { ToggleDialogContext } from "../Context/ToggleDialogContext";

const NavBar = () => {
  const { Theme, setTheme } = useContext(ToggleThemeContext);
  const { Show, setShow } = useContext(ToggleDialogContext);
  function ToggleTheme() {
    if (Theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <div className="w-full bg-[var(--navbg)] flex flex-wrap px-15 py-3 items-center justify-between">
      <h1 className="flex items-center text-[var(--navtxt)] gap-2">
        <p className="text-3xl font-bold">Demo Store </p>
        <LuShoppingCart className="text-2xl font-medium" />
      </h1>
      <div>
        <IconButton onClick={() => setShow("Block")}>
          <MdAddCircleOutline className="text-[var(--navbtn)] text-2xl" />
        </IconButton>
        <IconButton onClick={() => ToggleTheme()}>
          {Theme === "dark" ? (
            <MdOutlineWbSunny className="text-[var(--navbtn)] text-2xl" />
          ) : (
            <IoMoonOutline className="text-[var(--navbtn)] text-2xl" />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default NavBar;
