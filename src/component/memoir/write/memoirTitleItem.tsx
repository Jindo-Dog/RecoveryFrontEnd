import "./memoirTitle.scss";
import { useState } from "react";
import type { MemoirTitleKind, TitleTargetPayload } from "../common/memoir.types";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

type MemoirTitleItemProps = {
    kind: MemoirTitleKind;
    id: string;
    editable: boolean;
    selectHook: (payload: TitleTargetPayload) => void;
};

const MemoirTitleItem = ({ kind, id, editable, selectHook }: MemoirTitleItemProps) => {
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

    const handleDeleteBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteTitle({ kind, id });
        }
    };

    const handleEditBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTitleMode({ kind, id });
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTitle({ kind, id, title: e.currentTarget.value });
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTitle({ kind, id, title: e.currentTarget.value });
            toggleTitleMode({ kind, id });
        }
    };

    const handleOnClick = () => {
        console.log("MemoirTitleItem clicked ->", { kind, id, title: titleItem.title });
        selectHook({ kind, id });
    };

    return (
        <div
            className={containerClass}
            onClick={handleOnClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleOnClick();
                }
            }}
        >
            <input
                className={contentClass}
                value={titleItem.title}
                readOnly={titleItem.mode === "VIEW"}
                style={titleItem.mode === "VIEW" ? { pointerEvents: "none" } : undefined}
                onChange={handleOnChange}
                onKeyDown={handlePressEnter}
            />
            {editable && (
                <div className={"btn-container"}>
                    {btnShow && (
                        <img src="/images/delete.svg" alt="delete" className={"delete-img"} onClick={handleDeleteBtn} />
                    )}
                    {btnShow && (
                        <img src="/images/edit.svg" alt="edit" className={"edit-img"} onClick={handleEditBtn} />
                    )}
                    <img src="/images/more.svg" alt="more" className={"more-img"} onClick={handleMoreBtn} />
                </div>
            )}
        </div>
    );
};

export default MemoirTitleItem;
