type Mode = "VIEW" | "EDIT";

type MainTitleItem = {
    title: string;
    mode: Mode;
    subMemoirTitles: SubTitleItem[];
};

type SubTitleItem = {
    title: string;
    mode: Mode;
};

export type { MainTitleItem, SubTitleItem };
