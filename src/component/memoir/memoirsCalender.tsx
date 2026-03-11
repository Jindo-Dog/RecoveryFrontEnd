import "./memoirsCalender.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { type MainTitleItem } from "./common/memoir.types";

const MOCK_DATA: MainTitleItem[] = [
    {
        title: "Main Title 1",
        subMemoirTitles: [{ title: "Sub Title 1.1" }, { title: "Sub Title 1.2" }],
    },
    {
        title: "Main Title 2",
        subMemoirTitles: [{ title: "Sub Title 2.1" }],
    },
];
const MOCK_DATE: string[] = ["2026-03-09", "2026-03-08"];

const weekdayFormatter = new Intl.DateTimeFormat("ko-KR", { weekday: "short" });
const toDateKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const MemoirsCalender = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
    const [data, setData] = useState<MainTitleItem[] | null>(null);

    const handleDateChange = (value: unknown) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    const fetchData = async (date: Date) => {
        // TODO: 백엔드 구축 후 date에 따른 호출로 변경
        try {
            await fetch(`/?date=${toDateKey(date)}`);
        } catch {
            // 에러 처리
        }
        setData(MOCK_DATA || null);
    };

    useEffect(() => {
        void fetchData(selectedDate);
    }, [selectedDate]);

    return (
        <section className={"calender-section"}>
            <article className={"calender-article"}>
                <h2 className={"blind"}>View memoirs by calender</h2>
                <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    formatDay={(_locale, date) => String(date.getDate())}
                    formatYear={(_locale, date) => String(date.getFullYear())}
                    formatMonthYear={(_locale, date) =>
                        `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}`
                    }
                    formatShortWeekday={(_locale, date) => weekdayFormatter.format(date)}
                    calendarType="iso8601"
                    showNeighboringMonth={true}
                    minDetail="year"
                    tileContent={({ date, view }) => {
                        if (view !== "month") return null;

                        const key = toDateKey(date);
                        return MOCK_DATE.includes(key) ? <div className={"react-calendar__tile-includeData"} /> : null;
                    }}
                />
                {selectedDate && (
                    <div className="data-display">
                        {data ? (
                            <>
                                <div className={"memoir-list"}>
                                    <ul>
                                        {data.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.title}</strong>
                                                <ul>
                                                    {item.subMemoirTitles.map((sub, subIndex) => (
                                                        <li key={subIndex}>{sub.title}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={"memoir-footer"}>
                                    <button className={"secondary"}>수정하기</button>
                                    <button className={"secondary"}>삭제하기</button>
                                </div>
                            </>
                        ) : (
                            <button className={"secondary"}>새로 작성하기</button>
                        )}
                    </div>
                )}
            </article>
        </section>
    );
};

export default MemoirsCalender;
