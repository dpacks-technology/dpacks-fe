import ButtonComponent from "@/app/components/Button";
import Input from "@/app/components/Input";
import React from 'react';
import Checkbox from 'antd/lib/Checkbox';


export default function MarketplaceAddTemplate(){
    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // const CheckboxGroup = Checkbox.Group;
    //
    // const options = [
    //     {
    //         label: 'Apple',
    //         value: 'Apple',
    //     },
    //     {
    //         label: 'Pear',
    //         value: 'Pear',
    //     },
    //     {
    //         label: 'Orange',
    //         value: 'Orange',
    //     },
    // ];
    return (
        <>
            <h1 className="mt-4 ml-6">Add Template to the Marketplace</h1><br/>
            <form className="p-6 w-960">
                <div className="flex justify-between">
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pr-10 p-6">
                        <h2 className="text-black">Template Details:</h2> <br/>
                        <Input label={"Template Name"} color={"primary"}/> <br/><br/>
                        <Input label={"Description"} color={"primary"}/> <br/><br/>
                        <Input label={"Category"} color={"primary"}/> <br/><br/>
                        {/*<div className="text-black text-sm">*/}
                        {/*    <p>Features:</p>*/}
                        {/*    <Checkbox {...label} /> Responsive*/}
                        {/*    <Checkbox {...label} /> Multi-Page*/}
                        {/*    <Checkbox {...label} /> Single-Page<br/>*/}
                        {/*    <Checkbox {...label} /> Interactive*/}
                        {/*</div>*/}

                        {/*<CheckboxGroup options={options} defaultValue={['Pear']}  />*/}

                    </div>
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pl-10 p-6 ml-4">
                        {/*<h2>Template Files:</h2><br/>*/}
                        {/*<p className="text-black text-sm">Upload Template File (zip/rar):</p>*/}
                        {/*<input type="file" name="file" accept=".zip,.rar" className="mb-4 text-black text-sm"/> <br/>*/}
                        {/*<p className="text-black text-sm">Upload Template Thumbnail (jpg/png):</p>*/}
                        {/*<input type="file" name="file" accept=".jpg,.png" className="mb-4 text-black text-sm"/> <br/>*/}
                        {/*<br/>*/}
                        <h2 className="text-black">Template Files:</h2><br/>
                        <div className="mb-4">
                            <label htmlFor="templateFile" className="block text-sm text-gray-700 mb-1">Upload Template
                                File (ZIP/RAR):</label>
                            <input id="templateFile" type="file" name="file" accept=".zip,.rar" className="hidden"/>
                            <label htmlFor="templateFile"
                                   className="bg-blue-500 text-white text-sm py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Choose
                                File</label>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="thumbnailFile" className="block text-sm text-gray-700 mb-1">Upload Template
                                Thumbnail (JPG/PNG):</label>
                            <input id="thumbnailFile" type="file" name="file" accept=".jpg,.png" className="hidden"/>
                            <label htmlFor="thumbnailFile"
                                   className="bg-blue-500 text-white text-sm py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Choose
                                File</label>
                        </div>
                        <br/><br/>
                        <h2 className="text-black">Developer Details:</h2><br/>

                        <Input label={"Developer's Name"} color={"primary"}/> <br/><br/>
                        <Input label={"Developer's Message"} color={"primary"}/> <br/>

                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <ButtonComponent
                        name="Add Template"
                        variant="solid"
                        color="primary"
                        size="sm"
                        //isDisabled
                    />
                    <div className="w-4"></div>
                    <ButtonComponent
                        name="Clear"
                        variant="solid"
                        color="secondary"
                        size="sm"
                        //isDisabled
                    />

                </div>
            </form>

        </>
    )
}