interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", width: "100%" }}>
      <div
        style={{
          width: `${value}%`,
          background: "#4caf50",
          color: "white",
          padding: "4px",
        }}
      >
        {value}%
      </div>
    </div>
  );
}