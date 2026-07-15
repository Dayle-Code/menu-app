import {
  Coffee,
  CupSoda,
  Pizza,
  Salad,
  Sandwich,
  Utensils,
} from "lucide-react";

const categoryImage = (filename) =>
  `${import.meta.env.BASE_URL}images/categories/${filename}`;

export const menuCategories = [
  {
    id: "pizzas",
    title: "Pizzas",
    icon: Pizza,
    image: categoryImage("pizzas.svg"),
    products: [
      {
        id: "muzzarella",
        name: "Muzzarella",
        description: "Salsa de tomate, muzzarella y orégano.",
        price: 1000,
      },
      {
        id: "napolitana",
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        price: 1000,
      },
    ],
  },
  {
    id: "empanadas",
    title: "Empanadas",
    icon: Utensils,
    image: categoryImage("empanadas.svg"),
    products: [
      {
        id: "carne",
        name: "Carne",
        description: "Empanada clásica de carne suave.",
        price: 1000,
      },
      {
        id: "pollo",
        name: "Pollo",
        description: "Empanada de pollo condimentado.",
        price: 1000,
      },
    ],
  },
  {
    id: "cafeteria",
    title: "Cafetería",
    icon: Coffee,
    image: categoryImage("cafeteria.svg"),
    products: [
      {
        id: "cafe",
        name: "Café",
        description: "Café negro tradicional.",
        price: 1000,
      },
      {
        id: "capuchino",
        name: "Capuchino",
        description: "Café con leche espumada.",
        price: 1000,
      },
    ],
  },
  {
    id: "gaseosas",
    title: "Gaseosas",
    icon: CupSoda,
    image: categoryImage("gaseosas.svg"),
    products: [
      {
        id: "coca-cola",
        name: "Coca-Cola",
        description: "Botella individual.",
        price: 1000,
      },
      {
        id: "sprite",
        name: "Sprite",
        description: "Botella individual.",
        price: 1000,
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sándwiches",
    icon: Sandwich,
    image: categoryImage("sandwiches.svg"),
    products: [
      {
        id: "lomito",
        name: "Lomito",
        description: "Lomo, lechuga, tomate, jamón, queso y huevo.",
        price: 1000,
      },
    ],
  },
  {
    id: "complementos",
    title: "Complementos",
    icon: Salad,
    image: categoryImage("complementos.svg"),
    products: [
      {
        id: "papas-fritas",
        name: "Papas fritas",
        description: "Porción individual.",
        price: 1100,
      },
    ],
  },
];
