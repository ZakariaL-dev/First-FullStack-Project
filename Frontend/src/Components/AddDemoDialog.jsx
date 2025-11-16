import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { ToggleDialogContext } from "../Context/ToggleDialogContext";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDemoStore } from "../DemoStore/demostor";

import { Snackbar, Alert, Slide } from "@mui/material";

export default function AddDemoDialog() {
  const { Show, setShow } = useContext(ToggleDialogContext);

  const DefealtValue = {
    Title: "",
    Description: "",
    Image: "",
  };

  const [newDemo, setnewDemo] = useState(DefealtValue);

  const { createNewDemo } = useDemoStore();
  async function AddingNewDemo() {
    const { success, message } = await createNewDemo(newDemo);
    setnewDemo(DefealtValue);
    setShow("hidden");

    if (!success) {
      setSnackType({
        type: "error",
        message: message,
      });
      setShowSnack(true);
    } else {
      setSnackType({
        type: "success",
        message: message,
      });
      setShowSnack(true);
    }
  }

  // snackbar
  const [ShowSnack, setShowSnack] = useState(false);
  const [SnackType, setSnackType] = useState({
    type: "",
    message: "",
  });

  return (
    <>
      <div
        className={`${Show} absolute lg:top-[46vh] top-20 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 bg-[var(--bodybg)] shadow-[0_2px_5px_1px_var(--cardshadow)] rounded-lg z-20`}
      >
        <h1 className="p-5 text-3xl text-center font-bold text-[var(--demohead)] relative">
          Create a New Demo
          <IoIosCloseCircleOutline
            className="text-[var(--navtxt)] text-2xl absolute top-3 right-3 cursor-pointer transition-all ease-in-out hover:text-[var(--demohead)]"
            onClick={() => setShow("hidden")}
          />
        </h1>
        <form className="px-4 flex flex-col gap-6 w-lg md:w-xl py-7">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            sx={{
              backgroundColor: "var(--cardbg)",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "var(--dialoginp)",
                },
              // Change label color
              "& .MuiInputLabel-root": {
                color: "var(--dialoginp)",
              },
              // Set the label color when focused
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--dialoginp)",
              },
              // Change text color
              "& .MuiOutlinedInput-input": {
                color: "var(--cardbtn)",
              },
            }}
            value={newDemo.Title}
            onChange={(e) => setnewDemo({ ...newDemo, Title: e.target.value })}
          />
          {/*  */}
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{
              backgroundColor: "var(--cardbg)",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "var(--dialoginp)",
                },
              // Change label color
              "& .MuiInputLabel-root": {
                color: "var(--dialoginp)",
              },
              // Set the label color when focused
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--dialoginp)",
              },
              // Change text color
              "& .MuiOutlinedInput-input": {
                color: "var(--cardbtn)",
              },
            }}
            value={newDemo.Description}
            onChange={(e) =>
              setnewDemo({ ...newDemo, Description: e.target.value })
            }
          />
          {/*  */}
          <TextField
            id="outlined-basic"
            label="Picture Link"
            variant="outlined"
            sx={{
              backgroundColor: "var(--cardbg)",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "var(--dialoginp)",
                },
              // Change label color
              "& .MuiInputLabel-root": {
                color: "var(--dialoginp)",
              },
              // Set the label color when focused
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--dialoginp)",
              },
              // Change text color
              "& .MuiOutlinedInput-input": {
                color: "var(--cardbtn)",
              },
            }}
            value={newDemo.Image}
            onChange={(e) => setnewDemo({ ...newDemo, Image: e.target.value })}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => AddingNewDemo()}
          >
            Add Demo
          </Button>
        </form>
      </div>

      <Snackbar
        open={ShowSnack}
        autoHideDuration={5000}
        onClose={() => setShowSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slots={{ transition: Slide }}
        slotProps={{ transition: { direction: "up" } }}
      >
        <Alert
          onClose={() => setShowSnack(false)}
          severity={SnackType.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {SnackType.message}
        </Alert>
      </Snackbar>
    </>
  );
}
