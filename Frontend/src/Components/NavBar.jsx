import { MdAddCircleOutline } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

// MUI
import IconButton from "@mui/material/IconButton";

import { useContext } from "react";
import { ToggleThemeContext } from "../Context/DarkLightContext";
import { ToggleDialogContext } from "../Context/ToggleDialogContext";
import AvatarIcon from "./Avatar";

import { Link } from "react-router-dom";

// Utility function defined outside the component
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Check the cookie once to get the initial boolean state
const initialUserPreStatus = getCookie("User_Registered") === "true";

const NavBar = () => {
  const { Theme, setTheme } = useContext(ToggleThemeContext);
  const { setShow } = useContext(ToggleDialogContext);
  function ToggleTheme() {
    if (Theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <div className="w-full bg-[var(--navbg)] flex flex-wrap px-15 py-3 items-center justify-between">
      <Link to={"/"}>
        <h1 className="flex items-center text-[var(--navtxt)] gap-2">
          <p className="text-3xl font-bold">Demo Store </p>
          <LuShoppingCart className="text-2xl font-medium" />
        </h1>
      </Link>
      <div className="flex flex-wrap items-center">
        {/* Registering */}
        <div>
          {initialUserPreStatus === false ? (
            <div>
              <Link
                className="mr-2 text-[var(--navbtn)] font-bold p-3"
                to={"/login"}
              >
                Log In
              </Link>
              <Link
                className="mr-2 bg-[var(--navbtn)] text-[var(--navbg)] font-bold px-3 py-2 rounded-xl shadow-md transition-all ease-in-out hover:opacity-90"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* add demo */}
          {initialUserPreStatus === true ? (
            <IconButton onClick={() => setShow("Block")}>
              <MdAddCircleOutline className="text-[var(--navbtn)] text-2xl" />
            </IconButton>
          ) : (
            ""
          )}

          {/* light/night toggle */}
          <IconButton onClick={() => ToggleTheme()}>
            {Theme === "dark" ? (
              <MdOutlineWbSunny className="text-[var(--navbtn)] text-2xl" />
            ) : (
              <IoMoonOutline className="text-[var(--navbtn)] text-2xl" />
            )}
          </IconButton>
        </div>
        {initialUserPreStatus === true ? <AvatarIcon /> : ""}
      </div>
    </div>
  );
};

export default NavBar;
