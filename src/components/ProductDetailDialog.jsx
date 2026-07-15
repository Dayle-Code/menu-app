import { useEffect, useId, useRef, useState } from "react";
import { Check, ImageOff, X } from "lucide-react";
import { theme } from "../config/theme";
import {
  formatPrice,
  formatProductPrice,
  getDefaultVariant,
} from "../utils/menu";
import ProductBadges from "./ProductBadges";
import "./ProductDetailDialog.css";

const GESTURE_CLOSE_DISTANCE = 96;
const GESTURE_CLOSE_VELOCITY = 0.55;
const GESTURE_DISMISS_DURATION = 180;

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

function ProductDetailDialog({
  product,
  category,
  open,
  onClose,
  onSelectTag,
}) {
  const dialogRef = useRef(null);
  const dismissTimerRef = useRef(null);
  const dragStateRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const productId = product?.id ?? null;
  const variants = product?.variants ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState(
    () => getDefaultVariant(product)?.id ?? null,
  );
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ??
    getDefaultVariant(product);

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

  useEffect(
    () => () => {
      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }
    },
    [],
  );

  const resetGesture = () => {
    dragStateRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
    setIsDismissing(false);
  };

  const closeDialog = () => {
    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }

    resetGesture();
    dialogRef.current?.close();
  };

  const dismissWithGesture = () => {
    setIsDragging(false);
    setIsDismissing(true);
    setDragOffset(window.innerHeight);

    dismissTimerRef.current = window.setTimeout(() => {
      dismissTimerRef.current = null;
      closeDialog();
    }, GESTURE_DISMISS_DURATION);
  };

  const handleDragStart = (event) => {
    const isMobileSheet = window.matchMedia("(max-width: 599px)").matches;

    if (!isMobileSheet || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startedAt: performance.now(),
      offset: 0,
    };
    setIsDragging(true);
    setIsDismissing(false);
  };

  const handleDragMove = (event) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const nextOffset = Math.max(0, event.clientY - dragState.startY);
    dragState.offset = nextOffset;
    setDragOffset(nextOffset);
  };

  const finishDrag = (event) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const duration = Math.max(performance.now() - dragState.startedAt, 1);
    const velocity = dragState.offset / duration;
    const shouldClose =
      dragState.offset >= GESTURE_CLOSE_DISTANCE ||
      (dragState.offset >= 40 && velocity >= GESTURE_CLOSE_VELOCITY);

    dragStateRef.current = null;

    if (shouldClose) {
      dismissWithGesture();
      return;
    }

    setIsDragging(false);
    setDragOffset(0);
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

  const effectiveProduct = selectedVariant?.image
    ? { ...product, image: selectedVariant.image }
    : product;
  const detailDescription =
    selectedVariant?.detailDescription ||
    product?.detailDescription ||
    product?.description ||
    "Este producto no tiene una descripción disponible.";
  const ingredients = selectedVariant?.ingredients || product?.ingredients;
  const portion = selectedVariant?.portion || product?.portion;
  const displayedPrice = selectedVariant
    ? formatPrice(selectedVariant.price)
    : formatProductPrice(product);
  const hasAdditionalInformation = Boolean(ingredients || portion);
  const panelClassName = [
    "product-detail-dialog__panel",
    isDragging ? "product-detail-dialog__panel--dragging" : "",
    isDismissing ? "product-detail-dialog__panel--dismissing" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
        className={panelClassName}
        style={{
          backgroundColor: theme.colors.productCard,
          borderColor: theme.colors.border,
          color: theme.colors.primary,
          transform: `translateY(${dragOffset}px)`,
        }}
      >
        <div
          aria-hidden="true"
          className="product-detail-dialog__drag-area"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div className="product-detail-dialog__handle" />
        </div>

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
            key={`${productId ?? "empty-product"}-${selectedVariant?.id ?? "base"}`}
            product={effectiveProduct}
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

            <div className="shrink-0 text-right">
              <strong
                className="block text-xl"
                style={{ color: theme.colors.price }}
              >
                {displayedPrice}
              </strong>
              {selectedVariant && (
                <span
                  className="mt-0.5 block text-[11px] font-semibold"
                  style={{ color: theme.colors.productDescription }}
                >
                  {selectedVariant.name}
                </span>
              )}
            </div>
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
            onTagSelect={onSelectTag}
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
            <section aria-labelledby={`${titleId}-variants`} className="mt-6">
              <h3
                id={`${titleId}-variants`}
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: theme.colors.accentDark }}
              >
                Elegí una opción
              </h3>

              <div
                role="radiogroup"
                aria-label={`Opciones de ${product?.name ?? "producto"}`}
                className="mt-3 grid gap-2"
              >
                {variants.map((variant) => {
                  const variantUnavailable = variant.available === false;
                  const isSelected = variant.id === selectedVariant?.id;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={variantUnavailable}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className="interactive-control flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-3 text-left"
                      style={{
                        backgroundColor: variantUnavailable
                          ? theme.colors.statusUnavailableBackground
                          : isSelected
                            ? theme.colors.iconBackground
                            : theme.colors.iconOuterBackground,
                        borderColor: variantUnavailable
                          ? theme.colors.statusUnavailableBorder
                          : isSelected
                            ? theme.colors.goldBorder
                            : theme.colors.border,
                        opacity: variantUnavailable ? 0.72 : 1,
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                          style={{
                            backgroundColor: isSelected
                              ? theme.colors.darkGreen
                              : theme.colors.productCard,
                            borderColor: isSelected
                              ? theme.colors.darkGreen
                              : theme.colors.border,
                            color: theme.colors.lightText,
                          }}
                        >
                          {isSelected && <Check size={13} strokeWidth={3} />}
                        </span>

                        <span className="min-w-0">
                          <span className="block font-semibold">
                            {variant.name}
                          </span>
                          {(variant.portion || variant.description) && (
                            <span
                              className="mt-0.5 block text-xs"
                              style={{ color: theme.colors.productDescription }}
                            >
                              {variant.portion || variant.description}
                            </span>
                          )}
                          {variantUnavailable && (
                            <span
                              className="mt-1 block text-xs font-semibold"
                              style={{ color: theme.colors.statusUnavailableText }}
                            >
                              No disponible
                            </span>
                          )}
                        </span>
                      </span>

                      <strong
                        className="shrink-0"
                        style={{ color: theme.colors.price }}
                      >
                        {formatPrice(variant.price)}
                      </strong>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {hasAdditionalInformation && (
            <dl
              className="mt-6 grid gap-4 border-y py-5"
              style={{ borderColor: theme.colors.border }}
            >
              {ingredients && (
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
                    {ingredients}
                  </dd>
                </div>
              )}

              {portion && (
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
                    {portion}
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
