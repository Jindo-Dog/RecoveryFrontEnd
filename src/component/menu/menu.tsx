import "./menu.scss";
import { Link } from "react-router-dom";

type MenuItem = {
    id: string;
    label: string;
    path: string;
    icon?: string;
};

type MenuProps = {
    items?: MenuItem[];
};

const defaultItems: MenuItem[] = [
    { id: "viewAll", label: "모두 보기", path: "/", icon: "images/temp-image.svg" },
    { id: "viewByDate", label: "날짜별로 보기", path: "/date", icon: "images/temp-image.svg" },
];

const Menu = ({ items = defaultItems }: MenuProps) => {
    const username = localStorage.getItem("username");

    return (
        <section className={"menu-section"}>
            <article className={"menu-article"}>
                <h2 className={"blind"}>메뉴바</h2>

                <Link to={"/profile"} className={"menu-header"}>
                    <img src={"images/temp-image.svg"} alt={"프로필 사진"} />
                    <span className={"user-name"}>
                        {username ? `${username}` : "김아무개"}
                        <span className={"user-name-decoration"}>님</span>
                    </span>
                </Link>

                <hr />

                <nav className={"menu-nav"}>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <Link to={item.path} className={"menu-item"}>
                                    {item.icon && <img src={item.icon} alt="메뉴아이콘" />}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr />

                <Link to={"/"} className={"menu-footer"}>
                    <img src={"images/settings.svg"} alt={"설정"} />
                    <span>설정</span>
                </Link>
            </article>
        </section>
    );
};

export default Menu;
