import { Button, Card, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <VStack alignItems="stretch" spacing={6}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" my="3rem">
        라이브러리 테스트 페이지
      </Text>
      <Button size="lg">
        <Link href="/calendar">Calendar</Link>
      </Button>
      <Button size="lg">
        <Link href="/diff">Diff</Link>
      </Button>
      <Button size="lg">
        <Link href="/component">Component</Link>
      </Button>
      <Button size="lg">
        <Link href="/generateImage">Generate Image</Link>
      </Button>
    </VStack>
  );
}
