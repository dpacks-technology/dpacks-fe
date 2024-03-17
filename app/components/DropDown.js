"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function DropDown(props) {



  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Notification Option"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown className="w-96">
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {
            props.dropdownItems.map((item, index) => (
                <DropdownItem key={item.key} description={item.description} >{item.label}</DropdownItem>
            ))
        }
      </DropdownMenu>
    </Dropdown>
  );
}
