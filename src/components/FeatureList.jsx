function FeatureList({ items, className = '' }) {
  return (
    <ul className={`grid gap-3 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-copy text-lg leading-relaxed text-stone-300">
          <span className="mt-3 h-px w-6 shrink-0 bg-stone-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default FeatureList
