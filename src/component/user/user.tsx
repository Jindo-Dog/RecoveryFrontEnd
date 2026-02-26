import "./user.scss";

const User = () => {
    return (
        <section className={"user-section"}>
            <article className={"user-article"}>
                <h2 className={"blind"}>user Profile</h2>

                <div className={"profile-image-wrapper"}>
                    <img className={"profile-image"} src={"images/close-x.svg"} alt={"profile image"} />
                    <img className={"profile-edit"} src={"images/close-x.svg"} alt={"profile image"} />
                </div>

                <form className={"user-form"}>
                    <input type={"email"} className={"md"} placeholder={"example@gmail.com"} disabled={true} />
                    <input type={"password"} className={"md"} placeholder={"비밀번호*"} required />
                    <input type={"text"} className={"md"} placeholder={"닉네임*"} required />

                    <button type={"submit"} className={"secondary"}>
                        <span>수정하기</span>
                    </button>
                </form>

                <div className={"user-links"}>
                    <a href={"#"} className={"edit-password"}>
                        비밀번호 변경
                    </a>
                    <a href={"#"} className={"withdrawal"}>
                        회원 탈퇴
                    </a>
                </div>
            </article>
        </section>
    );
};

export default User;
