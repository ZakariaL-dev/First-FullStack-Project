import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";

import { IoIosCloseCircleOutline } from "react-icons/io";
// import { useDemoStore } from "../DemoStore/demostor";

import { Snackbar, Alert, Slide } from "@mui/material";
import { ToggleUpdateContext } from "../Context/ToggleDialogContext";
import { useDemoStore } from "../DemoStore/demostor";

export default function UpdateDemoDilog({ demo, triggerSnack }) {
  const { ShowUpdate, setShowUpdate } = useContext(ToggleUpdateContext);
  const [UpdatedDemo, setUpdatedDemo] = useState(demo || {});

  const { updateDemo } = useDemoStore();

  async function UpdatingDemo() {
    const { success, message } = await updateDemo(demo._id, UpdatedDemo);
    triggerSnack(success ? "success" : "error", message);
    setShowUpdate("hidden");
  }

  if (!demo || ShowUpdate === "hidden") {
    return null;
  }

  return (
    <>
      <div
        className={`${ShowUpdate} absolute lg:top-[46vh] top-20 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 bg-[var(--bodybg)] shadow-[0_2px_5px_1px_var(--cardshadow)] rounded-lg z-20`}
      >
        <h1 className="p-5 text-3xl text-center font-bold text-[var(--demohead)] relative">
          Update Demo
          <IoIosCloseCircleOutline
            className="text-[var(--navtxt)] text-2xl absolute top-3 right-3 cursor-pointer transition-all ease-in-out hover:text-[var(--demohead)]"
            onClick={() => setShowUpdate("hidden")}
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
            value={UpdatedDemo.Title || ""}
            onChange={(e) =>
              setUpdatedDemo({ ...UpdatedDemo, Title: e.target.value })
            }
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
            value={UpdatedDemo.Description || ""}
            onChange={(e) =>
              setUpdatedDemo({ ...UpdatedDemo, Description: e.target.value })
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
            value={UpdatedDemo.Image || ""}
            onChange={(e) =>
              setUpdatedDemo({ ...UpdatedDemo, Image: e.target.value })
            }
          />
          <div className="flex justify-between items-center">
            <Button
              variant="contained"
              color="success"
              className="w-[57%]"
              onClick={() => UpdatingDemo()}
            >
              Update Demo
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="w-[40%]"
              onClick={() => setShowUpdate("hidden")}
            >
              cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
