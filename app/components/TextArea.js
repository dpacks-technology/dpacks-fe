"use client"
import { Input } from 'antd';
const { TextArea } = Input;


export default function Textarea({ ...props }) {
    return (

        <TextArea rows={4} placeholder="maxLength is 6" {...props} maxLength={6} />

    );
}