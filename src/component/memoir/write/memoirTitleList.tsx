import "./memoirTitleList.scss";
import MainMemoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";

const MemoirTitleList = ({ editable, width }: { editable: boolean; width: string }) => {
    const mainTitleIds = useMainTitleItemStore((state) => state.mainTitleIds);

    return (
        <div style={{ width: width }} className="memoir-container">
            {mainTitleIds.map((mainTitleId, idx) => {
                return <MainMemoirTitle key={mainTitleId} mainTitleId={mainTitleId} idx={idx} editable={editable} />;
            })}
            {editable && <EditMainMemoirTitle />}
        </div>
    );
};

export default MemoirTitleList;
