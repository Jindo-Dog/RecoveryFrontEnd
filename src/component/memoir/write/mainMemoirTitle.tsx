import "./memoirTitle.scss";
import MemoirTitleItem from "./memoirTitleItem";
import EditSubTitle from "./editSubMemoirTitle";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

type MainMemoirTitleProps = {
    mainTitleId: string;
    idx: number;
    editable: boolean;
    selectHook: (id: TitleTargetPayload) => void;
};

const MainMemoirTitle = (props: MainMemoirTitleProps) => {
    const { mainTitleId, editable, selectHook } = props;
    const subTitleIds = useMainTitleItemStore((state) => state.mainTitlesById[mainTitleId]?.subTitleIds ?? []);

    return (
        <div className={"title-container"}>
            <MemoirTitleItem kind="MAIN" id={mainTitleId} editable={editable} selectHook={selectHook} />
            <div className={"sub-title-container"}>
                {subTitleIds.map((subTitleId) => {
                    return (
                        <MemoirTitleItem
                            key={subTitleId}
                            kind="SUB"
                            id={subTitleId}
                            editable={editable}
                            selectHook={selectHook}
                        />
                    );
                })}
                {editable && <EditSubTitle mainTitleId={mainTitleId} />}
            </div>
        </div>
    );
};

export default MainMemoirTitle;
