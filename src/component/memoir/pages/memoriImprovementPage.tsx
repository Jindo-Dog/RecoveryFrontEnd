import "./memoirImprovement.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState } from "react";
import { Link } from "react-router-dom";

const MemoirImprovementPage = () => {
    const [feedbackCnt] = useState(0);

    return (
        <section className={"improvement-section"}>
            <h1 className={"memoir-improvement-title"}>느낀점이나 개선점이 있나요?</h1>
            <span>이런 상황은 어떻게 해결할 수 있을까요 편하게 이야기해주세요</span>
            <MemoirTitleList editable={false} width={"625px"} />

            <div className="progress-circles">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
            </div>

            <div className={"btn-footer"}>
                <Link to="/memoir">
                    <button className={"feedback-btn"}>이전({feedbackCnt}/5)</button>
                </Link>
                <Link to="/memoir/feedback">
                    <button className={"feedback-btn"}>피드백 받기({feedbackCnt}/5)</button>
                </Link>
            </div>
        </section>
    );
};

export default MemoirImprovementPage;
