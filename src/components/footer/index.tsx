import * as React from "react";

import Link from "~components/link";

export default function Footer() {
  return (
    <footer className="p-8 pb-16 text-sm text-center">
      Made using <Link href="https://nextjs.org">Next.js</Link> and{" "}
      <Link href="https://tailwindcss.com">Tailwind CSS</Link>.
      <br />
      Source code is <Link href="https://github.com/grikomsn/console-patterns">available on GitHub</Link>.
    </footer>
  );
}
