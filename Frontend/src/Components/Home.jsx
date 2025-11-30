import { Container } from "@mui/material";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="flex items-center gap-8 flex-wrap pt-32 text-[var(--navtxt)]">
      <img src="/demoImg.png" alt="demoimg" className="w-72" />
      <div>
        <h1 className="flex items-end gap-2 mb-1">
          <p className="text-6xl font-bold">Demo Store </p>
          <LuShoppingCart className="text-5xl font-medium" />
        </h1>
        <p className="text-2xl mb-7">By Dev for dev</p>
        <button className="bg-[var(--navbg)] text-[var(--navbtn)] font-bold px-3 py-2 rounded-xl shadow-md transition-all ease-in-out hover:opacity-90 cursor-pointer">
          <Link to={"/demostore"}>Browse Demos</Link>
        </button>
      </div>
    </Container>
  );
};

export default Home;
