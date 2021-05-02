import * as React from "react";

import cx from "@sindresorhus/class-names";

type ContainerProps = React.FC<React.HTMLAttributes<HTMLElement>>;

const Container: ContainerProps = ({ className, ...props }) => (
  <section {...props} className={cx("container mx-auto p-4", className)} />
);

export default Container;
