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
    title: "Reparacion Celular",
    description: "",
    image: "https://dcdn.mitiendanube.com/stores/001/984/904/products/microelectronica1-7a8827ac9e5708ef4316409040843135-640-0.jpg",
    features: [
      "Celular mojado",
      "Modulo roto",
      "Pin de Carga roto",
      "Bateria Inflada",
    ],
  },
  {
    id: "3",
    title: "Reparacion Televisor",
    description: "",
    image: "https://sedinfo.es/panel/imagenes/anuncios/37337/cabecera.jpg",
    features: [
      "No enciende",
      "Problema Audio",
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
