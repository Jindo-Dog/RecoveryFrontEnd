import "./memoirTitleList.scss";
import MainMemoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";
import React from "react";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

type MemoirTitleList = {
    editable: boolean;
    width: string;
    selectHook: (id: TitleTargetPayload) => void;
};

const MemoirTitleList = (props: MemoirTitleList) => {
    const { editable, width, selectHook } = props;
    const mainTitleIds = useMainTitleItemStore((state) => state.mainTitleIds);

    return (
        <div style={{ width: width }} className="memoir-container">
            {mainTitleIds.map((mainTitleId, idx) => (
                <React.Fragment key={mainTitleId}>
                    <MainMemoirTitle
                        key={mainTitleId}
                        mainTitleId={mainTitleId}
                        idx={idx}
                        editable={editable}
                        selectHook={selectHook}
                    />
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
