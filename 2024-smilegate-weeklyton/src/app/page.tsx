import { Button, Card, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" my="3rem">
        라이브러리 테스트 페이지
      </Text>
      <Button>
        <Link href="/calendar">Calendar</Link>
      </Button>
    </>
  );
}
