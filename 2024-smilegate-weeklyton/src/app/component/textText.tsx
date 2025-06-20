import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";

const TextTest = () => (
  <Card>
    <CardHeader>
      <Heading as="h2" size="lg">
        텍스트 테스트
      </Heading>
    </CardHeader>
    <CardBody>
      <Text>Text는 기본적으로 p태그임</Text>
      <Text as={"span"} fontSize="xl">
        span 처럼 쓰고 싶으면
      </Text>
      <Text display={"inline-block"}>
        as로 바꿔주던가 inline-block 속성을 넣어줘야 함
      </Text>
      <Divider />
      <Heading>이건 기본적으로 h2</Heading>
      <Heading as={"h3"}>as로 태그 지정 가능(이건 h3)</Heading>
      <Heading size={"sm"}>size로 사이즈 지정 가능</Heading>
    </CardBody>
  </Card>
);

export default TextTest;
