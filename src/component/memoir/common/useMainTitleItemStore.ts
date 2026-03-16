import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MainTitleItem } from "./memoir.types";

const data: MainTitleItem[] = [
    {
        title: "2026/01/01 회고 - 오늘 공부한 것",
        mode: "VIEW",
        subMemoirTitles: [
            {
                title: "TSX란?",
                mode: "VIEW",
            },
        ],
    },
    {
        title: "2026/03/09 회고 - 오늘의 나의 일기",
        mode: "VIEW",
        subMemoirTitles: [
            {
                title: "문구점을 갔다.",
                mode: "VIEW",
            },
            {
                title: "산책을 갔다.",
                mode: "VIEW",
            },
        ],
    },
];

type MainTitleItemStore = {
    mainTitleItems: MainTitleItem[];
    addSubTitle: (mainTitleId: number, newSubTitle: string) => void;
    addMainTitle: (mainTitle: string) => void;
    setMainTitleItems: (mainTitleItems: MainTitleItem[]) => void;
    deleteMainTitleItem: (id: number) => void;
    updateMainTitleMode: (id: number) => void;
    updateMainTitle: (id: number, title: string) => void;
    deleteSubTitleItem: (mainTitleId: number, id: number) => void;
    updateSubTitleMode: (mainTitleId: number, id: number) => void;
};

export const useMainTitleItemStore = create<MainTitleItemStore>()(
    immer((set) => ({
        mainTitleItems: data,
        addSubTitle: (mainTitleId, newSubTitle) =>
            set((state) => {
                state.mainTitleItems[mainTitleId].subMemoirTitles.push({ title: newSubTitle, mode: "VIEW" });
            }),
        addMainTitle: (mainTitle: string) =>
            set((state) => {
                state.mainTitleItems.push({ title: mainTitle, mode: "VIEW", subMemoirTitles: [] });
            }),
        setMainTitleItems: (mainTitleItems: MainTitleItem[]) => set({ mainTitleItems }),
        deleteMainTitleItem: (mainTitleId: number) =>
            set((state) => {
                state.mainTitleItems.splice(mainTitleId, 1);
            }),
        updateMainTitleMode: (mainTitleId: number) => {
            set((state) => {
                const mode = state.mainTitleItems[mainTitleId].mode;
                state.mainTitleItems[mainTitleId].mode = mode === "VIEW" ? "EDIT" : "VIEW";
            });
        },
        updateMainTitle: (mainTitleId: number, mainTitle: string) => {
            set((state) => {
                state.mainTitleItems[mainTitleId].title = mainTitle;
            });
        },
        deleteSubTitleItem: (mainTitleId: number, subTitleId: number) => {
            set((state) => {
                state.mainTitleItems[mainTitleId].subMemoirTitles.splice(subTitleId, 1);
            });
        },
        updateSubTitleMode: (mainTitleId: number, subTitleId: number) => {
            set((state) => {
                const subTitleItem = state.mainTitleItems[mainTitleId].subMemoirTitles[subTitleId];
                subTitleItem.mode = subTitleItem.mode === "VIEW" ? "EDIT" : "VIEW";
            });
        },
    })),
);
