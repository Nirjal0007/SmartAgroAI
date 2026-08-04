export default function SectionHeading({ eyebrow, title, description, align = 'center', className = '' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-harvest-500 dark:text-harvest-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold text-canopy-700 dark:text-cream-100 text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-soil-light dark:text-cream-200/70 text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
