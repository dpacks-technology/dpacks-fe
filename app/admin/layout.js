import PanelLayout from "@/app/layouts/PanelLayout";

export default function ALayout({ children }) {
    return (
        <div>
            <PanelLayout children={children}/>
        </div>
    );
}