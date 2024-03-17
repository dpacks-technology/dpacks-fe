import SearchBar from "@/app/components/SearchBar";
import CardTemp from "@/app/components/Card";

function CardTempc() {
    return null;
}

export default function marketplace(){
    const cardData = {
        title: "Template Title",
        secondDes: "Secondary Description",
        description: "Tertiary Description",
        buttons: [
            {
                name: "Edit",
                onClick: "enter onclick unction"
                //isDisabled
            },
            {
                name: "Delete",
                onClick: "enter onclick unction"
                //isDisabled
            }
        ],
    }
    return (
        <>
            <h1 className="text-4xl font-bold text-center text-white-800 py-8">Web Templates Marketplace</h1>
            <div className="flex justify-center">
                <SearchBar/>
                <CardTempc {...cardData} />
            </div>

            <CardTempc {...cardData} />



        </>
    )
}