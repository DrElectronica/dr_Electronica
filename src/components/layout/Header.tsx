import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#1e3a8a]">
            Dr. Electrónica
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-12 text-lg font-medium">
              <li>
                <Link
                  to="/productos"
                  className="text-gray-600 hover:text-[#1e3a8a] transition-colors"
                >
                  PRODUCTOS
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="text-gray-600 hover:text-[#1e3a8a] transition-colors"
                >
                  SERVICIOS TÉCNICOS
                </Link>
              </li>
              <li>
                <Link
                  to="/empresa"
                  className="text-gray-600 hover:text-[#1e3a8a] transition-colors"
                >
                  NOSOTROS
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-gray-600 hover:text-[#1e3a8a] transition-colors"
                >
                  CONTACTO
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="w-[250px]">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-[50%] -translate-y-[50%] h-4 w-4 text-gray-400" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
