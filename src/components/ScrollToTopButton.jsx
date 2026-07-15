import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { theme } from "../config/theme";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > 520);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      title="Volver arriba"
      className="interactive-control scroll-to-top-button fixed z-30 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg"
      style={{
        backgroundColor: theme.colors.darkGreen,
        borderColor: theme.colors.goldBorder,
        color: theme.colors.lightText,
      }}
    >
      <ArrowUp aria-hidden="true" size={19} />
    </button>
  );
}

export default ScrollToTopButton;
