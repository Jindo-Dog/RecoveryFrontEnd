import "./mainMemoirTitle.scss";
import type { SubTitleItem } from "../common/memoir.types";
import SubMemoirTitle from "./subMemoirTitle";
import EditSubTitle from "./editSubMemoirTitle";
import { useState } from "react";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const MainMamoirTitle = (props: { id: number; editable: boolean }) => {
    const { id, editable } = props;
    const mainTitleItem = useMainTitleItemStore((state) => state.mainTitleItems[id]);
    const { deleteMainTitleItem, updateMainTitleMode, updateMainTitle } = useMainTitleItemStore();
    const { title, subMemoirTitles } = mainTitleItem;
    const [titleState, setTitleState] = useState(title);
    const [btnShow, setBtnShow] = useState(false);

    const handleMoreBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setBtnShow(!btnShow);
    };

    const handleDeleteBtn = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteMainTitleItem(id);
        }
    };

    const handleEditbtn = () => {
        updateMainTitleMode(id);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(e.currentTarget.value);
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateMainTitle(id, e.currentTarget.value);
        }
    };

    return (
        <div className={"title-container"}>
            {id > 0 && <hr />}
            <div className={"main-title-container"}>
                <input
                    className={"main-title-content"}
                    value={titleState}
                    disabled={mainTitleItem.mode === "VIEW"}
                    onChange={handleOnChange}
                    onKeyDown={handlePressEnter}
                />
                <div className={"btn-container"}>
                    {btnShow && <img src="/images/delete.svg" className={"delete-img"} onClick={handleDeleteBtn} />}
                    {btnShow && <img src="/images/edit.svg" className={"edit-img"} onClick={handleEditbtn} />}
                    <img src="/images/more.svg" className={"more-img"} onClick={handleMoreBtn} />
                </div>
            </div>
            <div className={"sub-title-container"}>
                {subMemoirTitles.map((subMemoirTitle: SubTitleItem, idx: number) => {
                    return <SubMemoirTitle key={idx} mainTitleId={id} id={idx} />;
                })}
                {editable && <EditSubTitle mainTitleId={id} />}
            </div>
        </div>
    );
};

export default MainMamoirTitle;
