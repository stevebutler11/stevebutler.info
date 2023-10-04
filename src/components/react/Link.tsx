import React, { type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLAnchorElement>;

const Link = (props: Props & { href: string }) => {
  const { href, className, ...restProps } = props;
  const { pathname } = window.location;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");

  return (
    <a
      href={href}
      className={className + (isActive ? " active" : "")}
      {...restProps}
    >
      {props.children}
    </a>
  );
};

export default Link;
