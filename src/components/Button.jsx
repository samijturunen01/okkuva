import { AppLink } from './AppLink.jsx'
import { ArrowIcon } from './icons.jsx'
import './Button.css'

/**
 * Animated pill button.
 *
 * variant: 'primary' (black) | 'accent' (lens gradient) | 'ghost' (outline)
 *          | 'ghost-dark' (outline on dark) | 'light' (white on dark)
 * size:    'sm' | 'md' | 'lg'
 * icon:    'arrow' (default) | null | a React element
 *
 * Renders a router link (`to`), an anchor (`href`) or a <button>.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon = 'arrow',
  iconPosition = 'end',
  className = '',
  children,
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
  const iconNode =
    icon === null || icon === false ? null : (
      <span className="btn__icon" aria-hidden="true">
        {icon === 'arrow' ? <ArrowIcon /> : icon}
      </span>
    )
  const content = (
    <>
      {iconPosition === 'start' && iconNode}
      <span className="btn__label">{children}</span>
      {iconPosition === 'end' && iconNode}
    </>
  )

  if (to) {
    return (
      <AppLink to={to} className={classes} {...rest}>
        {content}
      </AppLink>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
