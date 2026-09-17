// Molecule: Pagination — numbered page buttons + optional caption
"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
  caption?: string;
}

export function Pagination({ page, totalPages, onChange, caption }: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (n: number) => {
    onChange(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 64 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => go(n)}
            aria-current={n === page ? "page" : undefined}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${n === page ? "var(--color-green)" : "var(--color-line-strong)"}`,
              background: n === page ? "var(--color-green)" : "transparent",
              color: n === page ? "var(--color-cream)" : "var(--color-ink-2)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {caption ? (
        <p className="mono" style={{ textAlign: "center", color: "var(--color-muted)", marginTop: 16 }}>
          {caption}
        </p>
      ) : null}
    </>
  );
}
