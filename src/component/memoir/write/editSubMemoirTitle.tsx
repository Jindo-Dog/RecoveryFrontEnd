import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import EditMemoirTitleInput from "./editMemoirTitleInput";

type EditSubTitleProps = {
    mainTitleId: string;
};

const EditSubTitle = (props: EditSubTitleProps) => {
    const { mainTitleId } = props;
    const { addSubTitle } = useMainTitleItemStore();

    return (
        <EditMemoirTitleInput placeholder="소주제 (입력으로 활성화)" onSubmit={(title) => addSubTitle(mainTitleId, title)} />
    );
};

export default EditSubTitle;
