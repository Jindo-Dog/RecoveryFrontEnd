import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MainTitleItem } from "./memoir.types";

type MainTitleItemStore = {
    mainTitleItems: MainTitleItem[];
    addSubTitle: (mainTitleId: number, newSubTitle: string) => void;
    addMainTitle: (mainTitle: string) => void;
    setMainTitleItems: (mainTitleItems: MainTitleItem[]) => void;
};

export const useMainTitleItemStore = create<MainTitleItemStore>()(
    immer((set) => ({
        mainTitleItems: [],
        addSubTitle: (mainTitleId, newSubTitle) =>
            set((state) => {
                state.mainTitleItems[mainTitleId].subMemoirTitles.push({ title: newSubTitle });
            }),
        addMainTitle: (mainTitle: string) =>
            set((state) => {
                state.mainTitleItems.push({ title: mainTitle, subMemoirTitles: [] });
            }),
        setMainTitleItems: (mainTitleItems: MainTitleItem[]) => set({ mainTitleItems }),
    })),
);
