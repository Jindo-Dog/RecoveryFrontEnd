import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import EditMemoirTitleInput from "./editMemoirTitleInput";

const EditMainMemoirTitle = () => {
    const mainTitleCount = useMainTitleItemStore((state) => state.mainTitleIds.length);
    const addTitle = useMainTitleItemStore((state) => state.addTitle);

    return (
        <EditMemoirTitleInput
            wrapperClassName="main-edit-container"
            showDivider={mainTitleCount > 0}
            placeholder="대주제 (입력으로 활성화)"
            onSubmit={(title) => addTitle("MAIN", title)}
        />
    );
};

export default EditMainMemoirTitle;
