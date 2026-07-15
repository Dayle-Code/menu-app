import ProductBadges from "./ProductBadges";
import { theme } from "../config/theme";
import { formatProductPrice } from "../utils/menu";

function ProductCard({ product, category, onSelect, showCategory = false }) {
  const unavailable = product.available === false;

  return (
    <button
      type="button"
      onClick={() => onSelect(product, category)}
      aria-label={`Ver detalle de ${product.name}${
        unavailable ? ", no disponible temporalmente" : ""
      }`}
      className="interactive-control flex w-full items-start justify-between gap-4 border p-4 text-left shadow-sm transition active:scale-[0.99]"
      style={{
        backgroundColor: theme.colors.productCard,
        borderColor: unavailable
          ? theme.colors.statusUnavailableBorder
          : theme.colors.border,
        borderRadius: theme.radius.product,
        opacity: unavailable ? 0.78 : 1,
      }}
    >
      <div className="min-w-0 flex-1">
        {showCategory && (
          <p
            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: theme.colors.accentDark }}
          >
            {category.title}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold" style={{ color: theme.colors.primary }}>
            {product.name}
          </h3>
          <ProductBadges product={product} />
        </div>

        <p
          className="mt-1 text-sm"
          style={{ color: theme.colors.productDescription }}
        >
          {product.description}
        </p>
      </div>

      <span
        className="shrink-0 whitespace-nowrap text-right font-bold"
        style={{ color: theme.colors.price }}
      >
        {formatProductPrice(product)}
      </span>
    </button>
  );
}

export default ProductCard;
