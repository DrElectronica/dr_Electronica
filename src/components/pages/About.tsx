import React from "react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="space-y-6 text-base text-muted-foreground">
          <section>
            <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
            <p>
              Nuestro compromiso es ofrecer soluciones electrónicas de alta calidad y proporcionar servicios técnicos
              profesionales que garanticen la satisfacción de nuestros clientes.
            </p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Principios</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Compromiso con el cliente</li>
              <li>Integridad profesional</li>
              <li>Garantia</li>
              <li>Responsabilidad</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default About;
