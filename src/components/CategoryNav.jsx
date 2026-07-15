import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { theme } from "../config/theme";

function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  onShowSearch,
}) {
  const activeButtonRef = useRef(null);

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategoryId]);

  return (
    <nav
      aria-label="Navegación rápida del menú"
      className="category-nav sticky top-0 z-20 border-b px-3 py-2"
      style={{
        backgroundColor: "rgba(250, 243, 229, 0.94)",
        borderColor: theme.colors.border,
      }}
    >
      <div className="category-nav__track flex gap-2 overflow-x-auto">
        <button
          ref={activeCategoryId ? null : activeButtonRef}
          type="button"
          onClick={onShowSearch}
          aria-current={activeCategoryId ? undefined : "page"}
          className="interactive-control flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold"
          style={{
            backgroundColor: activeCategoryId
              ? theme.colors.productCard
              : theme.colors.darkGreen,
            borderColor: activeCategoryId
              ? theme.colors.border
              : theme.colors.darkGreen,
            color: activeCategoryId
              ? theme.colors.primary
              : theme.colors.lightText,
          }}
        >
          <Search aria-hidden="true" size={14} />
          Buscar
        </button>

        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              ref={isActive ? activeButtonRef : null}
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category)}
              aria-current={isActive ? "page" : undefined}
              className="interactive-control shrink-0 rounded-full border px-3 py-2 text-xs font-semibold"
              style={{
                backgroundColor: isActive
                  ? theme.colors.darkGreen
                  : theme.colors.productCard,
                borderColor: isActive
                  ? theme.colors.darkGreen
                  : theme.colors.border,
                color: isActive
                  ? theme.colors.lightText
                  : theme.colors.primary,
              }}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default CategoryNav;
