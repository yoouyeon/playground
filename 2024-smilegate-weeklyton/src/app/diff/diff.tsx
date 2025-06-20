import { Button, Text } from "@chakra-ui/react";
import * as diff from "diff";

type DiffProps = {
  oldStr?: string;
  newStr?: string;
};

const Diff = ({ oldStr = "", newStr = "" }: DiffProps) => {
  const diffResult = diff.diffWordsWithSpace(oldStr, newStr);
  return (
    <div>
      {diffResult.map((change, index) => {
        const { value, added, removed } = change;
        if (added) {
          return (
            <Button
              key={index}
              size="sm"
              bg="transparent"
              textColor="green"
              display="inline-block"
            >
              {value}
            </Button>
          );
        }
        if (removed) {
          return (
            <Button
              key={index}
              size="sm"
              bg="transparent"
              textColor="red"
              display="inline-block"
            >
              {value}
            </Button>
          );
        }
        return <span key={index}>{value}</span>;
      })}
    </div>
  );
};

export default Diff;
