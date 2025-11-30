import Avatar from "@mui/material/Avatar";

import { useState } from "react";
import axios from "axios";

const AvatarIcon = () => {
  const [open, setopen] = useState(false);
  const handleClick = () => {
    setopen(!open);
  };
  const handleClose = () => {
    setopen(false);
  };
  const LogOutHandler = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.data.success) {
        return location.assign("/");
      }
    } catch (error) {
      console.error(error);
    }
    setopen(false);
  };
  return (
    <>
      <Avatar
        src="/broken-image.jpg"
        sx={{ width: 36, height: 36 }}
        className="cursor-pointer"
        onClick={handleClick}
      />
      <ul
        className={
          open === true
            ? "block absolute bg-[var(--cardshadow)] text-[var(--carddscp)] top-14 right-6 rounded-lg z-20"
            : "hidden"
        }
      >
        <li
          className="pt-3 pb-2 cursor-pointer transition-all ease-in-out duration-150  hover:bg-[var(--Avatarhover)] font-bold px-4 rounded-t-lg"
          onClick={handleClose}
        >
          My account
        </li>
        <li
          className="py-2 cursor-pointer transition-all ease-in-out duration-150  hover:bg-[var(--Avatarhover)] font-bold px-4"
          onClick={handleClose}
        >
          Verify My Email
        </li>
        <li
          className="pt-2 pb-3 px-4 cursor-pointer transition-all ease-in-out duration-150  hover:bg-[var(--Avatarhover)] font-bold rounded-b-lg"
          onClick={LogOutHandler}
        >
          Logout
        </li>
      </ul>
    </>
  );
};

export default AvatarIcon;
