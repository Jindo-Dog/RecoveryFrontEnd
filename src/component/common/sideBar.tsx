import "./sidebar.scss";
import Menu from "../menu/menu";
import { Outlet } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="app-sidebar">
            <aside className="sidebar">
                <Menu />
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default SideBar;
