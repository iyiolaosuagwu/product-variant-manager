"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VariantList } from "@/components/variant-list"
import { VariantForm } from "@/components/variant-form"
import type { ProductWithVariants, Variant } from "@/lib/types"
import { deleteProduct } from "@/lib/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProductCardProps {
  product: ProductWithVariants
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingVariant, setIsAddingVariant] = useState(false)
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)
  const queryClient = useQueryClient()

  const handleVariantAdded = (newVariant: Variant) => {
    queryClient.setQueryData(["products"], (oldData: ProductWithVariants[] = []) =>
      oldData.map((p) => (p.id === product.id ? { ...p, variants: [...p.variants, newVariant] } : p)),
    )
    setIsAddingVariant(false)
  }

  const handleVariantUpdated = (updatedVariant: Variant) => {
    queryClient.setQueryData(["products"], (oldData: ProductWithVariants[] = []) =>
      oldData.map((p) =>
        p.id === product.id
          ? {
              ...p,
              variants: p.variants.map((v) => (v.id === updatedVariant.id ? updatedVariant : v)),
            }
          : p,
      ),
    )
    setEditingVariant(null)
  }

  const handleVariantDeleted = (variantId: string) => {
    queryClient.setQueryData(["products"], (oldData: ProductWithVariants[] = []) =>
      oldData.map((p) =>
        p.id === product.id
          ? {
              ...p,
              variants: p.variants.filter((v) => v.id !== variantId),
            }
          : p,
      ),
    )
  }

  const handleDeleteProduct = () => {
    deleteProduct(product.id)
    queryClient.setQueryData(["products"], (oldData: ProductWithVariants[] = []) =>
      oldData.filter((p) => p.id !== product.id),
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete product</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the product and all its variants.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{product.variants.length} variants</Badge>
          <Badge variant="outline">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingVariant || editingVariant ? (
          <VariantForm
            productId={product.id}
            variant={editingVariant}
            onSuccess={editingVariant ? handleVariantUpdated : handleVariantAdded}
            onCancel={() => {
              setIsAddingVariant(false)
              setEditingVariant(null)
            }}
          />
        ) : (
          <VariantList variants={product.variants} onEdit={setEditingVariant} onDelete={handleVariantDeleted} />
        )}
      </CardContent>
      {!isAddingVariant && !editingVariant && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingVariant(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Variant
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
