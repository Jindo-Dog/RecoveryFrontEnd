import "./editMainMemoirTitle.scss";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";

const EditMainMemoirTitle = () => {
    const { addMainTitle } = useMainTitleItemStore();

    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;

        if (e.key === "Enter" && title.length > 0) {
            addMainTitle(title);
            e.currentTarget.value = "";
        }
    };

    return (
        <div>
            <input
                type="text"
                className="edit-text"
                placeholder="대주제 (입력으로 활성화)"
                onKeyDown={handleEnterEvent}
                required
            />
        </div>
    );
};

export default EditMainMemoirTitle;
