import * as React from "react";

import cx from "@sindresorhus/class-names";

const Container: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={cx("container mx-auto p-4", className)} />
  );
};

export default Container;
