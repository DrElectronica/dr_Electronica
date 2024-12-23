import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="font-semibold text-lg text-[#1e3a8a]">
                  {product.price}
                </p>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
              <Button className="w-full" variant="outline">
                Ver Detalles
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
