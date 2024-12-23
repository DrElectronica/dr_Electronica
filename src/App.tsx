import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Products from "./components/pages/Products";
import Services from "./components/pages/Services";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import { ProductProvider } from "./context/ProductContext";
import { ServicesProvider } from "./context/ServicesContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminLogin from "./components/auth/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ServicesProvider>
          <Layout>
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/empresa" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </Suspense>
          </Layout>
        </ServicesProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
