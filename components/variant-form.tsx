"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Variant } from "@/lib/types"
import { createVariant, updateVariant } from "@/lib/api"

const variantFormSchema = z.object({
  size: z.string().min(1, {
    message: "Size is required.",
  }),
  color: z.string().min(1, {
    message: "Color is required.",
  }),
  colorHex: z.string().optional(),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
})

type VariantFormValues = z.infer<typeof variantFormSchema>

interface VariantFormProps {
  productId: string
  variant?: Variant | null
  onSuccess: (variant: Variant) => void
  onCancel: () => void
}

export function VariantForm({ productId, variant, onSuccess, onCancel }: VariantFormProps) {
  const isEditing = !!variant

  const form = useForm<VariantFormValues>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: {
      size: variant?.size || "",
      color: variant?.color || "",
      colorHex: variant?.colorHex || "",
      price: variant?.price || 0,
      stock: variant?.stock || 0,
    },
  })

  async function onSubmit(values: VariantFormValues) {
    if (isEditing && variant) {
      const updatedVariant = await updateVariant(productId, variant.id, values)
      onSuccess(updatedVariant)
    } else {
      const newVariant = await createVariant(productId, values)
      onSuccess(newVariant)
    }
  }

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Variant" : "Add New Variant"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. M, L, XL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Red, Blue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="colorHex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Hex (optional)</FormLabel>
                  <div className="flex gap-2 items-center">
                    <FormControl>
                      <Input placeholder="#FF0000" {...field} />
                    </FormControl>
                    {field.value && (
                      <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: field.value }} />
                    )}
                  </div>
                  <FormDescription>Enter a hex color code (e.g. #FF0000 for red)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Add"} Variant</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
