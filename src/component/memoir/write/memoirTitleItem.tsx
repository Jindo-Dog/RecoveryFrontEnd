import "./mainMemoirTitle.scss";
import "./subMemoirTitle.scss";
import { useState } from "react";
import type { MemoirTitleKind } from "../common/memoir.types";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

type MemoirTitleItemProps = {
    kind: MemoirTitleKind;
    id: string;
    editable: boolean;
};

const MemoirTitleItem = ({ kind, id, editable }: MemoirTitleItemProps) => {
    const titleItem = useMainTitleItemStore((state) =>
        kind === "MAIN" ? state.mainTitlesById[id] : state.subTitlesById[id],
    );
    const { deleteTitle, toggleTitleMode, updateTitle } = useMainTitleItemStore();
    const [btnShow, setBtnShow] = useState(false);

    if (!titleItem) {
        return null;
    }

    const containerClass = kind === "MAIN" ? "main-title-container" : "sub-title";
    const contentClass = kind === "MAIN" ? "main-title-content" : "sub-title-content";

    const handleMoreBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setBtnShow((prev) => !prev);
    };

    const handleDeleteBtn = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteTitle(kind, id);
        }
    };

    const handleEditBtn = () => {
        toggleTitleMode(kind, id);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTitle(kind, id, e.currentTarget.value);
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTitle(kind, id, e.currentTarget.value);
            toggleTitleMode(kind, id);
        }
    };

    return (
        <div className={containerClass}>
            <input
                className={contentClass}
                value={titleItem.title}
                disabled={titleItem.mode === "VIEW"}
                onChange={handleOnChange}
                onKeyDown={handlePressEnter}
            />
            {editable && (
                <div className={"btn-container"}>
                    {btnShow && (
                        <img src="/images/delete.svg" alt="delete" className={"delete-img"} onClick={handleDeleteBtn} />
                    )}
                    {btnShow && <img src="/images/edit.svg" alt="edit" className={"edit-img"} onClick={handleEditBtn} />}
                    <img src="/images/more.svg" alt="more" className={"more-img"} onClick={handleMoreBtn} />
                </div>
            )}
        </div>
    );
};

export default MemoirTitleItem;


