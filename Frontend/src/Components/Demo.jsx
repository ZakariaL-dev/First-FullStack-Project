// MUI
import IconButton from "@mui/material/IconButton";

// Reacr Icons
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDemoStore } from "../DemoStore/demostor";

const Demo = ({ demo, triggerDeleteSnack, onEditClick }) => {
  const { deleteDemo } = useDemoStore();

  async function handleDeleteDemo(demoid) {
    let confirmDelete = confirm("Are you sure You want to delete this Demo ??");
    if (confirmDelete) {
      const { success, message } = await deleteDemo(demoid);
      triggerDeleteSnack(success ? "success" : "error", message);
    }
  }
  return (
    <>
      <div className="rounded-xl bg-[var(--cardbg)] shadow-[0_4px_7px_1px_var(--cardshadow)] overflow-hidden mb-6 transition-all ease-in-out hover:-translate-y-1.5">
        <img src={demo.Image} alt={demo.Title} className="w-full max-h-[70%]" />
        <div className="w-full px-6 mt-4">
          <h5 className="text-xl font-bold font-manrope text-[var(--cardttl)] mb-2">
            {demo.Title}
          </h5>
          <p className="text-sm font-medium text-[var(--carddscp)]">
            {demo.Description}
          </p>
        </div>
        <div className="w-full py-3 px-6">
          <IconButton onClick={() => onEditClick(demo)}>
            <FiEdit className="text-[var(--cardbtn)] text-xl" />
          </IconButton>
          <IconButton onClick={() => handleDeleteDemo(demo._id)}>
            <FaRegTrashCan className="text-[var(--cardbtn)] text-xl" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Demo;
