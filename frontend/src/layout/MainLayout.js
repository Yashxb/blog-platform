import { Outlet } from "react-router-dom";
import Header from "../components/Header";   
const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;