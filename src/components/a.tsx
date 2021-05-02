import * as React from "react";

import cx from "@sindresorhus/class-names";

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  custom?: boolean;
}

const A: React.FC<AProps> = (props) => {
  const { children, className, custom = false, href, ...rest } = props;

  return (
    <a
      className={cx({ "custom-link": custom }, className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      {children || href.replace(/https?:\/\//, "")}
    </a>
  );
};

export default A;
