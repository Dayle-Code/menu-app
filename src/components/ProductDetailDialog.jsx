import { useEffect, useId, useRef, useState } from "react";
import { ImageOff, X } from "lucide-react";
import { theme } from "../config/theme";
import { formatPrice, formatProductPrice } from "../utils/menu";
import ProductBadges from "./ProductBadges";
import "./ProductDetailDialog.css";

function ProductImage({ product, category }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = category?.icon;
  const shouldShowImage = Boolean(product?.image) && !imageFailed;

  if (shouldShowImage) {
    return (
      <img
        src={product.image}
        alt={product.name}
        decoding="async"
        className="product-detail-dialog__image"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Imagen no disponible para ${product?.name ?? "el producto"}`}
      className="product-detail-dialog__image-fallback"
      style={{
        backgroundColor: theme.colors.iconBackground,
        color: theme.colors.primary,
      }}
    >
      {Icon ? (
        <Icon aria-hidden="true" size={72} strokeWidth={1.4} />
      ) : (
        <ImageOff aria-hidden="true" size={72} strokeWidth={1.4} />
      )}
    </div>
  );
}

function ProductDetailDialog({ product, category, open, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleBackdropClick = (event) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) closeDialog();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    closeDialog();
  };

  const detailDescription =
    product?.detailDescription ||
    product?.description ||
    "Este producto no tiene una descripción disponible.";
  const variants = product?.variants ?? [];
  const hasAdditionalInformation = Boolean(
    product?.ingredients || product?.portion,
  );

  return (
    <dialog
      ref={dialogRef}
      className="product-detail-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <article
        className="product-detail-dialog__panel"
        style={{
          backgroundColor: theme.colors.productCard,
          borderColor: theme.colors.border,
          color: theme.colors.primary,
        }}
      >
        <div
          aria-hidden="true"
          className="product-detail-dialog__handle"
        />

        <button
          type="button"
          autoFocus
          onClick={closeDialog}
          aria-label="Cerrar detalle del producto"
          title="Cerrar"
          className="interactive-control product-detail-dialog__close"
          style={{
            backgroundColor: theme.colors.productCard,
            color: theme.colors.primary,
          }}
        >
          <X aria-hidden="true" size={22} />
        </button>

        <figure className="product-detail-dialog__visual">
          <ProductImage
            key={product?.id ?? "empty-product"}
            product={product}
            category={category}
          />
        </figure>

        <div className="product-detail-dialog__content">
          <p
            className="text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: theme.colors.accentDark }}
          >
            {category?.title
              ? `Menú · ${category.title}`
              : "Detalle del producto"}
          </p>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-serif text-3xl font-semibold">
              {product?.name ?? "Producto"}
            </h2>

            <strong
              className="shrink-0 text-xl"
              style={{ color: theme.colors.price }}
            >
              {formatProductPrice(product)}
            </strong>
          </div>

          <p
            id={descriptionId}
            className="mt-3 text-base leading-relaxed"
            style={{ color: theme.colors.productDescription }}
          >
            {detailDescription}
          </p>

          <ProductBadges
            product={product}
            includeTags
            className="mt-5"
          />

          {product?.available === false && (
            <p
              role="status"
              className="mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold"
              style={{
                backgroundColor: theme.colors.statusUnavailableBackground,
                borderColor: theme.colors.statusUnavailableBorder,
                color: theme.colors.statusUnavailableText,
              }}
            >
              Este producto está temporalmente no disponible.
            </p>
          )}

          {variants.length > 0 && (
            <section
              aria-labelledby={`${titleId}-variants`}
              className="mt-6"
            >
              <h3
                id={`${titleId}-variants`}
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: theme.colors.accentDark }}
              >
                Opciones
              </h3>

              <ul className="mt-3 grid gap-2">
                {variants.map((variant) => {
                  const variantUnavailable = variant.available === false;

                  return (
                    <li
                      key={variant.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border px-4 py-3"
                      style={{
                        backgroundColor: variantUnavailable
                          ? theme.colors.statusUnavailableBackground
                          : theme.colors.iconOuterBackground,
                        borderColor: variantUnavailable
                          ? theme.colors.statusUnavailableBorder
                          : theme.colors.border,
                        opacity: variantUnavailable ? 0.72 : 1,
                      }}
                    >
                      <div>
                        <p className="font-semibold">{variant.name}</p>
                        {variant.description && (
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: theme.colors.productDescription }}
                          >
                            {variant.description}
                          </p>
                        )}
                        {variantUnavailable && (
                          <p
                            className="mt-1 text-xs font-semibold"
                            style={{ color: theme.colors.statusUnavailableText }}
                          >
                            No disponible
                          </p>
                        )}
                      </div>

                      <strong
                        className="shrink-0"
                        style={{ color: theme.colors.price }}
                      >
                        {formatPrice(variant.price)}
                      </strong>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {hasAdditionalInformation && (
            <dl
              className="mt-6 grid gap-4 border-y py-5"
              style={{ borderColor: theme.colors.border }}
            >
              {product?.ingredients && (
                <div>
                  <dt
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: theme.colors.accentDark }}
                  >
                    Ingredientes
                  </dt>
                  <dd
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: theme.colors.productDescription }}
                  >
                    {product.ingredients}
                  </dd>
                </div>
              )}

              {product?.portion && (
                <div>
                  <dt
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: theme.colors.accentDark }}
                  >
                    Porción
                  </dt>
                  <dd
                    className="mt-1 text-sm"
                    style={{ color: theme.colors.productDescription }}
                  >
                    {product.portion}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <button
            type="button"
            onClick={closeDialog}
            className="interactive-control mt-6 min-h-12 w-full rounded-2xl px-5 py-3 font-bold"
            style={{
              backgroundColor: theme.colors.darkGreen,
              color: theme.colors.lightText,
            }}
          >
            Cerrar
          </button>
        </div>
      </article>
    </dialog>
  );
}

export default ProductDetailDialog;
