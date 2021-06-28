import * as React from "react";

import config from "~/site-config";
import Link from "@/components/link";

const Header: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <h1>
        <span aria-label="kite" role="img">
          🪁
        </span>{" "}
        {config.title}
      </h1>
      <p className="text-xl">{config.description}</p>

      <p className="text-sm">
        Request new patterns or find some bugs?{" "}
        <Link href="https://github.com/grikomsn/console-patterns/issues">
          Submit an issue on GitHub
        </Link>
        .
      </p>
    </div>
  );
};

export default Header;
