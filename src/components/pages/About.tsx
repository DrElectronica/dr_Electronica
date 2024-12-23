import React from "react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">
            Historia
          </h2>
          <p className="text-muted-foreground">
            Con más de 15 años de experiencia en el sector de la electrónica,
            nos hemos consolidado como líderes en la distribución de componentes
            y servicios técnicos especializados.
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">Misión</h2>
          <p className="text-muted-foreground">
            Proporcionar soluciones electrónicas de alta calidad y servicios
            técnicos profesionales, contribuyendo al desarrollo tecnológico de
            nuestros clientes.
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">Visión</h2>
          <p className="text-muted-foreground">
            Ser la empresa líder en soluciones electrónicas, reconocida por
            nuestra excelencia en servicio y compromiso con la innovación
            tecnológica.
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">
            Valores
          </h2>
          <ul className="list-disc pl-4 space-y-2">
            <li>Excelencia técnica</li>
            <li>Compromiso con el cliente</li>
            <li>Innovación constante</li>
            <li>Integridad profesional</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default About;
