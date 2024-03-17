import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export default function AnalyticSelect() {
    // const animals = [
    //     {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
    //     {label: "Dog", value: "dog", description: "The most popular pet in the world"},
    //     {label: "Elephant", value: "elephant", description: "The largest land animal"},
    //     {label: "Lion", value: "lion", description: "The king of the jungle"},
    //
    // ];

    return (
        <Select
            items={animals}
            label="Notification options"
            placeholder="Select an Option"
            className="max-w-xs"
        >
            {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
        </Select>
    );
}
