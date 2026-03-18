import "./subMemoirTitle.scss";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import { useState } from "react";

type SubMemoirTitleProps = {
    mainTitleId: number;
    id: number;
    editable: boolean;
};

const SubMemoirTitle = (props: SubMemoirTitleProps) => {
    const { mainTitleId, id, editable } = props;
    const { title, mode } = useMainTitleItemStore((state) => state.mainTitleItems[mainTitleId].subMemoirTitles[id]);
    const { deleteSubTitleItem, updateSubTitleMode, updateSubTitle } = useMainTitleItemStore();
    const [btnShow, setBtnShow] = useState(false);
    const [titleState, setTitleState] = useState(title);

    const handleMoreBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setBtnShow(!btnShow);
    };

    const handleDeleteBtn = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteSubTitleItem(mainTitleId, id);
        }
    };

    const handleEditbtn = () => {
        updateSubTitleMode(mainTitleId, id);
    };

    const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(e.currentTarget.value);
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateSubTitle(mainTitleId, id, e.currentTarget.value);
            updateSubTitleMode(mainTitleId, id);
        }
    };

    return (
        <div className={"sub-title"}>
            <input
                className={"sub-title-content"}
                value={titleState}
                disabled={mode === "VIEW"}
                onChange={handleOnChage}
                onKeyDown={handlePressEnter}
            />
            {editable && (
                <div className={"btn-container"}>
                    {btnShow && <img src="/images/delete.svg" className={"delete-img"} onClick={handleDeleteBtn} />}
                    {btnShow && <img src="/images/edit.svg" className={"edit-img"} onClick={handleEditbtn} />}
                    <img src="/images/more.svg" className={"more-img"} onClick={handleMoreBtn} />
                </div>
            )}
        </div>
    );
};

export default SubMemoirTitle;
