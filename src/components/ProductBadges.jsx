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

function ProductBadges({ product, includeTags = false, className = "" }) {
  const commercialBadges = getCommercialBadges(product);
  const tagBadges = includeTags
    ? (product?.tags ?? []).map((tag) => ({
        id: `tag-${tag}`,
        label: tag,
        backgroundColor: theme.colors.iconOuterBackground,
        borderColor: theme.colors.border,
        color: theme.colors.accentDark,
      }))
    : [];
  const badges = [...commercialBadges, ...tagBadges];

  if (badges.length === 0) {
    return null;
  }

  return (
    <div
      role="list"
      aria-label="Características del producto"
      className={`flex flex-wrap gap-2 ${className}`.trim()}
    >
      {badges.map((badge) => (
        <span
          role="listitem"
          key={badge.id}
          className="rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none"
          style={{
            backgroundColor: badge.backgroundColor,
            borderColor: badge.borderColor,
            color: badge.color,
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

export default ProductBadges;
