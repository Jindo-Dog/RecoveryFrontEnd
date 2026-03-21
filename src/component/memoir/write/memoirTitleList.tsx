import "./memoirTitleList.scss";
import MainMemoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";
import React from "react";

const MemoirTitleList = ({ editable, width }: { editable: boolean; width: string }) => {
    const mainTitleIds = useMainTitleItemStore((state) => state.mainTitleIds);

    return (
        <div style={{ width: width }} className="memoir-container">
            {mainTitleIds.map((mainTitleId, idx) => (
                <React.Fragment key={mainTitleId}>
                    <MainMemoirTitle key={mainTitleId} mainTitleId={mainTitleId} idx={idx} editable={editable} />
                    {idx < mainTitleIds.length - 1 && <hr />}
                </React.Fragment>
            ))}
            {editable && (
                <>
                    <hr />
                    <EditMainMemoirTitle />
                </>
            )}
        </div>
    );
};

export default MemoirTitleList;
