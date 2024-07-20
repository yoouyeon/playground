"use client";

import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const NotiTest = () => {
  // https://v2.chakra-ui.com/docs/hooks/use-disclosure
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="lg">
          알림 아이콘 테스트
        </Heading>
      </CardHeader>
      <CardBody>
        <HStack>
          {/* Uncontrolled */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Avatar as={"button"} icon={<BellIcon />}>
                <AvatarBadge boxSize="1.25em" bg="red.500">
                  <Text fontSize="xs">3</Text>
                </AvatarBadge>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>알림</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>어쩌고 저쩌고</PopoverBody>
              <PopoverFooter>알림 모두 삭제</PopoverFooter>
            </PopoverContent>
          </Popover>
          {/* Controlled */}
          <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Avatar
                as={"button"}
                icon={<BellIcon />}
                onClick={onToggle}
              ></Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>알림</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>어쩌고 저쩌고</PopoverBody>
              <PopoverFooter>
                <Button colorScheme="red" size="xs" onClick={onToggle}>
                  닫기 버튼
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default NotiTest;
