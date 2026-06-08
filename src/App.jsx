import { useState } from "react";
import { Pizza, Sparkles, ArrowLeft } from "lucide-react";
import { menuCategories } from "./data/menuData";

function formatPrice(price) {
  return `$${price.toLocaleString("es-AR")}`;
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
      <path d="M20 125C35 76 34 36 24 8" stroke="#173d25" strokeWidth="1.2" />
      <path d="M23 62C5 52 8 35 27 42" stroke="#173d25" strokeWidth="1.2" />
      <path d="M34 40C48 24 48 10 38 5" stroke="#173d25" strokeWidth="1.2" />
      <path d="M27 84C9 84 5 68 25 70" stroke="#173d25" strokeWidth="1.2" />
      <path d="M31 102C48 94 52 78 34 82" stroke="#173d25" strokeWidth="1.2" />
    </svg>
  );
}

function HomeHeader() {
  return (
    <header className="relative bg-[#faf3e5] px-5 pt-8 pb-7 text-center border-b border-[#b98435] rounded-b-[34px] overflow-hidden">
      <LeafDecoration side="left" />
      <LeafDecoration side="right" />

      <Sparkles className="absolute left-[88px] top-[88px] text-[#b9822c]" size={15} />
      <Sparkles className="absolute right-[88px] top-[88px] text-[#b9822c]" size={15} />

      <Pizza size={56} className="mx-auto text-[#173d25]" strokeWidth={1.55} />

      <h1 className="mt-3 text-[44px] leading-none font-serif font-semibold text-[#173d25]">
        La Trattoria
      </h1>

      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="w-11 h-px bg-[#9d651c]" />
        <span className="text-[#9d651c] text-[14px] tracking-[0.32em] uppercase">
          Pizza & Café
        </span>
        <span className="w-11 h-px bg-[#9d651c]" />
      </div>

      <p className="mt-3 text-[11px] tracking-[0.34em] uppercase text-[#173d25]">
        Desde 2018
      </p>
    </header>
  );
}

function CategoryCard({ category, onClick }) {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className="relative min-h-[128px] rounded-[22px] bg-white/70 border border-[#eadfce] shadow-[0_6px_18px_rgba(70,45,20,0.12)] p-3 flex flex-col items-center justify-center gap-2 transition active:scale-95 hover:shadow-lg"
    >
      <Sparkles size={12} className="absolute left-4 top-1/2 text-[#b9822c]" />
      <Sparkles size={12} className="absolute right-4 top-1/2 text-[#b9822c]" />

      <div className="w-[72px] h-[72px] rounded-full border border-[#173d25] bg-[#fbf7ed] flex items-center justify-center">
        <div className="w-[52px] h-[52px] rounded-full bg-[#f0ddb6] flex items-center justify-center">
          <Icon size={34} strokeWidth={1.7} className="text-[#173d25]" />
        </div>
      </div>

      <h2 className="text-[15px] font-bold uppercase tracking-wide text-[#173d25] leading-tight text-center max-w-[125px]">
        {category.title}
      </h2>

      <div className="w-8 h-[2px] bg-[#b9822c]" />
    </button>
  );
}

function HomePage({ onSelectCategory }) {
  return (
    <>
      <HomeHeader />

      <section className="px-4 py-5 grid grid-cols-2 gap-4 bg-[#faf3e5]">
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
  const Icon = category.icon;

  return (
    <>
      <header className="bg-[#14351f] text-[#f8f0df] px-5 py-5 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#f8f0df]/10 flex items-center justify-center active:scale-95"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d6a84f]">
            Menú
          </p>
          <h1 className="text-2xl font-serif">{category.title}</h1>
        </div>
      </header>

      <section className="p-4">
        <div className="mb-5 rounded-[28px] bg-white/70 border border-[#eadfce] shadow-md p-5 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#f0ddb6] flex items-center justify-center">
            <Icon size={42} className="text-[#173d25]" strokeWidth={1.7} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#173d25]">
              {category.title}
            </h2>
            <p className="text-sm text-[#6b5a44]">
              Productos disponibles
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {category.products.map((product) => (
            <article
              key={product.name}
              className="w-full rounded-2xl bg-white border border-[#eadfce] shadow-sm p-4 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="text-[#173d25] font-bold">
                  {product.name}
                </h3>

                <p className="text-sm text-[#7a6a55] mt-1">
                  {product.description}
                </p>
              </div>

              <span className="text-[#9d651c] font-bold whitespace-nowrap">
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
    <footer className="relative bg-[#14351f] text-[#f8f0df] text-center py-7 rounded-t-[34px] overflow-hidden">
      <p className="text-[10px] tracking-[0.34em] uppercase">
        Buen sabor, buenos momentos
      </p>

      <div className="mt-2 text-[#d6a84f] text-lg">
        ♥
      </div>
    </footer>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main className="min-h-screen bg-[#f4efe6] flex justify-center">
      <section className="w-full max-w-[430px] min-h-screen bg-[#faf3e5] overflow-hidden">
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