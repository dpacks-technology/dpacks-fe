import PanelLayout from "@/app/Layouts/PanelLayout";

export default function ULayout({ children }) {
    return (
        <div>
            <PanelLayout children={children}/>
        </div>
    );
}