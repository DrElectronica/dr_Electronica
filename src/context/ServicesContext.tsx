import React, { createContext, useContext, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface ServicesContextType {
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Reparación de Equipos",
    description: "Servicio profesional de reparación de equipos electrónicos",
    image: "https://www.redusers.com/noticias/wp-content/uploads/2023/09/Reparaciones-Electronicas-1-650x450-JPG.jpg",
    features: [
      "Diagnóstico Profesional",
      "Reparación de Placas",
      "Sustitución de Componentes",
      "Pruebas de Funcionamiento",
    ],
  },
  {
    id: "2",
    title: "Mantenimiento",
    description: "Servicios de mantenimiento preventivo y correctivo",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800",
    features: [
      "Mantenimiento Preventivo",
      "Limpieza Especializada",
      "Calibración de Equipos",
      "Actualización de Sistemas",
    ],
  },
  {
    id: "3",
    title: "Asesoría Técnica",
    description: "Consultoría y asesoramiento en proyectos electrónicos",
    image: "https://images.unsplash.com/photo-1581092160607-f6aa8a959e2c?w=800",
    features: [
      "Consultoría de Proyectos",
      "Diseño de Circuitos",
      "Optimización de Sistemas",
      "Capacitación Técnica",
    ],
  },
];

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined,
);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>(defaultServices);

  const addService = (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: Math.random().toString(36).substr(2, 9),
    };
    setServices([...services, newService]);
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updatedService } : service,
      ),
    );
  };

  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <ServicesContext.Provider
      value={{ services, addService, updateService, deleteService }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}
