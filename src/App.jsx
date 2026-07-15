import { useEffect, useState } from "react";
import { ArrowLeft, ImageOff, Sparkles } from "lucide-react";
import ProductDetailDialog from "./components/ProductDetailDialog";
import { siteConfig } from "./config/site";
import { theme } from "./config/theme";
import { menuCategories } from "./data/menuData";
import {
  findCategoryById,
  formatPrice,
  getCategoryHash,
  getCategoryIdFromHash,
} from "./utils/menu";

function getSelectedCategoryId() {
  const categoryId = getCategoryIdFromHash(window.location.hash);
  return findCategoryById(menuCategories, categoryId)?.id ?? null;
}

function CategoryVisual({ category, size = "small" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = category.icon;
  const isLarge = size === "large";
  const shouldShowImage = Boolean(category.image) && !imageFailed;

  return (
    <div
      className={`${
        isLarge ? "h-20 w-20" : "h-[52px] w-[52px]"
      } flex items-center justify-center overflow-hidden rounded-full`}
      style={{ backgroundColor: theme.colors.iconBackground }}
    >
      {shouldShowImage ? (
        <img
          src={category.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : Icon ? (
        <Icon
          aria-hidden="true"
          size={isLarge ? 42 : 34}
          strokeWidth={1.7}
          style={{ color: theme.colors.primary }}
        />
      ) : (
        <ImageOff
          aria-hidden="true"
          size={isLarge ? 42 : 34}
          strokeWidth={1.7}
          style={{ color: theme.colors.primary }}
        />
      )}
    </div>
  );
}

function HomeHeader() {
  return (
    <header
      className="relative overflow-hidden border-b px-5 pb-7 pt-8 text-center"
      style={{
        backgroundColor: theme.colors.page,
        borderColor: theme.colors.goldBorder,
        borderBottomLeftRadius: theme.radius.headerBottom,
        borderBottomRightRadius: theme.radius.headerBottom,
      }}
    >
      <h1
        className="mt-3 font-serif text-[44px] font-semibold leading-none"
        style={{ color: theme.colors.primary }}
      >
        {siteConfig.businessName}
      </h1>

      <div className="mt-5 flex items-center justify-center gap-3">
        <span
          aria-hidden="true"
          className="h-px w-11"
          style={{ backgroundColor: theme.colors.accentDark }}
        />

        <span
          className="text-[14px] uppercase tracking-[0.32em]"
          style={{ color: theme.colors.accentDark }}
        >
          {siteConfig.businessType}
        </span>

        <span
          aria-hidden="true"
          className="h-px w-11"
          style={{ backgroundColor: theme.colors.accentDark }}
        />
      </div>

      <p
        className="mt-3 text-[11px] uppercase tracking-[0.34em]"
        style={{ color: theme.colors.primary }}
      >
        {siteConfig.tagline}
      </p>
    </header>
  );
}

function CategoryCard({ category, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver categoría ${category.title}`}
      className="interactive-control relative flex min-h-[128px] flex-col items-center justify-center gap-2 border p-3 transition hover:shadow-lg active:scale-95"
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.card,
        boxShadow: theme.shadows.card,
      }}
    >
      <Sparkles
        aria-hidden="true"
        size={12}
        className="absolute left-4 top-1/2"
        style={{ color: theme.colors.accent }}
      />

      <Sparkles
        aria-hidden="true"
        size={12}
        className="absolute right-4 top-1/2"
        style={{ color: theme.colors.accent }}
      />

      <div
        className="flex h-[72px] w-[72px] items-center justify-center rounded-full border"
        style={{
          backgroundColor: theme.colors.iconOuterBackground,
          borderColor: theme.colors.primary,
        }}
      >
        <CategoryVisual category={category} />
      </div>

      <h2
        className="max-w-[125px] text-center text-[15px] font-bold uppercase leading-tight tracking-wide"
        style={{ color: theme.colors.primary }}
      >
        {category.title}
      </h2>

      <div
        aria-hidden="true"
        className="h-[2px] w-8"
        style={{ backgroundColor: theme.colors.accent }}
      />
    </button>
  );
}

function HomePage({ onSelectCategory }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader />

      <section
        aria-labelledby="categories-title"
        className="grid grid-cols-2 gap-4 px-4 py-5"
        style={{ backgroundColor: theme.colors.page }}
      >
        <h2 id="categories-title" className="sr-only">
          Categorías del menú
        </h2>

        {menuCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => onSelectCategory(category)}
          />
        ))}
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

function EmptyCategoryState() {
  return (
    <div
      role="status"
      className="border px-5 py-8 text-center"
      style={{
        backgroundColor: theme.colors.productCard,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.product,
        color: theme.colors.productDescription,
      }}
    >
      <p className="font-medium">{siteConfig.emptyCategoryMessage}</p>
    </div>
  );
}

function CategoryPage({ category, onBack, onSelectProduct }) {
  const products = category.products ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="px-5 py-5"
        style={{
          backgroundColor: theme.colors.darkGreen,
          color: theme.colors.lightText,
        }}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver a las categorías"
            title="Volver a las categorías"
            className="interactive-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full active:scale-95"
            style={{ backgroundColor: theme.colors.backButton }}
          >
            <ArrowLeft aria-hidden="true" size={22} />
          </button>

          <CategoryVisual key={category.id} category={category} size="large" />

          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: theme.colors.gold }}
            >
              {siteConfig.menuLabel}
            </p>

            <h1 className="font-serif text-2xl">{category.title}</h1>

            <p
              className="text-sm"
              style={{ color: theme.colors.lightTextSoft }}
            >
              {siteConfig.availableProductsLabel}
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="products-title" className="p-4">
        <h2 id="products-title" className="sr-only">
          Productos de {category.title}
        </h2>

        {products.length > 0 ? (
          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  aria-label={`Ver detalle de ${product.name}`}
                  className="interactive-control flex w-full items-start justify-between gap-4 border p-4 text-left shadow-sm transition active:scale-[0.99]"
                  style={{
                    backgroundColor: theme.colors.productCard,
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.product,
                  }}
                >
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: theme.colors.primary }}
                    >
                      {product.name}
                    </h3>

                    <p
                      className="mt-1 text-sm"
                      style={{ color: theme.colors.productDescription }}
                    >
                      {product.description}
                    </p>
                  </div>

                  <span
                    className="whitespace-nowrap font-bold"
                    style={{ color: theme.colors.price }}
                  >
                    {formatPrice(product.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCategoryState />
        )}
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-7 text-center"
      style={{
        backgroundColor: theme.colors.darkGreen,
        color: theme.colors.lightText,
        borderTopLeftRadius: theme.radius.footerTop,
        borderTopRightRadius: theme.radius.footerTop,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.34em]">
        {siteConfig.footerMessage}
      </p>

      <div
        aria-hidden="true"
        className="mt-2 text-lg"
        style={{ color: theme.colors.gold }}
      >
        ♥
      </div>
    </footer>
  );
}

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    getSelectedCategoryId,
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const selectedCategory = findCategoryById(
    menuCategories,
    selectedCategoryId,
  );

  useEffect(() => {
    const handleHistoryChange = () => {
      setSelectedProduct(null);
      setSelectedCategoryId(getSelectedCategoryId());
    };

    window.addEventListener("popstate", handleHistoryChange);
    window.addEventListener("hashchange", handleHistoryChange);

    return () => {
      window.removeEventListener("popstate", handleHistoryChange);
      window.removeEventListener("hashchange", handleHistoryChange);
    };
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedProduct(null);
    const nextUrl = `${window.location.pathname}${window.location.search}${getCategoryHash(category.id)}`;

    window.history.pushState(
      { menuCategory: category.id },
      "",
      nextUrl,
    );
    setSelectedCategoryId(category.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProduct(null);

    if (window.history.state?.menuCategory) {
      window.history.back();
      return;
    }

    const homeUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", homeUrl);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className="flex min-h-screen justify-center"
      style={{ backgroundColor: theme.colors.background }}
    >
      <section
        className="flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden"
        style={{ backgroundColor: theme.colors.page }}
        aria-label={`Menú digital de ${siteConfig.businessName}`}
      >
        {selectedCategory ? (
          <CategoryPage
            category={selectedCategory}
            onBack={handleBack}
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <HomePage onSelectCategory={handleSelectCategory} />
        )}
      </section>

      <ProductDetailDialog
        product={selectedProduct}
        category={selectedCategory}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

export default App;
