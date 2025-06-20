"use client";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  Heading,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import TextEditor from "./textEditor";
import { useState } from "react";

const DrawerTest = () => {
  // https://v2.chakra-ui.com/docs/hooks/use-disclosure
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [textSize, setTextSize] = useState<number>(16);
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="lg">
          편지 편집 메뉴 테스트
        </Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize={`${textSize}px`}>
          과연 텍스트 편집이 될 것인가 두둥
        </Text>
        <>
          {/* NOTE : drawer 왼쪽에 버튼을 위치시키는 법. */}
          <IconButton
            aria-label="open-drawer"
            onClick={onToggle}
            icon={<ArrowLeftIcon />}
          />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <VStack divider={<Divider />} p={4}>
                <VStack>
                  <Heading as="span" size="md">
                    편지 편집 메뉴
                  </Heading>
                  <TextEditor textSize={textSize} setTextSize={setTextSize} />
                </VStack>
                <VStack>
                  <Heading as="span" size="md">
                    편지지 선택 메뉴
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gap={"2"}>
                    <Button>편지지 1</Button>
                    <Button>편지지 2</Button>
                    <Button>편지지 3</Button>
                    <Button>편지지 4</Button>
                    <Button>편지지 5</Button>
                    <Button>편지지 6</Button>
                  </Grid>
                </VStack>
              </VStack>
            </DrawerContent>
          </Drawer>
        </>
      </CardBody>
    </Card>
  );
};

export default DrawerTest;
