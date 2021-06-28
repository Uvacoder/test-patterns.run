import * as React from "react";

type AProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<AProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children || rest.href.replace(/https?:\/\//, "")}
    </a>
  );
};

export default Link;
