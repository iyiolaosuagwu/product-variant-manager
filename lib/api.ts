import { v4 as uuidv4 } from "uuid"
import type { ProductFormData, ProductWithVariants, Variant, VariantFormData } from "./types"

// Local storage keys
const PRODUCTS_KEY = "product-variant-manager-products"

// Helper to get products from localStorage
const getStoredProducts = (): ProductWithVariants[] => {
  if (typeof window === "undefined") return []

  const storedProducts = localStorage.getItem(PRODUCTS_KEY)
  return storedProducts ? JSON.parse(storedProducts) : []
}

// Helper to save products to localStorage
const saveProducts = (products: ProductWithVariants[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

// Get all products
export const getProducts = async (): Promise<ProductWithVariants[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return getStoredProducts()
}

// Create a new product
export const createProduct = async (data: ProductFormData): Promise<ProductWithVariants> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newProduct: ProductWithVariants = {
    id: uuidv4(),
    name: data.name,
    description: data.description,
    category: data.category,
    variants: [],
  }

  const products = getStoredProducts()
  products.push(newProduct)
  saveProducts(products)

  return newProduct
}

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const products = getStoredProducts()
  const updatedProducts = products.filter((p) => p.id !== productId)
  saveProducts(updatedProducts)
}

// Create a new variant
export const createVariant = async (productId: string, data: VariantFormData): Promise<Variant> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newVariant: Variant = {
    id: uuidv4(),
    productId,
    size: data.size,
    color: data.color,
    colorHex: data.colorHex,
    price: data.price,
    stock: data.stock,
  }

  const products = getStoredProducts()
  const updatedProducts = products.map((product) =>
    product.id === productId ? { ...product, variants: [...product.variants, newVariant] } : product,
  )

  saveProducts(updatedProducts)
  return newVariant
}

// Update a variant
export const updateVariant = async (productId: string, variantId: string, data: VariantFormData): Promise<Variant> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const updatedVariant: Variant = {
    id: variantId,
    productId,
    size: data.size,
    color: data.color,
    colorHex: data.colorHex,
    price: data.price,
    stock: data.stock,
  }

  const products = getStoredProducts()
  const updatedProducts = products.map((product) =>
    product.id === productId
      ? {
          ...product,
          variants: product.variants.map((variant) => (variant.id === variantId ? updatedVariant : variant)),
        }
      : product,
  )

  saveProducts(updatedProducts)
  return updatedVariant
}

// Delete a variant
export const deleteVariant = async (productId: string, variantId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const products = getStoredProducts()
  const updatedProducts = products.map((product) =>
    product.id === productId
      ? {
          ...product,
          variants: product.variants.filter((variant) => variant.id !== variantId),
        }
      : product,
  )

  saveProducts(updatedProducts)
}

// Optional: Integration with external API
export const fetchProductsFromAPI = async (): Promise<ProductWithVariants[]> => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=5")
    const data = await response.json()

    // Transform the API response to match our data structure
    const transformedProducts: ProductWithVariants[] = data.products.map((item: any) => ({
      id: item.id.toString(),
      name: item.title,
      description: item.description,
      category: item.category,
      variants: item.variants || [
        {
          id: uuidv4(),
          productId: item.id.toString(),
          size: "Standard",
          color: item.color || "Default",
          price: item.price,
          stock: item.stock,
        },
      ],
    }))

    return transformedProducts
  } catch (error) {
    console.error("Error fetching products from API:", error)
    return []
  }
}
