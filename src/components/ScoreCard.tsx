interface Props {
  title: string;
  value: number;
  color: string;
}

export default function ScoreCard({
  title,
  value,
  color,
}: Props) {
  const isATS =
    color === "text-blue-600";

  return (
    <div
      className={`rounded-3xl p-8 text-white shadow-xl ${
        isATS
          ? "bg-linear-to-br from-blue-600 to-blue-800"
          : "bg-linear-to-br from-emerald-500 to-emerald-700"
      }`}
    >
      <p className="text-lg opacity-90">
        {title}
      </p>

      <h2 className="text-7xl font-bold mt-3">
        {value}%
      </h2>

      <div className="mt-6 w-full bg-white/20 h-3 rounded-full">
        <div
          className="h-3 bg-white rounded-full"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}