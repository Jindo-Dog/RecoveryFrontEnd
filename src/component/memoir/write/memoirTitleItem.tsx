import "./memoirTitle.scss";
import { useEffect, useRef, useState } from "react";
import type { MemoirTitleKind, TitleTargetPayload } from "../common/memoir.types";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

type MemoirTitleItemProps = {
    kind: MemoirTitleKind;
    id: string;
    editable: boolean;
    selectHook: (payload: TitleTargetPayload) => void;
    selectedTitleId?: string | null;
};

const MemoirTitleItem = (props: MemoirTitleItemProps) => {
    const { kind, id, editable, selectHook, selectedTitleId } = props;
    const titleItem = useMainTitleItemStore((state) =>
        kind === "MAIN" ? state.mainTitlesById[id] : state.subTitlesById[id],
    );
    const { deleteTitle, updateTitle } = useMainTitleItemStore();
    const [btnShow, setBtnShow] = useState(false);
    const [mode, setMode] = useState<"VIEW" | "EDIT">("VIEW");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mode === "EDIT") {
            inputRef.current?.focus();
        }
    }, [mode]);

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
        setMode(mode === "EDIT" ? "VIEW" : "EDIT");
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTitle({ kind, id, title: e.currentTarget.value });
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTitle({ kind, id, title: e.currentTarget.value });
            setMode(mode === "EDIT" ? "VIEW" : "EDIT");
            e.currentTarget.blur();
        }
    };

    const handleOnClick = () => {
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
                className={contentClass + (selectedTitleId === id ? " selected" : "")}
                ref={inputRef}
                value={titleItem.title}
                readOnly={mode === "VIEW"}
                style={mode === "VIEW" ? { pointerEvents: "none" } : undefined}
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
