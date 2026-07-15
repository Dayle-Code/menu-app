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
        tags: ["Clásica", "Con queso"],
        featured: true,
        image: productImage("pizzas/muzzarella.svg"),
        price: 1000,
        variants: [
          {
            id: "mediana",
            name: "Mediana",
            portion: "8 porciones",
            price: 1000,
          },
          {
            id: "grande",
            name: "Grande",
            portion: "12 porciones",
            price: 1500,
          },
        ],
      },
      {
        id: "napolitana",
        name: "Napolitana",
        description: "Muzzarella, tomate fresco, ajo y orégano.",
        detailDescription:
          "Pizza de base clásica terminada con tomate fresco, ajo y orégano para un sabor más intenso y aromático.",
        ingredients:
          "Masa, salsa de tomate, muzzarella, tomate fresco, ajo y orégano.",
        tags: ["Con tomate", "Aromática"],
        image: productImage("pizzas/napolitana.svg"),
        price: 1100,
        variants: [
          {
            id: "mediana",
            name: "Mediana",
            portion: "8 porciones",
            price: 1100,
          },
          {
            id: "grande",
            name: "Grande",
            portion: "12 porciones",
            price: 1600,
          },
        ],
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
        available: false,
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
        isNew: true,
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
        tags: ["Caliente", "Intenso"],
        image: productImage("cafeteria/cafe.svg"),
        price: 1000,
        variants: [
          {
            id: "chico",
            name: "Chico",
            portion: "Taza chica",
            price: 1000,
          },
          {
            id: "grande",
            name: "Grande",
            portion: "Taza grande",
            detailDescription:
              "Café negro en taza grande, ideal para disfrutar con más tiempo.",
            price: 1300,
          },
        ],
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
        featured: true,
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
        description: "Gaseosa fría en distintas presentaciones.",
        detailDescription:
          "Gaseosa fría disponible en varios tamaños para acompañar cualquier plato del menú.",
        tags: ["Fría", "Cola"],
        image: productImage("gaseosas/coca-cola.svg"),
        price: 1000,
        variants: [
          {
            id: "500-ml",
            name: "500 ml",
            portion: "Botella individual",
            price: 1000,
          },
          {
            id: "1-5-l",
            name: "1,5 litros",
            portion: "Botella para compartir",
            price: 1800,
          },
        ],
      },
      {
        id: "sprite",
        name: "Sprite",
        description: "Gaseosa lima-limón en distintas presentaciones.",
        detailDescription:
          "Gaseosa lima-limón fría, de sabor fresco y ligero, disponible en distintos tamaños.",
        tags: ["Fría", "Lima-limón"],
        image: productImage("gaseosas/sprite.svg"),
        price: 1000,
        variants: [
          {
            id: "500-ml",
            name: "500 ml",
            portion: "Botella individual",
            price: 1000,
          },
          {
            id: "1-5-l",
            name: "1,5 litros",
            portion: "Botella para compartir",
            price: 1800,
            available: false,
          },
        ],
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
        featured: true,
        image: productImage("sandwiches/lomito.svg"),
        price: 1000,
        variants: [
          {
            id: "clasico",
            name: "Clásico",
            portion: "Sándwich individual",
            price: 1000,
          },
          {
            id: "con-papas",
            name: "Con papas fritas",
            portion: "Sándwich con porción de papas",
            detailDescription:
              "Lomito completo acompañado por una porción individual de papas fritas.",
            price: 1500,
          },
        ],
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
