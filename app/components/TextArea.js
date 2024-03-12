"use client"
import TextField from '@mui/material/TextField';


export default function TextArea({id}, {label}, {placeholder},{width}, {height}) {
    return (

        <TextField
            id={id} // Use the id prop
            label={label} // Use the label prop
            placeholder={placeholder} // Use the placeholder prop
            multiline
            fullWidth
            className={`w-${width} h-${height}`}
        />



    );
}