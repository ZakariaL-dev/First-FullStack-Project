import { create } from "zustand";

export const useDemoStore = create((set) => {
  return {
    Demos: [],
    setDemos: (Demos) => set({ Demos }),
    createNewDemo: async (newDemo) => {
      if (!newDemo.Title || !newDemo.Description || !newDemo.Image) {
        return { success: false, message: "Please fill in all the filds !!!" };
      }
      try {
        const res = await fetch("/api/demos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDemo),
        });

        const Data = await res.json();
        set((state) => ({ Demos: [...state.Demos, Data.Backdata] }));

        return { success: true, message: "Demo created successfully" };
      } catch (error) {
        console.error("Network or parsing error:", error);
        return {
          success: false,
          message: `An unexpected error occurred: ${error.message}`,
        };
      }
    },
    getAllDemos: async () => {
      try {
        const res = await fetch("/api/demos");
        const data = await res.json();
        set({ Demos: data.Backdata });
      } catch (error) {
        console.log("Error: " + error);
      }
    },
    deleteDemo: async (demoid) => {
      const res = await fetch(`/api/demos/${demoid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        Demos: state.Demos.filter((demo) => demo._id !== demoid),
      }));
      return { success: true, message: data.message };
    },
    updateDemo: async (demoid, updatedDemo) => {
      const res = await fetch(`/api/demos/${demoid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDemo),
      });
      const data = await res.json();
      if (!data) return { success: false, message: data.message };
      set((state) => ({
        Demos: state.Demos.map((d) => (d._id === demoid ? data.Backdata : d)),
      }));
      return { success: data.success, message: data.message };
    },
  };
});
