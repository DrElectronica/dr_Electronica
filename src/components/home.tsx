import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircuitBoard } from "lucide-react";

const Home = () => {
  const { products } = useProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            icon={<CircuitBoard className="w-16 h-16" />}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  price: string;
}

const ProductCard = ({
  title,
  description,
  icon,
  image,
  price,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-primary">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="font-semibold text-lg text-[#1e3a8a]">{price}</p>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <Link to="/productos">
          <Button className="w-full" variant="outline">
            Ver Detalles
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default Home;
