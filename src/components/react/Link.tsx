import React, { type HTMLAttributes } from "react";
import styles from "./Link.module.css";

type Props = HTMLAttributes<HTMLAnchorElement>;

const Link = (props: Props & { href: string }) => {
  const { href, className, ...restProps } = props;
  const { pathname } = window.location;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");

  return (
    <a
      href={href}
      {...restProps}
      className={isActive ? styles.isActive : ''}
    >
      {props.children}
    </a>
  );
};

export default Link;
