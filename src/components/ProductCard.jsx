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
      className="interactive-control product-card flex min-h-[88px] w-full items-start justify-between gap-3 border p-3.5 text-left shadow-sm transition active:scale-[0.99]"
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
            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: theme.colors.accentDark }}
          >
            {category.title}
          </p>
        )}

        <h3
          className="text-[15px] font-bold leading-tight"
          style={{ color: theme.colors.primary }}
        >
          {product.name}
        </h3>

        <p
          className="product-card__description mt-1 text-[13px] leading-snug"
          style={{ color: theme.colors.productDescription }}
        >
          {product.description}
        </p>

        <ProductBadges
          product={product}
          includeTags
          maxTags={1}
          className="mt-2"
        />
      </div>

      <span
        className="max-w-[42%] shrink-0 whitespace-nowrap text-right text-sm font-bold leading-tight"
        style={{ color: theme.colors.price }}
      >
        {formatProductPrice(product)}
      </span>
    </button>
  );
}

export default ProductCard;
