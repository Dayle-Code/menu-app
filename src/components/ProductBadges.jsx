import { theme } from "../config/theme";

function getCommercialBadges(product) {
  const badges = [];

  if (product?.available === false) {
    badges.push({
      id: "unavailable",
      label: "No disponible",
      backgroundColor: theme.colors.statusUnavailableBackground,
      borderColor: theme.colors.statusUnavailableBorder,
      color: theme.colors.statusUnavailableText,
    });
  }

  if (product?.isNew) {
    badges.push({
      id: "new",
      label: "Nuevo",
      backgroundColor: theme.colors.statusNewBackground,
      borderColor: theme.colors.statusNewBorder,
      color: theme.colors.statusNewText,
    });
  }

  if (product?.featured) {
    badges.push({
      id: "featured",
      label: "Destacado",
      backgroundColor: theme.colors.statusFeaturedBackground,
      borderColor: theme.colors.statusFeaturedBorder,
      color: theme.colors.statusFeaturedText,
    });
  }

  return badges;
}

function ProductBadges({
  product,
  includeTags = false,
  maxTags = Number.POSITIVE_INFINITY,
  onTagSelect,
  className = "",
}) {
  const commercialBadges = getCommercialBadges(product);
  const allTags = includeTags ? product?.tags ?? [] : [];
  const visibleTags = allTags.slice(0, maxTags);
  const hiddenTagsCount = Math.max(0, allTags.length - visibleTags.length);

  if (
    commercialBadges.length === 0 &&
    visibleTags.length === 0 &&
    hiddenTagsCount === 0
  ) {
    return null;
  }

  return (
    <div
      aria-label="Características del producto"
      className={`product-badges flex flex-wrap gap-1.5 ${className}`.trim()}
    >
      {commercialBadges.map((badge) => (
        <span
          key={badge.id}
          className="product-badge rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none"
          style={{
            backgroundColor: badge.backgroundColor,
            borderColor: badge.borderColor,
            color: badge.color,
          }}
        >
          {badge.label}
        </span>
      ))}

      {visibleTags.map((tag) => {
        const sharedProps = {
          className:
            "product-badge product-badge--tag rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none",
          style: {
            backgroundColor: theme.colors.iconOuterBackground,
            borderColor: theme.colors.border,
            color: theme.colors.accentDark,
          },
        };

        return onTagSelect ? (
          <button
            {...sharedProps}
            key={tag}
            type="button"
            onClick={() => onTagSelect(tag)}
            aria-label={`Filtrar la carta por ${tag}`}
            className={`${sharedProps.className} interactive-control`}
          >
            {tag}
          </button>
        ) : (
          <span {...sharedProps} key={tag}>
            {tag}
          </span>
        );
      })}

      {hiddenTagsCount > 0 && (
        <span
          aria-label={`${hiddenTagsCount} etiquetas más`}
          className="product-badge product-badge--more rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none"
          style={{
            backgroundColor: theme.colors.productCard,
            borderColor: theme.colors.border,
            color: theme.colors.productDescription,
          }}
        >
          +{hiddenTagsCount}
        </span>
      )}
    </div>
  );
}

export default ProductBadges;
