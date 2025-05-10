import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import type { ProductWithVariants } from "@/lib/types";

export async function GET() {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=5");
        const data = await response.json();

        // Transform the API response to match data structure
        const transformedProducts: ProductWithVariants[] = data.products.map(
            (item: any) => ({
                id: uuidv4(),
                name: item.title,
                description: item.description,
                category: item.category,
                variants: item.variants || [
                    {
                        id: uuidv4(),
                        productId: item.id.toString(),
                        size: "Standard",
                        color: item.color || "Default",
                        colorHex:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                        price: item.price,
                        stock: item.stock,
                    },
                    {
                        id: uuidv4(),
                        productId: item.id.toString(),
                        size: "Large",
                        color: "Premium",
                        colorHex:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                        price: item.price * 1.2,
                        stock: Math.floor(item.stock / 2),
                    },
                ],
            })
        );

        // Store in localStorage
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(
                "product-variant-manager-products",
                JSON.stringify(transformedProducts)
            );
        }

        return NextResponse.json({
            success: true,
            count: transformedProducts.length,
        });
    } catch (error) {
        console.error("Error seeding products:", error);
        return NextResponse.json(
            { error: "Failed to seed products" },
            { status: 500 }
        );
    }
}
