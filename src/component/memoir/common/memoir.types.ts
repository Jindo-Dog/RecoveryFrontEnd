type Mode = "VIEW" | "EDIT";

type MemoirTitleKind = "MAIN" | "SUB";

type MemoirTitleBase = {
    id: string;
    title: string;
    mode: Mode;
};

type MainTitleItem = MemoirTitleBase & {
    subTitleIds: string[];
};

type SubTitleItem = MemoirTitleBase & {
    parentMainTitleId: string;
};

type MemoirState = {
    mainTitleIds: string[];
    mainTitlesById: Record<string, MainTitleItem>;
    subTitlesById: Record<string, SubTitleItem>;
};

export type { MainTitleItem, MemoirState, MemoirTitleKind, Mode, SubTitleItem };
