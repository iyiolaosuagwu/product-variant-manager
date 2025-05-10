"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductList } from "@/components/product-list";
import { ProductForm } from "@/components/product-form";
import { getProducts } from "@/lib/api";
import type { ProductWithVariants } from "@/lib/types";
import { Header } from "./header";

export function ProductDashboard() {
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const handleProductAdded = (newProduct: ProductWithVariants) => {
        queryClient.setQueryData(
            ["products"],
            (oldData: ProductWithVariants[] = []) => [...oldData, newProduct]
        );
        setIsAddingProduct(false);
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
            <Header />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Products
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your products and their variants
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddingProduct(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {isAddingProduct ? (
                <ProductForm
                    onSuccess={handleProductAdded}
                    onCancel={() => setIsAddingProduct(false)}
                />
            ) : (
                <ProductList products={products} isLoading={isLoading} />
            )}
        </div>
    );
}
