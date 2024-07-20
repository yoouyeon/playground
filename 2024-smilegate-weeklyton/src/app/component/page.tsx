import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ButtonTest from "./buttonTest";
import TextTest from "./textText";
import NotiTest from "./notiTest";

const ComponentHome = () => {
  return (
    <VStack mt={12} spacing={6} mb={"15rem"}>
      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <ButtonTest />
      <TextTest />
      <NotiTest />
    </VStack>
  );
};

export default ComponentHome;
