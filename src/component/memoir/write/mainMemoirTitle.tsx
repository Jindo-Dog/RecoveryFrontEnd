import "./memoirTitle.scss";
import MemoirTitleItem from "./memoirTitleItem";
import EditSubTitle from "./editSubMemoirTitle";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const MainMemoirTitle = (props: { mainTitleId: string; idx: number; editable: boolean }) => {
    const { mainTitleId, editable } = props;
    const subTitleIds = useMainTitleItemStore((state) => state.mainTitlesById[mainTitleId]?.subTitleIds ?? []);

    return (
        <div className={"title-container"}>
            <MemoirTitleItem kind="MAIN" id={mainTitleId} editable={editable} />
            <div className={"sub-title-container"}>
                {subTitleIds.map((subTitleId) => {
                    return <MemoirTitleItem key={subTitleId} kind="SUB" id={subTitleId} editable={editable} />;
                })}
                {editable && <EditSubTitle mainTitleId={mainTitleId} />}
            </div>
        </div>
    );
};

export default MainMemoirTitle;
