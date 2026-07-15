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

const productImage = (filename) =>
  `${import.meta.env.BASE_URL}images/products/${filename}`;

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
        detailDescription:
          "Una opción clásica de sabor suave, con abundante muzzarella fundida sobre salsa de tomate y un toque de orégano.",
        ingredients: "Masa, salsa de tomate, muzzarella y orégano.",
        portion: "8 porciones",
        tags: ["Clásica", "Con queso"],
        image: productImage("pizzas/muzzarella.svg"),
        price: 1000,
      },
      {
        id: "napolitana",
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        detailDescription:
          "Pizza de base clásica terminada con tomate fresco, ajo y orégano para un sabor más intenso y aromático.",
        ingredients:
          "Masa, salsa de tomate, muzzarella, tomate fresco, ajo y orégano.",
        portion: "8 porciones",
        tags: ["Con tomate", "Aromática"],
        image: productImage("pizzas/napolitana.svg"),
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
        detailDescription:
          "Empanada de relleno sabroso y equilibrado, preparada para conservar una textura jugosa en cada bocado.",
        ingredients: "Masa, carne y condimentos.",
        portion: "1 unidad",
        tags: ["Carne", "Casera"],
        image: productImage("empanadas/carne.svg"),
        price: 1000,
      },
      {
        id: "pollo",
        name: "Pollo",
        description: "Empanada de pollo condimentado.",
        detailDescription:
          "Empanada rellena de pollo condimentado, con un perfil suave y una masa dorada por fuera.",
        ingredients: "Masa, pollo y condimentos.",
        portion: "1 unidad",
        tags: ["Pollo", "Casera"],
        image: productImage("empanadas/pollo.svg"),
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
        detailDescription:
          "Café negro de preparación tradicional, servido caliente y con aroma intenso.",
        ingredients: "Café y agua.",
        portion: "Taza individual",
        tags: ["Caliente", "Intenso"],
        image: productImage("cafeteria/cafe.svg"),
        price: 1000,
      },
      {
        id: "capuchino",
        name: "Capuchino",
        description: "Café con leche espumada.",
        detailDescription:
          "Café combinado con leche caliente y una capa suave de espuma para una textura más cremosa.",
        ingredients: "Café y leche espumada.",
        portion: "Taza individual",
        tags: ["Caliente", "Cremoso"],
        image: productImage("cafeteria/capuchino.svg"),
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
        detailDescription:
          "Gaseosa fría en presentación individual, lista para acompañar cualquier plato del menú.",
        portion: "Botella individual",
        tags: ["Fría", "Individual"],
        image: productImage("gaseosas/coca-cola.svg"),
        price: 1000,
      },
      {
        id: "sprite",
        name: "Sprite",
        description: "Botella individual.",
        detailDescription:
          "Gaseosa lima-limón fría en presentación individual, de sabor fresco y ligero.",
        portion: "Botella individual",
        tags: ["Fría", "Lima-limón"],
        image: productImage("gaseosas/sprite.svg"),
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
        detailDescription:
          "Sándwich completo con lomo, vegetales frescos, jamón, queso y huevo, servido en pan tostado.",
        ingredients:
          "Pan, lomo, lechuga, tomate, jamón, queso y huevo.",
        portion: "Sándwich individual",
        tags: ["Completo", "Con lomo"],
        image: productImage("sandwiches/lomito.svg"),
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
        detailDescription:
          "Papas doradas y crujientes, ideales para acompañar sándwiches, pizzas o disfrutar por separado.",
        ingredients: "Papa, aceite y sal.",
        portion: "Porción individual",
        tags: ["Crujientes", "Acompañamiento"],
        image: productImage("complementos/papas-fritas.svg"),
        price: 1100,
      },
    ],
  },
];
