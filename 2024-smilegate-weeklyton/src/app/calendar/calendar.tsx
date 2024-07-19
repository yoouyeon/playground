import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarWrapper = css`
  // 전체 캘린더 영역
  .react-calendar {
    border: unset;
    background-color: transparent;
  }
  // 상단 네비게이션 영역
  .react-calendar__navigation {
    background-color: var(--chakra-colors-purple-100);
  }
  // 년 단위 이동 버튼
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }
  // 요일 표시 영역
  .react-calendar__month-view__weekdays {
    background-color: var(--chakra-colors-purple-100);
  }
  // 요일 텍스트
  .react-calendar__month-view__weekdays__weekday,
  .react-calendar__month-view__weekdays__weekday--weekend {
    color: var(--chakra-colors-purple-500);
  }
  // 각 날짜 타일
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--chakra-radii-md);
  }
  // 오늘 날짜
  .react-calendar__tile--now,
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: var(--chakra-colors-purple-100);
  }
  // 선택된 날짜
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: var(--chakra-colors-purple-500);
    color: var(--chakra-colors-white);
  }
  // 이전, 다음 달 날짜
  .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--chakra-colors-purple-200);
  }
`;

type CalendarProps = {
  value: Value;
  onChange: (value: Value) => void;
};

const Calendar = ({ value, onChange }: CalendarProps) => {
  return (
    <Box css={CalendarWrapper}>
      <ReactCalendar
        onChange={onChange}
        value={value}
        view={"month"}
        locale="ko-KO" // When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
        formatDay={(locale, date) => date.getDate().toString()} // "월" suffix 제거 위함
        tileContent={({ date }) => {
          // 조건에 따라 특정 날짜 아래에 아이콘 표시 가능
          if (date.getDate() % 2 === 0) {
            return <Text>🌞</Text>;
          }
        }}
        prevLabel={<ChevronLeftIcon />}
        nextLabel={<ChevronRightIcon />}
      />
    </Box>
  );
};

export default Calendar;
