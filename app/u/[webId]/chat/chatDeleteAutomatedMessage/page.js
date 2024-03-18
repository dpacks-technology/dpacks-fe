import ItemList from "@/app/components/item-list";


export default function chatDeleteAutomatedMessage() {
    const ItemListdata = {
        secondDis: "Hello",
        buttons: [
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
        </div>
    );
}



