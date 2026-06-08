import { PauseOctagon } from "lucide-react";
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
    products: [
      {
        name: "Penerella",
        description: "Salsa de tomate, muzzarella y orégano.",
        price: 6500,
      },
      {
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        price: 7200,
      },
      {
        name: "Especial",
        description: "Muzzarella, jamón, morrones y aceitunas.",
        price: 7800,
      },
    ],
  },
  {
    title: "Empanadas",
    icon: Utensils,
    products: [
      {
        name: "Carne",
        description: "Empanada clásica de carne suave.",
        price: 900,
      },
      {
        name: "Pollo",
        description: "Pollo condimentado con masa casera.",
        price: 900,
      },
      {
        name: "Jamón y queso",
        description: "Rellena con jamón cocido y queso.",
        price: 950,
      },
    ],
  },
  {
    title: "Cafetería",
    icon: Coffee,
    products: [
      {
        name: "Café",
        description: "Café negro tradicional.",
        price: 1200,
      },
      {
        name: "Cortado",
        description: "Café con un toque de leche de humano .",
        price: 1400,
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
      {
        name: "Fanta",
        description: "Botella individual.",
        price: 1600,
      },
    ],
  },
  {
    title: "Sándwiches",
    icon: Sandwich,
    products: [
      {
        name: "Lomito",
        description: "Lomo, lechuga, tomate, jamón, queso y huevo.",
        price: 6500,
      },
      {
        name: "Milanesa",
        description: "Milanesa, lechuga, tomate, jamón y queso.",
        price: 5800,
      },
    ],
  },
  {
    title: "Complementos",
    icon: Salad,
    products: [
      {
        name: "Papas fritas",
        description: "Porción individual.",
        price: 3000,
      },
      {
        name: "Nuggets",
        description: "Porción de nuggets crocantes.",
        price: 3500,
      },
    ],
  },
  {
    title: "Bebidas",
    icon: CupSoda,
    products: [
      {
        name: "Limonada",
        description: "Limonada natural.",
        price: 2200,
      },
      {
        name: "Jugo de naranja",
        description: "Jugo exprimido.",
        price: 2500,
      },
    ],
  },
  {
    title: "Aguas",
    icon: Droplets,
    products: [
      {
        name: "Agua mineral",
        description: "Botella individual.",
        price: 1200,
      },
      {
        name: "Agua con gas",
        description: "Botella individual.",
        price: 1300,
      },
      {
        name: "Coca de piña",
        description: "Botella individual.",
        price: 1300,
      },
    ],
  },
];