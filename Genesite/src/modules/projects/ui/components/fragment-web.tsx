import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface Props {
    data: Fragment;
}


export const FragmentWeb = ({ data }: Props) => {
    const [fragmentKey, setFragmentKey] = useState(0);
    const [copied, setCopied] = useState(false);

    const onRefresh = () => {
        setFragmentKey(prev => prev + 1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Refresh preview" side="bottom" align="start">
                    <Button size="sm" variant="outline" onClick={onRefresh}>
                    <RefreshCcwIcon  />
                </Button>
                </Hint>
                <Hint text="Copy URL" side="bottom" align="center">
                    <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCopy}
                    disabled={!data.sandboxUrl || copied}
                    className="flex-1 justify-start text-start font "
                >
                    <span className="trunctate">
                        {data.sandboxUrl}
                    </span>
                </Button>
                </Hint>
                <Hint text="Open in new tab" side="bottom" align="start">
                    <Button
                    size="sm"
                    disabled={!data.sandboxUrl}
                    variant="outline"
                    onClick={() => {
                        if(!data.sandboxUrl) return;
                        window.open(data.sandboxUrl, "_blank");
                    }}
                >
                    <ExternalLinkIcon />
                </Button>
                </Hint>
            </div>
            <iframe
                key={fragmentKey}
                className="h-full w-full"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={data.sandboxUrl}
            />
        </div>
    );
};