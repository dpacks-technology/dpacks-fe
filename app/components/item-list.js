"use client"
import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";

export default function ItemList(props) {
    const limitedButtons = props.buttons.slice(0, 3);

    return (
      <Card className="flex-row bg-white">

          <div className="w-full">

              <CardHeader className="flex gap-3 bg-white">
                  <div className="flex flex-col">
                      <p className="text-lg text-black">{props.title}</p>
                      <p className="text-small text-black">{props.secondDis}</p>
                  </div>
              </CardHeader>

              <CardBody>
                  <p>{props.thirdDis}</p>
              </CardBody>

            </div>

          <div className="w-auto flex items-center justify-center">
              <CardFooter className="flex flex-col gap-2 sm:justify-end sm:flex-row">
                  {
                      limitedButtons.map((button) => {
                          return (
                              <Button className="p-1" key={button.name} onClick={button.onClick} size="lg" color={button.color}>
                                  {button.name}
                              </Button>
                          )
                      })
                  }
              </CardFooter>
          </div>
      </Card>

  );
}


//how to use

// const datas = {
//     title: "Title",

//     secondDis: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",

//     thirdDis: "lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet,
//     consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet,
//     consectetur adipiscing elit.",

//     buttons: [ { name: "explore", onClick: "enter onclick function here", color: "success"},
//         { name: "register", onClick: "enter onclick function here", color: "danger" },
//         { name: "register", onClick: "enter onclick function here", color: "secondary" }],
// }

//<ItemList {...datas}/>
