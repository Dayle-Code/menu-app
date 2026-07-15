import test from "node:test";
import assert from "node:assert/strict";
import {
  filterMenu,
  findCategoryById,
  formatPrice,
  formatProductPrice,
  getCategoryHash,
  getCategoryIdFromHash,
  getDefaultVariant,
  getMenuTags,
  getProductStartingPrice,
  normalizeSearchText,
  searchMenu,
} from "../utils/menu.js";

test("formatea precios para Argentina", () => {
  assert.equal(formatPrice(1000), "$1.000");
  assert.equal(formatPrice(12500), "$12.500");
});

test("informa cuando el precio no es válido", () => {
  assert.equal(formatPrice(Number.NaN), "Precio no disponible");
});

test("calcula el menor precio disponible entre variantes", () => {
  const product = {
    price: 900,
    variants: [
      { id: "chico", price: 1000, available: false },
      { id: "mediano", price: 1200 },
      { id: "grande", price: 1500 },
    ],
  };

  assert.equal(getProductStartingPrice(product), 1200);
  assert.equal(formatProductPrice(product), "Desde $1.200");
});

test("admite el prefijo desde sin variantes", () => {
  assert.equal(
    formatProductPrice({ price: 2500, priceFrom: true }),
    "Desde $2.500",
  );
});

test("no muestra desde cuando las variantes disponibles valen lo mismo", () => {
  assert.equal(
    formatProductPrice({
      variants: [
        { id: "chico", price: 1200 },
        { id: "grande", price: 1200 },
      ],
    }),
    "$1.200",
  );
});

test("selecciona por defecto la primera variante disponible", () => {
  const product = {
    variants: [
      { id: "chico", price: 1000, available: false },
      { id: "mediano", price: 1200 },
      { id: "grande", price: 1500 },
    ],
  };

  assert.equal(getDefaultVariant(product)?.id, "mediano");
  assert.equal(getDefaultVariant({ variants: [] }), null);
});

test("normaliza mayúsculas y tildes para buscar", () => {
  assert.equal(normalizeSearchText("  CAFETERÍA  "), "cafeteria");
});

test("busca productos por etiqueta, ingrediente y variante", () => {
  const categories = [
    {
      id: "cafeteria",
      title: "Cafetería",
      products: [
        {
          id: "capuchino",
          name: "Capuchino",
          description: "Café con leche.",
          ingredients: "Café y leche espumada",
          tags: ["Cremoso"],
          variants: [
            {
              id: "grande",
              name: "Grande",
              portion: "Taza grande",
              price: 2000,
            },
          ],
        },
      ],
    },
  ];

  assert.equal(searchMenu(categories, "cremoso").length, 1);
  assert.equal(searchMenu(categories, "leche espumada").length, 1);
  assert.equal(searchMenu(categories, "cafeteria grande").length, 1);
  assert.equal(searchMenu(categories, "taza grande").length, 1);
  assert.equal(searchMenu(categories, "pizza").length, 0);
});

test("filtra por etiqueta y la combina con el texto de búsqueda", () => {
  const categories = [
    {
      id: "cafeteria",
      title: "Cafetería",
      products: [
        { id: "cafe", name: "Café", tags: ["Caliente", "Intenso"] },
        {
          id: "capuchino",
          name: "Capuchino",
          tags: ["Caliente", "Cremoso"],
        },
      ],
    },
  ];

  assert.equal(filterMenu(categories, { tag: "caliente" }).length, 2);
  assert.equal(
    filterMenu(categories, { query: "capuchino", tag: "caliente" }).length,
    1,
  );
  assert.equal(
    filterMenu(categories, { query: "intenso", tag: "cremoso" }).length,
    0,
  );
});

test("obtiene etiquetas únicas y ordenadas", () => {
  const categories = [
    {
      products: [
        { tags: ["Cremoso", "Caliente"] },
        { tags: ["caliente", "Aromática"] },
      ],
    },
  ];

  assert.deepEqual(getMenuTags(categories), ["Aromática", "Caliente", "Cremoso"]);
});

test("construye y lee el hash de una categoría", () => {
  const hash = getCategoryHash("cafetería");

  assert.equal(hash, "#categoria/cafeter%C3%ADa");
  assert.equal(getCategoryIdFromHash(hash), "cafetería");
});

test("ignora hashes ajenos o incompletos", () => {
  assert.equal(getCategoryIdFromHash("#otra-seccion"), null);
  assert.equal(getCategoryIdFromHash("#categoria/"), null);
  assert.equal(getCategoryIdFromHash("#categoria/%E0%A4%A"), null);
});

test("encuentra una categoría por su identificador estable", () => {
  const categories = [
    { id: "pizzas", title: "Pizzas" },
    { id: "cafeteria", title: "Cafetería" },
  ];

  assert.deepEqual(findCategoryById(categories, "cafeteria"), categories[1]);
  assert.equal(findCategoryById(categories, "inexistente"), null);
});
