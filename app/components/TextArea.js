"use client"
import TextField from '@mui/material/TextField';


export default function TextArea(props){
    const { id, name, label, placeholder,width, height} = props;
    return (

        <TextField
            id={id}
            name={name}
            label={label}
            placeholder={placeholder}
            multiline
            className={`${width} ${height}`}
        />


        //how to use: pass the props to the component, width should be as tailwindcss classes
        //     <TextArea
        //         id="text-area"
        //         name="text-area"
        //         label="Text Area"
        //         placeholder="Enter your text here"
        //         width="w-96"
        //         height="h-96"
        //     />



    );
}