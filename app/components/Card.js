import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";

export default function CardTemp(props) {

    let gridColumnClass = "sm:grid-cols-1";
    if (props.buttons.length === 2) {
        gridColumnClass = "sm:grid-cols-2";
    } else if (props.buttons.length === 3) {
        gridColumnClass = "sm:grid-cols-3";
    }

    return (
        <Card className="max-w-[265px] m-1">
            <CardHeader className="flex">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col m-2">
                    <p className="text-md">{props.title}</p>
                    <p className="text-small text-default-500">{props.secondDes}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="flex-wrap">{props.description}</p>
            </CardBody>
            <Divider />
            <CardFooter className={`grid gap-2 ${gridColumnClass} grid-cols-1`}>
                {
                    props.buttons.map((button) => {
                        return (
                            <Button className="p-1" key={button.name} onClick={button.onClick} size="small">
                                {button.name}
                            </Button>
                        )
                    })
                }
            </CardFooter>
        </Card>
    );
}
