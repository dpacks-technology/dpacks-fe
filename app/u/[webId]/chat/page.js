
import ItemList from "@/app/components/item-list";
import ButtonComponent from "@/app/components/Button";

export default function chatDeleteAutomatedMessage() {
    const ItemListdata = {
        secondDis: "Hello",
        buttons: [
            {name: "Select", onClick: "enter onclick function here", color: "default" },
            { name: "Modify", onClick: "enter onclick function here", color: "success" },
            { name: "Delete", onClick: "enter onclick function here", color: "danger" },
        ],
    };

    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        Automated Message
                    </p>
                </div>
                <div className="mt-4">
                    <ItemList {...ItemListdata} />
                </div>
            </div>
            <div className="flex items-center justify-center h-12 mb-4">
                <ButtonComponent
                    name="Add"
                    variant="solid"
                    color="success"
                    size="lg"
                />
            </div>
        </div>
    );
}



