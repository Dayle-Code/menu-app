import test from "node:test";
import assert from "node:assert/strict";
import {
  findCategoryById,
  formatPrice,
  getCategoryHash,
  getCategoryIdFromHash,
} from "../utils/menu.js";

test("formatea precios para Argentina", () => {
  assert.equal(formatPrice(1000), "$1.000");
  assert.equal(formatPrice(12500), "$12.500");
});

test("informa cuando el precio no es válido", () => {
  assert.equal(formatPrice(Number.NaN), "Precio no disponible");
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
