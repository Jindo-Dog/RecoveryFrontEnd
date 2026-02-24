import "./signup.scss";

const SignUp = () => {
    return (
        <section className={"signup-section"}>
            <article className={"signup-article"}>
                <h2 className={"logo"}>
                    <img src={"images/logo.svg"} alt={"logo"} />
                </h2>

                <form className={"signup-form"}>
                    <input type={"email"} className={"md"} placeholder={"이메일"} required />
                    <input type={"password"} className={"md"} placeholder={"비밀번호"} required />
                    <input type={"password"} className={"md"} placeholder={"비밀번호 확인"} required />
                    <input type={"text"} className={"md"} placeholder={"닉네임"} required />

                    <button type={"submit"} className={"secondary"}>
                        <span>가입하기</span>
                    </button>
                </form>
            </article>
        </section>
    )
}

export default SignUp;