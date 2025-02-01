import { DataInteractive as HeadlessDataInteractive } from '@headlessui/react'
import React from 'react'
import { NavLink as ReactRouterLink, type LinkProps } from 'react-router-dom'

export const Link = React.forwardRef(function Link(
  props: { href: string | LinkProps['to'] } & Omit<LinkProps, 'to'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <HeadlessDataInteractive>
      <ReactRouterLink {...props} to={props.href} ref={ref} />
    </HeadlessDataInteractive>
  )
})
