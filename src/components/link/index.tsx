import * as React from "react";

export default function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { children, ...rest } = props;

  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children ?? rest.href?.replace(/https?:\/\//, "")}
    </a>
  );
}
