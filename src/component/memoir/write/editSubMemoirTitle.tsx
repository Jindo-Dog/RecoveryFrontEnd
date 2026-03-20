import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import EditMemoirTitleInput from "./editMemoirTitleInput";

type EditSubTitleProps = {
    mainTitleId: string;
};

const EditSubTitle = (props: EditSubTitleProps) => {
    const { mainTitleId } = props;
    const addTitle = useMainTitleItemStore((state) => state.addTitle);

    return (
        <EditMemoirTitleInput
            placeholder="소주제 (입력으로 활성화)"
            onSubmit={(title) => addTitle("SUB", title, mainTitleId)}
        />
    );
};

export default EditSubTitle;
