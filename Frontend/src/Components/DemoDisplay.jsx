// React Icons
import { MdOutlineFiberNew } from "react-icons/md";

// MUI
import Container from "@mui/material/Container";

//
import Demo from "./Demo";
import { useContext, useEffect, useState } from "react";
import {
  ToggleDialogContext,
  ToggleUpdateContext,
} from "../Context/ToggleDialogContext";
import { useDemoStore } from "../DemoStore/demostor";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import UpdateDemoDilog from "./UpdateDemoDilog";

const DemoDisplay = () => {
  const { setShow } = useContext(ToggleDialogContext);
  const { setShowUpdate } = useContext(ToggleUpdateContext);
  const { getAllDemos, Demos } = useDemoStore();
  useEffect(() => {
    getAllDemos();
  }, [getAllDemos]);

  const [UpdatedDemo, setUpdatedDemo] = useState(null);
  const handleUpdatedDemo = (updatedemo) => {
    setUpdatedDemo(updatedemo);
    setShowUpdate("Block");
  };

  // snackbar
  const [Snack, setSnack] = useState({
    open: false,
    type: "",
    message: "",
  });

  const AllDemos = Demos.map((demo) => (
    <Demo
      key={demo._id}
      demo={demo}
      triggerDeleteSnack={(type, message) =>
        setSnack({ open: true, type, message })
      }
      onEditClick={handleUpdatedDemo}
    />
  ));

  return (
    <div className="w-full py-10">
      <h1 className="flex items-center justify-center text-4xl gap-2 font-bold text-[var(--demohead)]">
        Current Demo <MdOutlineFiberNew />
      </h1>
      <Container maxWidth="lg" className="my-5">
        {AllDemos.length === 0 ? (
          <div className="flex gap-2 items-center justify-center text-xl relative mt-16">
            <h1 className="text-center font-bold text-[var(--navtxt)]">
              No Demos found.
            </h1>
            <button
              className="cursor-pointer font-semibold text-[var(--demohead)] transition-all ease-in-out hover:underline"
              onClick={() => setShow("Block")}
            >
              Create a Demo
            </button>
          </div>
        ) : (
          <div className="w-full relative flex items-center justify-center h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {AllDemos}
            </div>
          </div>
        )}
      </Container>
      {UpdatedDemo && (
        <UpdateDemoDilog
          key={UpdatedDemo._id}
          demo={UpdatedDemo}
          triggerSnack={(type, message) =>
            setSnack({ open: true, type, message })
          }
        />
      )}
      <Snackbar
        open={Snack.open}
        autoHideDuration={5000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slots={{ transition: Slide }}
        slotProps={{ transition: { direction: "up" } }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={Snack.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {Snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DemoDisplay;
