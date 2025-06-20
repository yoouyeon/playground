"use client"; // It's currently unsupported to use "export *" in a client boundary. Please use named exports instead.

import { SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spinner,
  VStack,
} from "@chakra-ui/react";

const ButtonTest = () => (
  <Card>
    <CardHeader>
      <Heading as="h2" size="lg">
        버튼 테스트
      </Heading>
    </CardHeader>
    <CardBody>
      <VStack alignItems={"start"} divider={<Divider />} spacing={4}>
        <VStack alignItems={"start"} spacing={2}>
          <Heading as="h3" size="md">
            Variants
          </Heading>
          <HStack spacing={4}>
            <Button>solid</Button>
            <Button variant={"ghost"}>ghost</Button>
            <Button variant={"outline"}>outline</Button>
            <Button variant={"link"}>link</Button>
            <Button variant={"unstyled"}>unstyled</Button>
          </HStack>
        </VStack>
        <VStack alignItems={"start"} spacing={2}>
          <Heading as="h3" size="md">
            Size
          </Heading>
          <HStack spacing={4}>
            <Button>md</Button>
            <Button size={"lg"}>lg</Button>
            <Button size={"sm"}>sm</Button>
            <Button size={"xs"}>xs</Button>
            <Button h={"7rem"} w={"7rem"}>
              Custom
            </Button>
          </HStack>
        </VStack>
        <VStack alignItems={"start"} spacing={2}>
          <Heading as="h3" size="md">
            Color
          </Heading>
          <HStack spacing={4}>
            <Button colorScheme="orange">orange</Button>
            <Button colorScheme="purple">purple</Button>
            <Button colorScheme="cyan">cyan</Button>
            <Button
              bg={"orange.200"}
              textColor={"orange.800"}
              _hover={{
                bg: "yellow.200",
                textColor: "red.800",
              }}
            >
              Hover Me
            </Button>
          </HStack>
        </VStack>
        <VStack alignItems={"start"} spacing={2}>
          <Heading as="h3" size="md">
            Loading
          </Heading>
          <HStack spacing={4}>
            <Button isLoading>Loading button</Button>
            <Button isLoading loadingText={"Custom Loading Text"}>
              Loading button
            </Button>
            <Button
              isLoading
              loadingText={"Custom Spinner"}
              spinner={<Spinner color="red.500" />}
            >
              Loading button
            </Button>
            <Button
              spinnerPlacement="end"
              isLoading
              loadingText={"Custom Spinner"}
            >
              Loading button
            </Button>
          </HStack>
        </VStack>
        <VStack alignItems={"start"} spacing={2}>
          <Heading as="h3" size="md">
            Icon
          </Heading>
          <HStack spacing={4}>
            <Button leftIcon={<SunIcon />}>Icon Button</Button>
            <Button rightIcon={<SunIcon />}>Icon Button</Button>
            <IconButton aria-label="SunIcon" icon={<SunIcon />} />
            <IconButton
              variant={"ghost"}
              aria-label="SunIcon"
              icon={<SunIcon />}
            />
          </HStack>
        </VStack>
      </VStack>
    </CardBody>
  </Card>
);

export default ButtonTest;
