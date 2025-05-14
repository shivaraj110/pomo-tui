import { Box } from "ink";
import SelectInput from "ink-select-input";
import React from "react";
type Item<T> = {
  id: string;
  value: T;
  // other properties
};
type SideBarProps = {
  navItems: Array<Item<string>>;
  onSelect: (item: Item<string>) => void;
};

function SideBar({ navItems, onSelect }: SideBarProps) {
  return (
    <Box
      borderStyle={'single'}
      height={'100%'}
      width={40}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
    >
      <SelectInput items={navItems ?? ['asda']} onSelect={onSelect} />
    </Box>
  );
}

export default SideBar
