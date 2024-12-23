import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from "@/context/ServicesContext";

const Services = () => {
  const { services } = useServices();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Servicios Técnicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-[#1e3a8a]">
                {service.title}
              </h2>
              <p className="text-muted-foreground">{service.description}</p>
              <ul className="list-disc pl-4 space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
