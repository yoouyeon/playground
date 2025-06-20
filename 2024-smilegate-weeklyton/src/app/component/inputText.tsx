"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Heading,
  Input,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";

const InputTest = () => {
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="lg">
          입력 테스트
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack alignItems={"start"} divider={<Divider />} spacing={4}>
          <VStack alignItems={"start"} spacing={2}>
            <Heading as="h3" size="md">
              Date input
            </Heading>
            <Input placeholder="날짜" type="date" />
          </VStack>
          <VStack alignItems={"start"} spacing={2}>
            <Heading as="h3" size="md">
              Editable
            </Heading>
            <Editable defaultValue="갱갱갱" isPreviewFocusable={false}>
              <EditablePreview display={"block"} />
              <EditableTextarea />
              <EditableControls />
            </Editable>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();
  if (isEditing) {
    return (
      <ButtonGroup justifyContent="center" size="sm">
        <Button {...getSubmitButtonProps()}>Save</Button>
        <Button {...getCancelButtonProps()}>Cancel</Button>
      </ButtonGroup>
    );
  }
  return (
    <Button {...getEditButtonProps()} size="sm" my={"auto"}>
      Edit
    </Button>
  );
};

export default InputTest;
