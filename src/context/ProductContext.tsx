import React, { createContext, useContext, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Luces led selfie",
    description: "luces led para selfi",
    image: "https://images.rappi.com/products/1670696297683_1670696059053_1670696057446.jpg?e=webp&q=80&d=130x130",
    price: "$26.000",
  },
  {
    id: "2",
    title: "Luces led",
    description: "luces led decoracion, control remoto cambiar colores.",
    image: "https://www.carmelimportaciones.com/imgs/productos/productos31_1466.jpg",
    price: "$15.000",
  },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
