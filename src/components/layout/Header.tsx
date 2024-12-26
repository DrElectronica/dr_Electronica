import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Referencia para el contenedor de la barra de búsqueda
  const searchRef = useRef<HTMLDivElement>(null);

  // Bloquear desplazamiento cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Detectar clic fuera de la barra de búsqueda
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        // Si la búsqueda tiene contenido, navegar
        if (searchQuery.trim()) {
          navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, searchQuery, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between h-20 md:h-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide hover:text-blue-200 transition-colors"
          >
            Dr. Electrónica
          </Link>

          {/* Barra de búsqueda */}
          <div ref={searchRef} className="w-full md:w-[300px] mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-2 rounded-full bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-[50%] -translate-y-[50%] h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Barra para móviles */}
          <button
            className="md:hidden p-2 mt-4"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Navegación */}
          <nav
            className={`fixed top-0 left-0 h-full w-64 bg-blue-800 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:flex md:gap-8 md:bg-transparent md:h-auto md:w-auto`}
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-0 text-lg font-medium">
              <li>
                <Link
                  to="/productos"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PRODUCTOS
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SERVICIOS TÉCNICOS
                </Link>
              </li>
              <li>
                <Link
                  to="/empresa"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NOSOTROS
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACTO
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
