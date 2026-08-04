import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-canopy text-cream-100 hover:bg-canopy-500 dark:bg-harvest dark:hover:bg-harvest-500 dark:text-canopy-900',
  accent: 'bg-harvest text-white hover:bg-harvest-500',
  outline: 'border-2 border-canopy text-canopy hover:bg-canopy hover:text-cream-100 dark:border-cream-200 dark:text-cream-200 dark:hover:bg-cream-200 dark:hover:text-canopy-900',
  ghost: 'text-canopy hover:bg-canopy-50 dark:text-cream-200 dark:hover:bg-canopy-700/50',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Shared button. Renders a <Link> when `to` is provided, an <a> when `href`
 * is provided, otherwise a native <button>.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, className = '', children, ...props },
  ref
) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} ref={ref} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

export default Button;
