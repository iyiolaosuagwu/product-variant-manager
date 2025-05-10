export interface Product {
  id: string
  name: string
  description: string
  category: string
}

export interface Variant {
  id: string
  productId: string
  size: string
  color: string
  colorHex?: string
  price: number
  stock: number
}

export interface ProductWithVariants extends Product {
  variants: Variant[]
}

export interface ProductFormData {
  name: string
  description: string
  category: string
}

export interface VariantFormData {
  size: string
  color: string
  colorHex?: string
  price: number
  stock: number
}
