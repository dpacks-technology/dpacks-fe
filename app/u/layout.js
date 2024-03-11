import PanelLayout from "@/app/layouts/PanelLayout";

export default function ULayout({ children }) {
    return (
        <div>
            <PanelLayout children={children}/>
        </div>
    );
}