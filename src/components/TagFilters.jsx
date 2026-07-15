import { theme } from "../config/theme";

function TagFilters({ tags, selectedTag, onSelectTag }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filters mt-3" aria-label="Filtrar productos por etiqueta">
      <div className="tag-filters__track flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onSelectTag(null)}
          aria-pressed={!selectedTag}
          className="interactive-control shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold"
          style={{
            backgroundColor: selectedTag
              ? theme.colors.productCard
              : theme.colors.darkGreen,
            borderColor: selectedTag
              ? theme.colors.border
              : theme.colors.darkGreen,
            color: selectedTag
              ? theme.colors.primary
              : theme.colors.lightText,
          }}
        >
          Todos
        </button>

        {tags.map((tag) => {
          const isSelected = tag === selectedTag;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag(isSelected ? null : tag)}
              aria-pressed={isSelected}
              className="interactive-control shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold"
              style={{
                backgroundColor: isSelected
                  ? theme.colors.darkGreen
                  : theme.colors.productCard,
                borderColor: isSelected
                  ? theme.colors.darkGreen
                  : theme.colors.border,
                color: isSelected
                  ? theme.colors.lightText
                  : theme.colors.primary,
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TagFilters;
