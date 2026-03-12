import "./memoirsCalender.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { format, isAfter } from "date-fns";
import { ko } from "date-fns/locale";
import { type MainTitleItem } from "./common/memoir.types";
import MemoirTitleList from "./write/memoirTitleList.tsx";

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

const toDateKey = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

const MemoirsCalender = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
    const [data, setData] = useState<MainTitleItem[] | null>(null);

    const handleDateChange = (value: unknown) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    const handleStartDateChange = (value: unknown) => {
        if (value instanceof Date) {
            //TODO: fetch markedDate with month
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

    function isFuture(date: Date) {
        const today = new Date();
        return isAfter(date, today);
    }

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
                    formatDay={(_locale, date) => format(date, "d")}
                    formatYear={(_locale, date) => format(date, "yyyy")}
                    formatMonthYear={(_locale, date) => format(date, "yyyy.MM")}
                    formatShortWeekday={(_locale, date) => format(date, "EEE", { locale: ko })}
                    calendarType="iso8601"
                    showNeighboringMonth={true}
                    minDetail="year"
                    onActiveStartDateChange={handleStartDateChange}
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
                                <div className={"memoir-content"}>
                                    <MemoirTitleList editable={false} width={"100%"} />
                                </div>
                                <div className={"memoir-footer"}>
                                    <button className={"secondary"}>수정하기</button>
                                    <button className={"secondary"}>삭제하기</button>
                                </div>
                            </>
                        ) : (
                            !isFuture(selectedDate) && <button className={"secondary"}>새로 작성하기</button>
                        )}
                    </div>
                )}
            </article>
        </section>
    );
};

export default MemoirsCalender;
