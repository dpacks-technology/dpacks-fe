import ButtonComponent from "@/app/components/Button";
import CardTemp from "@/app/components/Card";
import Input from "@/app/components/Input";
import DropDown from "@/app/components/DropDown";

export default function MarketplaceAddTemplate(){
    // const jsonArray = [
    //     {key: "Text", label: "text", description: "This is a description"},
    //
    //
    // ];
    return (
        <>
            <h1 className="mt-4 ml-6">Add Template to the Marketplace</h1><br/>
            <form className="p-6 w-960">
                <div className="flex justify-between">
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pr-10 p-6">
                        <h2>Template Details:</h2>
                        <Input/> <br/>
                        <Input/> <br/>
                        <Input/> <br/>
                        <Input/> <br/>
                        <Input/> <br/>
                        <Input/> <br/>
                        <Input/> <br/>
                        {/*<DropDown dropdownItems={jsonArray} /> <br/>*/}
                    </div>
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pl-10 p-6 ml-4">
                        <h2>Template Files:</h2><br/>
                        <p className="text-black text-sm">Upload Template File (zip/rar):</p>
                        <input type="file" name="file" accept=".zip,.rar" className="mb-4 text-black text-sm"/> <br/>
                        <p className="text-black text-sm">Upload Template Thumbnail (jpg/png):</p>
                        <input type="file" name="file" accept=".jpg,.png" className="mb-4 text-black text-sm"/> <br/>
                        <br/>
                        <h2>Developers Message:</h2><br/>
                        <Input/> <br/>

                        {/*<DropDown dropdownItems={jsonArray} /> <br/>*/}
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
                    <div className="w-4"></div> {/* Spacer */}
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