import { useState } from "react";
import { Pizza, Sparkles, ArrowLeft, ImageOff } from "lucide-react";
import { menuCategories } from "./data/menuData";
import { theme } from "./config/theme";

function formatPrice(price) {
  return `$${price.toLocaleString("es-AR")}`;
}

function CategoryVisual({ category, size = "small" }) {
  const Icon = category.icon;
  const isLarge = size === "large";

  return (
    <div
      className={`${
        isLarge ? "w-20 h-20" : "w-[52px] h-[52px]"
      } rounded-full flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: theme.colors.iconBackground }}
    >
      {category.image ? (
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : Icon ? (
        <Icon
          size={isLarge ? 42 : 34}
          strokeWidth={1.7}
          style={{ color: theme.colors.primary }}
        />
      ) : (
        <ImageOff
          size={isLarge ? 42 : 34}
          strokeWidth={1.7}
          style={{ color: theme.colors.primary }}
        />
      )}
    </div>
  );
}

function LeafDecoration({ side = "left" }) {
  return (
    <svg
      className={`absolute top-8 ${
        side === "left" ? "left-2" : "right-2 scale-x-[-1]"
      } opacity-70`}
      width="75"
      height="135"
      viewBox="0 0 75 135"
      fill="none"
    >
      <path d="M20 125C35 76 34 36 24 8" stroke={theme.colors.primary} strokeWidth="1.2" />
      <path d="M23 62C5 52 8 35 27 42" stroke={theme.colors.primary} strokeWidth="1.2" />
      <path d="M34 40C48 24 48 10 38 5" stroke={theme.colors.primary} strokeWidth="1.2" />
      <path d="M27 84C9 84 5 68 25 70" stroke={theme.colors.primary} strokeWidth="1.2" />
      <path d="M31 102C48 94 52 78 34 82" stroke={theme.colors.primary} strokeWidth="1.2" />
    </svg>
  );
}

function HomeHeader() {
  return (
    <header
      className="relative px-5 pt-8 pb-7 text-center border-b overflow-hidden"
      style={{
        backgroundColor: theme.colors.page,
        borderColor: theme.colors.goldBorder,
        borderBottomLeftRadius: theme.radius.headerBottom,
        borderBottomRightRadius: theme.radius.headerBottom,
      }}
    >
      <h1
        className="mt-3 text-[44px] leading-none font-serif font-semibold"
        style={{ color: theme.colors.primary }}
      >
        NombreLocal
      </h1>

      <div className="mt-5 flex items-center justify-center gap-3">
        <span
          className="w-11 h-px"
          style={{ backgroundColor: theme.colors.accentDark }}
        />

        <span
          className="text-[14px] tracking-[0.32em] uppercase"
          style={{ color: theme.colors.accentDark }}
        >
          Cafe y Comidas
        </span>

        <span
          className="w-11 h-px"
          style={{ backgroundColor: theme.colors.accentDark }}
        />
      </div>

      <p
        className="mt-3 text-[11px] tracking-[0.34em] uppercase"
        style={{ color: theme.colors.primary }}
      >
        Lo mejor de salta
      </p>
    </header>
  );
}

function CategoryCard({ category, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative min-h-[128px] p-3 flex flex-col items-center justify-center gap-2 transition active:scale-95 hover:shadow-lg border"
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.card,
        boxShadow: theme.shadows.card,
      }}
    >
      <Sparkles
        size={12}
        className="absolute left-4 top-1/2"
        style={{ color: theme.colors.accent }}
      />

      <Sparkles
        size={12}
        className="absolute right-4 top-1/2"
        style={{ color: theme.colors.accent }}
      />

      <div
        className="w-[72px] h-[72px] rounded-full border flex items-center justify-center"
        style={{
          backgroundColor: theme.colors.iconOuterBackground,
          borderColor: theme.colors.primary,
        }}
      >
        <CategoryVisual category={category} />
      </div>

      <h2
        className="text-[15px] font-bold uppercase tracking-wide leading-tight text-center max-w-[125px]"
        style={{ color: theme.colors.primary }}
      >
        {category.title}
      </h2>

      <div
        className="w-8 h-[2px]"
        style={{ backgroundColor: theme.colors.accent }}
      />
    </button>
  );
}

function HomePage({ onSelectCategory }) {
  return (
    <>
      <HomeHeader />

      <section
        className="px-4 py-5 grid grid-cols-2 gap-4"
        style={{ backgroundColor: theme.colors.page }}
      >
        {menuCategories.map((category) => (
          <CategoryCard
            key={category.title}
            category={category}
            onClick={() => onSelectCategory(category)}
          />
        ))}
      </section>

      <Footer />
    </>
  );
}

function CategoryPage({ category, onBack }) {
  if (!category) return null;

  return (
    <>
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
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
            style={{ backgroundColor: theme.colors.backButton }}
          >
            <ArrowLeft size={22} />
          </button>

          <CategoryVisual category={category} size="large" />

          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: theme.colors.gold }}
            >
              Menú
            </p>

            <h1 className="text-2xl font-serif">
              {category.title}
            </h1>

            <p
              className="text-sm"
              style={{ color: theme.colors.lightTextSoft }}
            >
              Productos disponibles
            </p>
          </div>
        </div>
      </header>

      <section className="p-4">
        <div className="space-y-3">
          {category.products?.map((product) => (
            <article
              key={product.name}
              className="w-full border shadow-sm p-4 flex items-start justify-between gap-4"
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
                  className="text-sm mt-1"
                  style={{ color: theme.colors.productDescription }}
                >
                  {product.description}
                </p>
              </div>

              <span
                className="font-bold whitespace-nowrap"
                style={{ color: theme.colors.price }}
              >
                {formatPrice(product.price)}
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer
      className="relative text-center py-7 overflow-hidden"
      style={{
        backgroundColor: theme.colors.darkGreen,
        color: theme.colors.lightText,
        borderTopLeftRadius: theme.radius.footerTop,
        borderTopRightRadius: theme.radius.footerTop,
      }}
    >
      <p className="text-[10px] tracking-[0.34em] uppercase">
        Buen sabor, buenos momentos
      </p>

      <div
        className="mt-2 text-lg"
        style={{ color: theme.colors.gold }}
      >
        ♥
      </div>
    </footer>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main
      className="min-h-screen flex justify-center"
      style={{ backgroundColor: theme.colors.background }}
    >
      <section
        className="w-full max-w-[430px] min-h-screen overflow-hidden"
        style={{ backgroundColor: theme.colors.page }}
      >
        {selectedCategory ? (
          <CategoryPage
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <HomePage onSelectCategory={setSelectedCategory} />
        )}
      </section>
    </main>
  );
}

export default App;