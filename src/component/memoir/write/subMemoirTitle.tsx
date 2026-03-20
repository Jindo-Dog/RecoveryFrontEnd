import "./subMemoirTitle.scss";
import MemoirTitleItem from "./memoirTitleItem";

type SubMemoirTitleProps = {
    id: string;
    editable: boolean;
};

const SubMemoirTitle = (props: SubMemoirTitleProps) => {
    const { id, editable } = props;
    return <MemoirTitleItem kind="SUB" id={id} editable={editable} />;
};

export default SubMemoirTitle;
