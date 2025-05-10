import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <Package className="h-5 w-5" />
                    <span>Product Manager</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Button variant="outline" asChild>
                            <Link
                                href="https://github.com/yourusername/product-variant-manager"
                                target="_blank"
                            >
                                GitHub
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
