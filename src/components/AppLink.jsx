import { forwardRef } from 'react'
import { Link, NavLink } from 'react-router'
import { preloadRoute } from '../routes.jsx'

const pathOf = (to) => (typeof to === 'string' ? to : to && to.pathname)

/**
 * Internal link with page transitions (View Transitions API) and route
 * preloading on hover / focus / touch so navigation feels instant.
 */
export const AppLink = forwardRef(function AppLink(
  { to, onMouseEnter, onFocus, onTouchStart, nav = false, ...rest },
  ref,
) {
  const preload = () => preloadRoute(pathOf(to))
  const Component = nav ? NavLink : Link
  return (
    <Component
      ref={ref}
      to={to}
      viewTransition
      onMouseEnter={(e) => {
        preload()
        if (onMouseEnter) onMouseEnter(e)
      }}
      onFocus={(e) => {
        preload()
        if (onFocus) onFocus(e)
      }}
      onTouchStart={(e) => {
        preload()
        if (onTouchStart) onTouchStart(e)
      }}
      {...rest}
    />
  )
})
