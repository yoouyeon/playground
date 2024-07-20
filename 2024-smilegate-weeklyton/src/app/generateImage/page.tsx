import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import GenerateImage from "./generateImage";

const GenerateImageHome = () => {
  return (
    // margin-top: 3rem
    // spacing: 1.5rem
    // https://v2.chakra-ui.com/docs/styled-system/theme#spacing
    <VStack mt={12} spacing={6}>
      <Button>
        <Link href="/">홈으로 이동</Link>
      </Button>
      <GenerateImage />
    </VStack>
  );
};

export default GenerateImageHome;
