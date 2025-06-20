import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ButtonTest from "./buttonTest";
import TextTest from "./textText";
import NotiTest from "./notiTest";
import DrawerTest from "./drawerTest";
import InputTest from "./inputText";

const ComponentHome = () => {
  return (
    <VStack mt={12} spacing={6} mb={"15rem"}>
      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <ButtonTest />
      <TextTest />
      <NotiTest />
      <DrawerTest />
      <InputTest />
    </VStack>
  );
};

export default ComponentHome;
