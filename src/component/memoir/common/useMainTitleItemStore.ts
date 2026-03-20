import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MainTitleItem, MemoirState, MemoirTitleKind, SubTitleItem } from "./memoir.types";

type LegacyMainTitleItem = {
    title: string;
    subMemoirTitles: { title: string }[];
};

const data: LegacyMainTitleItem[] = [
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

const createId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `memoir-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const normalizeInitialData = (legacyData: LegacyMainTitleItem[]): MemoirState => {
    const mainTitleIds: string[] = [];
    const mainTitlesById: Record<string, MainTitleItem> = {};
    const subTitlesById: Record<string, SubTitleItem> = {};

    legacyData.forEach((mainItem) => {
        const mainId = createId();
        const subTitleIds = mainItem.subMemoirTitles.map((subItem) => {
            const subId = createId();
            subTitlesById[subId] = {
                id: subId,
                title: subItem.title,
                mode: "VIEW",
                parentMainTitleId: mainId,
            };
            return subId;
        });

        mainTitleIds.push(mainId);
        mainTitlesById[mainId] = {
            id: mainId,
            title: mainItem.title,
            mode: "VIEW",
            subTitleIds,
        };
    });

    return { mainTitleIds, mainTitlesById, subTitlesById };
};

const initialState = normalizeInitialData(data);

type MainTitleItemStore = {
    mainTitleIds: string[];
    mainTitlesById: Record<string, MainTitleItem>;
    subTitlesById: Record<string, SubTitleItem>;
    addTitle: (kind: MemoirTitleKind, title: string, parentMainTitleId?: string) => void;
    deleteTitle: (kind: MemoirTitleKind, id: string) => void;
    toggleTitleMode: (kind: MemoirTitleKind, id: string) => void;
    updateTitle: (kind: MemoirTitleKind, id: string, title: string) => void;
};

export const useMainTitleItemStore = create<MainTitleItemStore>()(
    immer((set) => ({
        ...initialState,
        addTitle: (kind, title, parentMainTitleId) =>
            set((state) => {
                if (kind === "MAIN") {
                    const mainId = createId();
                    state.mainTitleIds.push(mainId);
                    state.mainTitlesById[mainId] = {
                        id: mainId,
                        title,
                        mode: "VIEW",
                        subTitleIds: [],
                    };
                    return;
                }

                if (!parentMainTitleId) {
                    return;
                }

                const mainTitle = state.mainTitlesById[parentMainTitleId];
                if (!mainTitle) {
                    return;
                }

                const subId = createId();
                mainTitle.subTitleIds.push(subId);
                state.subTitlesById[subId] = {
                    id: subId,
                    title,
                    mode: "VIEW",
                    parentMainTitleId,
                };
            }),
        deleteTitle: (kind, id) =>
            set((state) => {
                if (kind === "MAIN") {
                    const mainTitle = state.mainTitlesById[id];
                    if (!mainTitle) {
                        return;
                    }

                    mainTitle.subTitleIds.forEach((subId) => {
                        delete state.subTitlesById[subId];
                    });
                    delete state.mainTitlesById[id];
                    state.mainTitleIds = state.mainTitleIds.filter((mainId) => mainId !== id);
                    return;
                }

                const subTitle = state.subTitlesById[id];
                if (!subTitle) {
                    return;
                }

                const parent = state.mainTitlesById[subTitle.parentMainTitleId];
                if (parent) {
                    parent.subTitleIds = parent.subTitleIds.filter((subId) => subId !== id);
                }
                delete state.subTitlesById[id];
            }),
        toggleTitleMode: (kind, id) =>
            set((state) => {
                if (kind === "MAIN") {
                    const mainTitle = state.mainTitlesById[id];
                    if (!mainTitle) {
                        return;
                    }

                    mainTitle.mode = mainTitle.mode === "VIEW" ? "EDIT" : "VIEW";
                    return;
                }

                const subTitle = state.subTitlesById[id];
                if (!subTitle) {
                    return;
                }

                subTitle.mode = subTitle.mode === "VIEW" ? "EDIT" : "VIEW";
            }),
        updateTitle: (kind, id, title) =>
            set((state) => {
                if (kind === "MAIN") {
                    const mainTitle = state.mainTitlesById[id];
                    if (mainTitle) {
                        mainTitle.title = title;
                    }
                    return;
                }

                const subTitle = state.subTitlesById[id];
                if (subTitle) {
                    subTitle.title = title;
                }
            }),
    })),
);
