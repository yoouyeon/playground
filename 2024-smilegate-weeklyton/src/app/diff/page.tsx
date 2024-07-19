"use client";

import { Button, Divider, Text, Textarea, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Diff from "./diff";

const originalLetter = `떠나는 길에 니가 내게 말했지
'너는 바라는 게 너무나 많아
잠깐이라도널 안 바라보면
머리에 불이 나버린다니까'
나는 흐르려는 눈물을 참고
하려던 얘길 어렵게 누르고
'그래 미안해'라는 한 마디로
너랑 나눈 날들 마무리했었지
달디달고 달디달고 달디단 밤양갱 밤양갱
내가 먹고 싶었던 건 달디단 밤양갱 밤양갱이야`;

const correctedLetter = `떠나는 길에 네가 내게 말했지
'너는 바라는 게 너무나 많아
잠깐이라도 널 안 바라보면
머리에 불이 나버린다니까'
나는 흐르려는 눈물을 참고
하려던 얘길 어렵게 누르고
'그래 미안해' 라는 한 마디로
너랑 나눈 날들 마무리했었지
다디달고 다디단 밤 팥묵
내가 먹고 싶었던 건 다디단 밤 팥묵 밤 팥묵이야`;

const DiffHome = () => {
  return (
    <VStack mt={12} spacing={6}>
      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <Text fontWeight="bold">원본 편지</Text>
      <Textarea placeholder="원본 편지" defaultValue={originalLetter} />
      <Text fontWeight="bold">교정된 편지</Text>
      <Textarea placeholder="교정된 편지" defaultValue={correctedLetter} />
      <Divider />
      <Diff oldStr={originalLetter} newStr={correctedLetter} />
    </VStack>
  );
};

export default DiffHome;
