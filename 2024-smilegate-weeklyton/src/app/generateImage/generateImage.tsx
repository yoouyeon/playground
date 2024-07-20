"use client";
import {
  Box,
  Button,
  Card,
  Divider,
  Text,
  Image,
  Spinner,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useToBlob, useToJpeg, useToPng } from "@hugocxl/react-to-image";
import {
  HookExtendedState,
  HookStateStatus,
} from "@hugocxl/react-to-image/dist/hooks/types";
import Link from "next/link";
import { useState } from "react";

const GenerateImage = () => {
  // NOTE: 변환 flow는 나중에 논의해봐야 할 것 같음.
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  // https://github.com/hugocxl/react-to-image
  const [{ status, isLoading }, convertToImage, ref] = useToPng<HTMLDivElement>(
    {
      onStart: () => {
        console.log("onStart");
      },
      onSuccess: (data) => {
        setImageSrc(data);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  return (
    <Card p="1rem" gap={"1rem"}>
      <Box
        w="300px"
        h="200px"
        backgroundImage={
          "https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_1280.png"
        }
        ref={ref}
      >
        <Text>달디달고 달디단 밤양갱</Text>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          갱갱갱
        </Text>
      </Box>
      <Button onClick={convertToImage} isLoading={isLoading}>
        Convert to image
      </Button>
      <Divider />
      <ConvertResult converterState={status} imageSrc={imageSrc} />
    </Card>
  );
};

type ConvertResultProps = {
  converterState: HookStateStatus;
  imageSrc?: string;
};

const ConvertResult = ({ converterState, imageSrc }: ConvertResultProps) => {
  return (
    <VStack>
      <Box w="300px" h="200px">
        {(() => {
          switch (converterState) {
            case HookStateStatus.Idle:
              return <Text>변환이 성공하면 변환된 이미지가 여기 보여요</Text>;
            case HookStateStatus.Loading:
              return <Skeleton h="200px" />;
            case HookStateStatus.Success:
              return (
                <Image src={imageSrc} fallback={<Text>의문의 에러</Text>} />
              );
            case HookStateStatus.Error:
              return <Text>에러 발생</Text>;
            default:
              return null;
          }
        })()}
      </Box>
      {converterState === HookStateStatus.Success && (
        <Button>
          <a href={imageSrc || ""} download={"letter.png"}>
            Image Download
          </a>
        </Button>
      )}
    </VStack>
  );
};

export default GenerateImage;
