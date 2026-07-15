const CATEGORY_HASH_PREFIX = "#categoria/";

export function formatPrice(price) {
  if (!Number.isFinite(price)) {
    return "Precio no disponible";
  }

  return `$${price.toLocaleString("es-AR")}`;
}

export function getCategoryHash(categoryId) {
  return `${CATEGORY_HASH_PREFIX}${encodeURIComponent(categoryId)}`;
}

export function getCategoryIdFromHash(hash) {
  if (!hash.startsWith(CATEGORY_HASH_PREFIX)) {
    return null;
  }

  const encodedCategoryId = hash.slice(CATEGORY_HASH_PREFIX.length);

  if (!encodedCategoryId) {
    return null;
  }

  try {
    return decodeURIComponent(encodedCategoryId);
  } catch {
    return null;
  }
}

export function findCategoryById(categories, categoryId) {
  if (!categoryId) {
    return null;
  }

  return categories.find((category) => category.id === categoryId) ?? null;
}
