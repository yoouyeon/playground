"use client";

import { useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import Calendar from "./calendar";
import { CalendarDate } from "./type";
import Link from "next/link";

const CalendarHome = () => {
  const [dateValue, setDateValue] = useState<CalendarDate>(new Date());
  return (
    // margin-top: 3rem
    // spacing: 1.5rem
    // https://v2.chakra-ui.com/docs/styled-system/theme#spacing
    <VStack mt={12} spacing={6}>
      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <Calendar value={dateValue} onChange={setDateValue} />
      <Text>
        선택한 날짜:{" "}
        {dateValue && dateValue instanceof Date
          ? dateValue.toLocaleDateString()
          : "없음"}
      </Text>
    </VStack>
  );
};

export default CalendarHome;
