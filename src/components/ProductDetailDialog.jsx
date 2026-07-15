import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { theme } from "../config/theme";
import { formatPrice } from "../utils/menu";
import "./ProductDetailDialog.css";

function ProductDetailDialog({ product, categoryTitle, open, onClose }) {
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
      <div
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
          style={{ backgroundColor: theme.colors.border }}
        />

        <button
          type="button"
          autoFocus
          onClick={closeDialog}
          aria-label="Cerrar detalle del producto"
          title="Cerrar"
          className="interactive-control product-detail-dialog__close"
          style={{
            backgroundColor: theme.colors.iconOuterBackground,
            color: theme.colors.primary,
          }}
        >
          <X aria-hidden="true" size={22} />
        </button>

        <p
          className="text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ color: theme.colors.accentDark }}
        >
          {categoryTitle ? `Menú · ${categoryTitle}` : "Detalle del producto"}
        </p>

        <h2 id={titleId} className="mt-3 font-serif text-3xl font-semibold">
          {product?.name ?? "Producto"}
        </h2>

        <p
          id={descriptionId}
          className="mt-3 text-base leading-relaxed"
          style={{ color: theme.colors.productDescription }}
        >
          {product?.description || "Este producto no tiene una descripción disponible."}
        </p>

        <div
          className="mt-6 flex items-center justify-between gap-4 border-t pt-5"
          style={{ borderColor: theme.colors.border }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.colors.productDescription }}
          >
            Precio
          </span>

          <strong className="text-2xl" style={{ color: theme.colors.price }}>
            {typeof product?.price === "number"
              ? formatPrice(product.price)
              : "No disponible"}
          </strong>
        </div>

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
    </dialog>
  );
}

export default ProductDetailDialog;
