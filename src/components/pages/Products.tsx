import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { jsPDF } from "jspdf";

const Products = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
  });

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    console.log("Productos cargados:", products);
    setFilteredProducts(products || []);
  }, [products]);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products || []);
    }
  }, [searchParams, products]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", "").replace(".", ""));
        return acc + (isNaN(price) ? 0 : price * item.quantity);
      }, 0);
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      return existingProduct
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleClearCart = () => setCart([]);
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddCustomProduct = () => {
    const { title, price } = newProduct;
    const validPrice = price ? !isNaN(price) && parseFloat(price) > 0 : true;

    if (validPrice) {
      const customProduct = {
        ...newProduct,
        id: Math.random().toString(36).substr(2, 9),
        quantity: 1,
        image: "default-icon",
      };
      setCart((prevCart) => [...prevCart, customProduct]);
      setNewProduct({ title: "", price: "" });
    } else {
      alert("Por favor, ingrese un precio válido.");
    }
  };

  const formatPrice = (price: string | number) => {
    const priceStr = typeof price === "string" ? price : price.toString();
    const parsedPrice = parseFloat(priceStr.replace("$", "").replace(/\./g, ""));
    
    if (isNaN(parsedPrice)) return "$0.00";
    const formattedPrice = parsedPrice.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `$${formattedPrice}`;
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const colWidth = 60; // Ancho de la columna de producto
    const descWidth = 90; // Ancho de la columna de descripción
    const priceWidth = 40; // Ancho de la columna de precio
    const qtyWidth = 25; // Ancho de la columna de cantidad ajustado para mejor visualización
    let yOffset = 30;
  
    // Estilo de la cabecera
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Presupuesto", margin, yOffset);
    yOffset += 10;
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Dr.Electronica`, margin, yOffset);
    yOffset += 7;
    doc.text(`Vendedor: Diego Riquelmi`, margin, yOffset);
    yOffset += 7;
    doc.text(`Domicilio: Castagnino 1960`, margin, yOffset);
    yOffset += 7;
    doc.text(`Cel: 341 584 5345`, margin, yOffset);
    yOffset += 15;
  
    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.line(margin, yOffset, 200, yOffset);
    yOffset += 7;
  
    // Encabezado de la tabla
    doc.setFont("helvetica", "bold");
    doc.text("Unidad", margin, yOffset); // Columna de cantidad primero
    doc.text("Producto", margin + qtyWidth + 5, yOffset);
    doc.text("Descripción", margin + qtyWidth + colWidth + 5, yOffset);
    doc.text("Precio", margin + qtyWidth + colWidth + descWidth + 10, yOffset, { align: "right" });
    yOffset += 12;
  
    // Línea divisoria
    doc.line(margin, yOffset, 200, yOffset);
    yOffset += 7;
  
    // Función para truncar texto con "..."
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };
  
    // Detalle de productos
    cart.forEach((item) => {
      doc.setFont("helvetica", "normal");
  
      // Mostrar la cantidad primero
      doc.text(`${item.quantity}`, margin, yOffset);
  
      // Nombre del producto
      doc.text(item.title, margin + qtyWidth + 5, yOffset);
  
      // Descripción truncada si es necesario
      const description = item.description || "Sin descripción";
      const truncatedDescription = truncateText(description, 35); // Limitar a 35 caracteres
      doc.text(truncatedDescription, margin + qtyWidth + colWidth + 5, yOffset);
  
      // Precio alineado a la derecha
      doc.text(formatPrice(item.price), margin + qtyWidth + colWidth + descWidth + 10, yOffset, { align: "right" });
  
      yOffset += 12; // Aumenté el espacio entre filas
    });
  
    // Línea divisoria al final de la lista
    doc.line(margin, yOffset, 200, yOffset);
    yOffset += 7;
  
    // Total
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${formatPrice(total)}`, margin, yOffset);
    yOffset += 12;
  
    // Fecha
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, yOffset);
    yOffset += 10;
  
    // Guardar el PDF
    doc.save("Presupuesto.pdf");
  };
   

  return (
<div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold mb-8">Productos</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleImageClick(product.image)}
            />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="font-semibold text-lg text-[#1e3a8a]">
                {formatPrice(product.price)}
              </p>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <Button className="w-full" variant="outline" onClick={() => handleAddToCart(product)}>
              Agregar Carrito
            </Button>
          </div>
        </Card>
      ))
    ) : (
      <div className="col-span-full text-center text-muted-foreground">
        No hay productos disponibles.
      </div>
    )}
  </div>

  {/* Botón flotante para abrir el carrito en móvil */}
      <Button
        className="fixed bottom-4 right-4 bg-blue-500 text-white text-2xl rounded-full p-4 shadow-lg z-50"
        onClick={() => setIsCartVisible(true)}
      >
        <FaShoppingCart />
      </Button>


      <div
        className={`fixed bottom-0 right-0 w-full max-w-md bg-white border-t md:rounded-tl-lg shadow-lg p-4 space-y-4 transition-transform duration-300 ease-in-out ${isCartVisible ? "translate-y-0" : "translate-y-full md:translate-y-0 md:translate-x-full"}`}
        style={{ zIndex: 1000 }}
      >


    <Button
      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
      onClick={() => setIsCartVisible(false)}
    >
      X
    </Button>

    <h2 className="text-xl font-bold">Presupuesto</h2>

    <div className="flex items-center space-x-4 border-b pb-2">
      <input
        type="text"
        className="w-2/3 p-2 border rounded-md"
        placeholder="Nombre del producto (opcional)"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        type="text"
        className="w-2/3 p-2 border rounded-md"
        placeholder="Precio (opcional)"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <div className="w-1/3 flex justify-center items-center">
        <FaShoppingCart className="text-4xl text-gray-600" />
      </div>
      <Button
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleAddCustomProduct}
      >
        Agregar
      </Button>
    </div>

    <div className="h-60 overflow-y-auto">
      {cart.map((item, index) => (
        <div key={index} className="flex justify-between py-2">
          <span>{item.title}</span>
          <span>{formatPrice(item.price)}</span>
          <div className="flex items-center space-x-2">
            <span>Cantidad: {item.quantity}</span>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-between font-bold text-lg">
      <span>Total:</span>
      <span>{formatPrice(total)}</span>
    </div>

    <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={generatePDF}>
      Generar PDF
    </Button>

    <Button className="w-full bg-red-500 text-white hover:bg-red-600" onClick={handleClearCart}>
      Vaciar Carrito
    </Button>
  </div>

  {isImageModalOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleCloseModal}
    >
      <div className="relative">
        <img
          src={selectedImage}
          alt="Imagen ampliada"
          className="max-w-full max-h-screen object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
          onClick={handleCloseModal}
        >
          X
        </Button>
      </div>
    </div>
  )}
</div>

  );
};

export default Products;
