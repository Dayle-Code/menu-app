const CATEGORY_HASH_PREFIX = "#categoria/";

export function formatPrice(price) {
  if (!Number.isFinite(price)) {
    return "Precio no disponible";
  }

  return `$${price.toLocaleString("es-AR")}`;
}

function getRelevantVariantPrices(product) {
  const variants = product?.variants ?? [];
  const availableVariantPrices = variants
    .filter((variant) => variant.available !== false)
    .map((variant) => variant.price)
    .filter(Number.isFinite);
  const allVariantPrices = variants
    .map((variant) => variant.price)
    .filter(Number.isFinite);

  return availableVariantPrices.length > 0
    ? availableVariantPrices
    : allVariantPrices;
}

export function getProductStartingPrice(product) {
  const variantPrices = getRelevantVariantPrices(product);

  if (variantPrices.length > 0) {
    return Math.min(...variantPrices);
  }

  return Number.isFinite(product?.price) ? product.price : null;
}

export function formatProductPrice(product) {
  const startingPrice = getProductStartingPrice(product);

  if (!Number.isFinite(startingPrice)) {
    return "Precio no disponible";
  }

  const distinctVariantPrices = new Set(getRelevantVariantPrices(product));
  const usesStartingPrice =
    Boolean(product?.priceFrom) || distinctVariantPrices.size > 1;
  const formattedPrice = formatPrice(startingPrice);

  return usesStartingPrice ? `Desde ${formattedPrice}` : formattedPrice;
}

export function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-AR")
    .trim();
}

function getProductSearchText(product, category) {
  const variants = product?.variants ?? [];

  return normalizeSearchText(
    [
      category?.title,
      product?.name,
      product?.description,
      product?.detailDescription,
      product?.ingredients,
      product?.portion,
      ...(product?.tags ?? []),
      ...variants.flatMap((variant) => [variant.name, variant.description]),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function searchMenu(categories, query) {
  const normalizedQuery = normalizeSearchText(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return [];
  }

  return categories.flatMap((category) =>
    (category.products ?? [])
      .filter((product) => {
        const searchableText = getProductSearchText(product, category);
        return terms.every((term) => searchableText.includes(term));
      })
      .map((product) => ({ category, product })),
  );
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
