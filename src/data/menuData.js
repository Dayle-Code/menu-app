import {
  Pizza,
  Coffee,
  Sandwich,
  CupSoda,
  Droplets,
  Utensils,
  Salad,
} from "lucide-react";

export const menuCategories = [
  {
    title: "Pizzas",
    icon: Pizza,
    image: "https://www.ocu.org/-/media/ocu/images/home/alimentacion/alimentos/pizzas_selector_1600x900.jpg?rev=6a81e278-07fc-4e95-9ba1-361063f35adf&hash=B8B1264AB6FC3F4B1AE140EB390208CD",
    products: [
      {
        name: "Muzzarella",
        description: "Salsa de tomate, muzzarella y orégano.",
        price: 6500,
      },
      {
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        price: 7200,
      },
    ],
  },
  {
    title: "Empanadas",
    icon: Utensils,
    image: "https://static.eldiario.es/clip/c582f7f0-0466-4175-8be9-0ad06c1113a1_16-9-discover-aspect-ratio_default_0.jpg",
    products: [
      {
        name: "Carne",
        description: "Empanada clásica de carne suave.",
        price: 900,
      },
      {
        name: "Pollo",
        description: "Empanada de pollo condimentado.",
        price: 900,
      },
    ],
  },
  {
    title: "Cafetería",
    icon: Coffee,
    image: "",
    products: [
      {
        name: "Café",
        description: "Café negro tradicional.",
        price: 1200,
      },
      {
        name: "Capuchino",
        description: "Café con leche espumada.",
        price: 1800,
      },
    ],
  },
  {
    title: "Gaseosas",
    icon: CupSoda,
    image: "https://images.rappi.cl/products/1745263895979_1745263889314_1745263888911.png",
    products: [
      {
        name: "Coca-Cola",
        description: "Botella individual.",
        price: 1600,
      },
      {
        name: "Sprite",
        description: "Botella individual.",
        price: 1600,
      },
    ],
  },
  {
    title: "Sándwiches",
    icon: Sandwich,
    image: "",
    products: [
      {
        name: "Lomito",
        description: "Lomo, lechuga, tomate, jamón, queso y huevo.",
        price: 6500,
      },
    ],
  },
  {
    title: "Complementos",
    icon: Salad,
    image: "",
    products: [
      {
        name: "Papas fritas",
        description: "Porción individual.",
        price: 3000,
      },
    ],
  },
  {
    title: "Bebidas",
    icon: CupSoda,
    image: "",
    products: [
      {
        name: "Limonada",
        description: "Limonada natural.",
        price: 2200,
      },
    ],
  },
  {
    title: "Aguas",
    icon: Droplets,
    image: "",
    products: [
      {
        name: "Agua mineral",
        description: "Botella individual.",
        price: 1200,
      },
    ],
  },
];