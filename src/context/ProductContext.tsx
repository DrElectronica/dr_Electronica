// src/components/context/ProductContext.tsx
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
    description: "luces led decoracion, control remoto",
    image: "https://www.carmelimportaciones.com/imgs/productos/productos31_1466.jpg",
    price: "$15.000",
  },
  {
    id: "3",
    title: "Luces led",
    description: "luces led decoracion",
    image: "https://festilandia.ar/wp-content/uploads/2023/11/led-como-funcionan-bombillas-655x368-1.jpg",
    price: "$14.000",
  },
  {
    id: "4",
    title: "Parlante",
    description: "Parlantes bluetooth mini 4cm",
    image: "https://lexmayorista.com.ar/subidas/gesu_109922.jpg?foto=18215766",
    price: "$0",
  },
  {
    id: "5",
    title: "Parlante",
    description: "Parlantes bluetooth mini 12cm",
    image: "https://oncealpormayor.com.ar/wp-content/uploads/2023/12/GTS-1835.jpg",
    price: "$0",
  },
  {
    id: "6",
    title: "Mouse",
    description: "Mouse Inalambrico bluetooth",
    image: "https://acdn.mitiendanube.com/stores/001/827/432/products/diseno-sin-titulo-2024-05-14t125906-628-768x768-3d8cd00c4ff563b69317161677002674-1024-1024.png",
    price: "$0",
  },
  {
    id: "7",
    title: "Cargador Neetbook",
    description: "Cargador Universal",
    image: "https://www.toptecnouy.com/imgs/productos/productos31_25259.jpg",
    price: "$0",
  },
  {
    id: "8",
    title: "Cable de Red",
    description: "Cable internet",
    image: "https://http2.mlstatic.com/D_NQ_NP_902346-MLA76814748263_062024-O.webp",
    price: "$0"
  },
  {
    id: "9",
    title: "Botella termica",
    description: "Botella termica",
    image: "https://images.pricely.ar/images/103/6902221308993.jpg",
    price: "$0",
  },
  {
    id: "10",
    title: "Transmisor FM-Bluetooth",
    description: "Modelo:CARG7",
    image: "https://acdn.mitiendanube.com/stores/001/155/056/products/transmisor-fm-carg7-bluetooth-car-charger1-bbf089577eaab43c8916346537283624-640-0.jpeg",
    price: "$0",
  },
  {
    id: "11",
    title: "Repetidor de señal wifi",
    description: "Repeater WiFi",
    image: "https://http2.mlstatic.com/D_NQ_NP_957321-MLA78035937089_072024-O.webp",
    price: "$0",
  },
  {
    id: "12",
    title: "Parlante",
    description: "Modelo:LM-S470",
    image: "https://www.onlyneuquen.com.ar/wp-content/uploads/2017/06/1688479619854b84ddc6643a8d8ca0197a090e76a5.jpg",
    price: "$0",
  },
  {
    id: "13",
    title: "Camara IP WiFi",
    description: "Smart Camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgS5layVR9NtZrcs0YDohTY1QDZt-tV7mYGg&s",
    price: "$0",
  },
  {
    id: "14",
    title: "Camara IP WiFi",
    description: "Para Foco",
    image: "https://http2.mlstatic.com/D_NQ_NP_916505-MLU71436910742_092023-O.webp",
    price: "$0",
  },
  {
    id: "15",
    title: "Licuadora",
    description: "Portatil USB Botella",
    image: "https://www.clicshop.com.uy/imgs/productos/productos31_18867.jpg",
    price: "$0",
  },
  {
    id: "16",
    title: "Maquina cortar pelo",
    description: "Portatil USB con visor",
    image: "https://acdn.mitiendanube.com/stores/001/827/432/products/diseno-sin-titulo-2024-05-27t104456-826-768x768-1263d4ffbf8224190217168480784752-1024-1024.png",
    price: "$0",
  },
  {
    id: "17",
    title: "Maquina cortar pelo",
    description: "Portatil USB VT9",
    image: "https://acdn.mitiendanube.com/stores/002/259/070/products/2-4da3a901bc4615d71517156365715287-1024-1024.png",
    price: "$0",
  },
  {
    id: "18",
    title: "Pava electrica",
    description: "CTM-OSR9145",
    image: "https://http2.mlstatic.com/D_NQ_NP_715586-MLA75620531789_042024-O.webp",
    price: "$0",
  },
  {
    id: "19",
    title: "Plancha de pelo",
    description: "",
    image: "https://acdn.mitiendanube.com/stores/001/131/056/products/planchi1-25cc146af385d7deb716842732922089-1024-1024.png",
    price: "$0",
  },
  {
    id: "20",
    title: "Secador de Pelo",
    description: "Modelo:VG2430",
    image: "https://electronicaimportadamdq.com/wp-content/uploads/2024/09/Sin-titulo22-1.jpg",
    price: "$21.000",
  },
  {
    id: "20",
    title: "Auricular in ear bluetooth",
    description: "Modelo:JS25 Tipo C",
    image: "https://mayoristas.sorinek.com/wp-content/uploads/2024/07/Auricular-Inalambrico-Con-Pantalla-In-ear-JS25-web.png",
    price: "$0",
  },
  {
    id: "21",
    title: "Auricular BT ultrapods Max",
    description: "Bluetooth",
    image: "https://tecnoadictos.com.ar/wp-content/uploads/2024/06/AURICULAR-INALAMBRICO-ULTRAPODS-MAX-5.3.webp",
    price: "$0",
  },
  {
    id: "22",
    title: "Auricular Conejito bluetooth",
    description: "Modelo:P47",
    image: "https://dcdn.mitiendanube.com/stores/003/922/029/products/bt47m-8ce6c4efd971045b0417245445840387-1024-1024.jpg",
    price: "$0",
  },
  {
    id: "23",
    title: "Auricular in ear bluetooth-visor",
    description: "Modelo:JS1 Tipo C",
    image: "https://acdn.mitiendanube.com/stores/001/703/452/products/js1-45f76d3442b76b753a17234279042369-640-0.jpg",
    price: "$0",
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
