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
        price: 1000,
      },
      {
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        price: 1000,
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
        price: 1000,
      },
      {
        name: "Pollo",
        description: "Empanada de pollo condimentado.",
        price: 1000,
      },
    ],
  },
  {
    title: "Cafetería",
    icon: Coffee,
    image: "https://images.pexels.com/photos/414720/pexels-photo-414720.jpeg?cs=srgb&dl=art-background-beverage-414720.jpg&fm=jpg",
    products: [
      {
        name: "Café",
        description: "Café negro tradicional.",
        price: 1000,
      },
      {
        name: "Capuchino",
        description: "Café con leche espumada.",
        price: 1000,
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
        price: 1000,
      },
      {
        name: "Sprite",
        description: "Botella individual.",
        price: 1000,
      },
    ],
  },
  {
    title: "Sándwiches",
    icon: Sandwich,
    image: "https://th.bing.com/th/id/R.95461ee52d94fe16d1aaaaa5d0824275?rik=0zpbgnefcA6GyQ&pid=ImgRaw&r=0",
    products: [
      {
        name: "Lomito",
        description: "Lomo, lechuga, tomate, jamón, queso y huevo.",
        price: 1000,
      },
    ],
  },
  {
    title: "Complementos",
    icon: Salad,
    image: "https://imag.bonviveur.com/ensalada-de-lechuga-y-tomate-foto-cerca.jpg",
    products: [
      {
        name: "Papas fritas",
        description: "Porción individual.",
        price: 1100,
      },
    ],
  },
];