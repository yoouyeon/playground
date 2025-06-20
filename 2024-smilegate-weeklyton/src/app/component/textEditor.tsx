import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

interface TextEditorProps {
  textSize: number;
  setTextSize: (size: number) => void;
}

const TextEditor = (props: TextEditorProps) => {
  return (
    <VStack>
      <Text fontSize={"lg"}>텍스트 크기</Text>
      <NumberInput
        step={4}
        defaultValue={props.textSize}
        min={10}
        max={30}
        onChange={(valueString, valueAsNumber) =>
          props.setTextSize(valueAsNumber)
        }
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize={"lg"}>글꼴 선택</Text>
      <Select placeholder="글꼴 선택하시오">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          메뉴를 이용한 방식
        </MenuButton>
        <MenuList>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuList>
      </Menu>
    </VStack>
  );
};

export default TextEditor;
