import "./memoirTitleList.scss";
import { useEffect } from "react";
import type { MainTitleItem } from "../common/memoir.types.ts";
import MainMamoirTitle from "./mainMemoirTitle.tsx";
import EditMainMemoirTitle from "./editMainMemoirTitle.tsx";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore.ts";

const data: MainTitleItem[] = [
    {
        title: "2026/01/01 회고 - 오늘 공부한 것",
        subMemoirTitles: [
            {
                title: "TSX란?",
            },
        ],
    },
    {
        title: "2026/03/09 회고 - 오늘의 나의 일기",
        subMemoirTitles: [
            {
                title: "문구점을 갔다.",
            },
            {
                title: "산책을 갔다.",
            },
        ],
    },
];

const MemoirTitleList = ({ editable }: { editable: boolean }) => {
    const { mainTitleItems, setMainTitleItems } = useMainTitleItemStore();

    useEffect(() => {
        setMainTitleItems(data);
    }, []);

    return (
        <div className="memoir-div">
            <div className="memoir-title">
                <span>오늘의 나를 회고해보세요</span>
            </div>
            <div className="memoir-list">
                {mainTitleItems.map((memoirTitle: MainTitleItem, idx: number) => {
                    return <MainMamoirTitle key={idx} id={idx} editable={editable} />;
                })}
                {editable && <EditMainMemoirTitle id={mainTitleItems.length} />}
            </div>
        </div>
    );
};

export default MemoirTitleList;
