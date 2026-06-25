// Atom: PhotoPlaceholder — diagonal hatching + mono label
// Shows "FOTO · NAME · ASPECT" until real photos arrive

interface PhotoPlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
}

export function PhotoPlaceholder({
  label,
  aspectRatio = "3/4",
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`ph ${className}`}
      style={{ aspectRatio, width: "100%" }}
    >
      <span>{label}</span>
    </div>
  );
}
