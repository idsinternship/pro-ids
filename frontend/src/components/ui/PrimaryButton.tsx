type Props = {
  children: string;
  disabled?: boolean;
};

export default function PrimaryButton({ children, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      style={{
        width: "100%",
        height: 56,
        borderRadius: 16,
        background: disabled ? "#94a3b8" : "#2f66e6",
        color: "white",
        border: "none",
        fontSize: 16,
        fontWeight: 600,
        boxShadow: disabled
          ? "none"
          : "0 12px 30px rgba(47,102,230,0.35)",
        transition: "all 0.2s ease",
        transform: "translateY(0)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children} →
    </button>
  );
}
