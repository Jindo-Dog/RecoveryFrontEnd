import "./memoirWriteTitlePage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { Link } from "react-router-dom";

const MemoirWriteTitlePage = () => {
    return (
        <section className={"memoir-section"}>
            <h1 className={"memoir-edit-title"}>김아무개님 오늘 하루는 어떠셨나요?</h1>
            <span>모두에겐 비밀로 할게요 제게 맘껏 이야기해주세요</span>
            <MemoirTitleList editable={true} width={"1270px"} />

            <div className="progress-circles">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
            </div>
            <div className={"btn-footer"}>
                <Link to="/memoir/improvement">
                    <button className={"improvement-btn"}>개선점 입력하기</button>
                </Link>
            </div>
        </section>
    );
};

export default MemoirWriteTitlePage;
