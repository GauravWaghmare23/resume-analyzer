interface Props {
  title: string;
  items: string[];
}

export default function AnalysisCard({
  title,
  items,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-md hover:shadow-xl transition-all duration-300">

      <h2 className="text-2xl font-bold text-slate-900 mb-5">
        {title}
      </h2>

      <ul className="space-y-4">

        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-slate-700"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />

            <span className="leading-7">
              {item}
            </span>
          </li>
        ))}

      </ul>

    </div>
  );
}