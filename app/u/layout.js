import PanelLayout from "@/app/layouts/PanelLayout";
import { AntdRegistry } from '@ant-design/nextjs-registry';
export default function ULayout({ children }) {
    return (
        <AntdRegistry>
        <div>
            <PanelLayout children={children}/>
        </div>
        </AntdRegistry>
    );
}