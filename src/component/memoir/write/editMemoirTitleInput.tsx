import "./editMainMemoirTitle.scss";

type EditMemoirTitleInputProps = {
    placeholder: string;
    onSubmit: (title: string) => void;
    wrapperClassName?: string;
    showDivider?: boolean;
};

const EditMemoirTitleInput = ({
    placeholder,
    onSubmit,
    wrapperClassName,
    showDivider = false,
}: EditMemoirTitleInputProps) => {
    const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return;
        }

        const title = e.currentTarget.value.trim();
        if (title.length === 0) {
            return;
        }

        onSubmit(title);
        e.currentTarget.value = "";
    };

    return (
        <div className={wrapperClassName}>
            {showDivider && <hr />}
            <input
                type="text"
                className="edit-text"
                placeholder={placeholder}
                onKeyDown={handleEnterEvent}
                required
            />
        </div>
    );
};

export default EditMemoirTitleInput;

