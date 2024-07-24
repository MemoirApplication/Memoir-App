import { Button } from "@nextui-org/button";

import { Logo } from "./Logo";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    about..
                </Button>
            </div>
        </div>
    );
};
