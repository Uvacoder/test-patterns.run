import * as React from "react";

import cx from "@sindresorhus/class-names";

export default function Container(props: React.HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props;

  return <section {...rest} className={cx("container mx-auto p-4", className)} />;
}
