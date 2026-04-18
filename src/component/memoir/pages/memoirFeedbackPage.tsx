import "./memoirFeedbackPage.scss";
import MemoirTitleList from "../write/memoirTitleList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useImprovementItemStore } from "../common/useMainTitleItemStore.ts";
import type { TitleTargetPayload } from "../common/memoir.types.ts";

const MemoirFeedbackPage = () => {
    const { improvementsById, subImprovementsById } = useImprovementItemStore();
    const [improvementContent, setImprovementContent] = useState<string>("");
    const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

    const handleItemClick = (payload: TitleTargetPayload) => {
        const { id, kind } = payload;
        if (kind === "MAIN") {
            setImprovementContent(improvementsById[id]?.improvement || "");
        } else {
            setImprovementContent(subImprovementsById[id]?.improvement || "");
        }
        setSelectedTitleId(id);
    };

    return (
        <section className={"improvement-section"}>
            <h2 className={"memoir-improvement-title"}>회고에 대해 피드백 받아보아요!</h2>
            <span>Recovery AI가 함께합니다.</span>
            <div className={"improvement-box"}>
                <div className={"left-box"}>
                    <div className="memoir-title">
                        <span>오늘 내게 있었던 일</span>
                    </div>
                    <MemoirTitleList
                        editable={false}
                        width={"625px"}
                        selectHook={(payload) => handleItemClick(payload)}
                        selectedTitleId={selectedTitleId}
                    />
                </div>
                <div className={"right-box"}>
                    <div className={"improvement-view-box"}>
                        <span className={"text-title"}>개선점</span>
                        <textarea
                            placeholder="개선점을 입력해주세요"
                            value={improvementContent}
                            readOnly={true}
                            onChange={(e) => setImprovementContent(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"feedback-box"}>
                        <span className={"feedback-title"}>피드백</span>
                        <textarea value={"AI 피드백"} readOnly={true} />
                    </div>
                </div>
            </div>

            <div className="progress-circles">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
            </div>

            <div className={"btn-footer"}>
                <Link to="/memoir/improvement">
                    <button className={"previous-btn"}>이전</button>
                </Link>
                <Link to="/">
                    <button className={"feedback-btn"}>완료</button>
                </Link>
            </div>
        </section>
    );
};

export default MemoirFeedbackPage;
