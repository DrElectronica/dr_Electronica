import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1e3a8a]">
        Contáctanos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-[#1e3a8a]">
              Información de Contacto
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-[#1e3a8a]" />
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-muted-foreground">
                    Castagnino 1960, Miller y Esquivel
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-[#1e3a8a]" />
                <div>
                  <h3 className="font-medium">Whatsapp</h3>
                  <p className="text-muted-foreground">+54 341 584 5345</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">
              Horario de Atención
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Lunes a Viernes:</span> 9:00 - 18:00
              </p>
              <p>
                <span className="font-medium">Sábados:</span> 9:00 - 13:00
              </p>
              <p>
                <span className="font-medium">Domingos:</span> Cerrado
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-[#1e3a8a]">
            Ubicación
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md">
            <a href="https://maps.app.goo.gl/so4HecTTWvCZgBX29" target="_blank">
              <img
                src="./ubicacion.jpg"
                alt="Ubicación"
                width="800"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
