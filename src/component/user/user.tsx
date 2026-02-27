import "./user.scss";
import React, { useState } from "react";

const User = () => {
    const [modal, setModal] = useState(false);
    const handleEditPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setModal(true);
    };

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
                    <a href={"#"} className={"edit-password"} onClick={handleEditPasswordClick}>
                        비밀번호 변경
                    </a>
                    <a href={"#"} className={"withdrawal"}>
                        회원 탈퇴
                    </a>
                </div>
            </article>

            {modal && (
                <article className={"user-password-modal"}>
                    <div className={"modal-overlay"} />
                    <div className={"modal-content"}>
                        <h3>비밀번호 변경</h3>

                        <img src={"images/close-x.svg"} alt={"close"} onClick={() => setModal(false)} />

                        <form className={"password-form"} onSubmit={(e) => e.preventDefault()}>
                            <input
                                id={"current-password"}
                                type={"password"}
                                className={"md"}
                                placeholder={"현재 비밀번호*"}
                            />
                            <input
                                id={"new-password"}
                                type={"password"}
                                className={"md"}
                                placeholder={"변경할 비밀번호*"}
                            />
                            <input
                                id={"new-password-re"}
                                type={"password"}
                                className={"md"}
                                placeholder={"변경할 비밀번호 재입력*"}
                            />
                            <button type={"submit"} className={"secondary"}>
                                <span>수정하기</span>
                            </button>
                        </form>
                    </div>
                </article>
            )}
        </section>
    );
};

export default User;
