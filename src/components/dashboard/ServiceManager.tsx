import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Search } from "lucide-react";
import { useServices } from "@/context/ServicesContext";

const ServiceManager = () => {
  const { services, addService, updateService, deleteService } = useServices();
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    image: "",
    features: [""],
  });

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
  };

  const handleAddService = () => {
    addService({
      ...newService,
      features: newService.features.filter((f) => f !== ""),
    });
    setNewService({ title: "", description: "", image: "", features: [""] });
  };

  const handleUpdateService = () => {
    if (selectedService) {
      updateService(selectedService.id, {
        ...selectedService,
        features: selectedService.features.filter((f) => f !== ""),
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleFeatureChange = (
    index: number,
    value: string,
    isNew: boolean = false,
  ) => {
    if (isNew) {
      setNewService((prev) => ({
        ...prev,
        features: prev.features.map((f, i) => (i === index ? value : f)),
      }));
    } else {
      setSelectedService((prev) => ({
        ...prev,
        features: prev.features.map((f, i) => (i === index ? value : f)),
      }));
    }
  };

  const addFeatureField = (isNew: boolean = false) => {
    if (isNew) {
      setNewService((prev) => ({
        ...prev,
        features: [...prev.features, ""],
      }));
    } else {
      setSelectedService((prev) => ({
        ...prev,
        features: [...prev.features, ""],
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Servicios</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar servicios..."
              className="pl-10 w-[300px]"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Agregar Nuevo Servicio</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Título del Servicio</Label>
                  <Input
                    placeholder="Ingrese el título"
                    value={newService.title}
                    onChange={(e) =>
                      setNewService({ ...newService, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    placeholder="Ingrese la descripción"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL de la Imagen</Label>
                  <Input
                    placeholder="Ingrese la URL de la imagen"
                    value={newService.image}
                    onChange={(e) =>
                      setNewService({ ...newService, image: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Características</Label>
                  {newService.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Ingrese una característica"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value, true)
                        }
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addFeatureField(true)}
                  >
                    Agregar Característica
                  </Button>
                </div>
                <Button onClick={handleAddService}>Guardar Servicio</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <ul className="list-disc pl-4 space-y-1">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(service)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Servicio</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Título del Servicio</Label>
                <Input
                  value={selectedService.title}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={selectedService.description}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>URL de la Imagen</Label>
                <Input
                  value={selectedService.image}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Características</Label>
                {selectedService.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addFeatureField()}
                >
                  Agregar Característica
                </Button>
              </div>
              <Button onClick={handleUpdateService}>Guardar Cambios</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceManager;
