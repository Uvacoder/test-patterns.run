import * as React from "react";

import Link from "~components/link";

const Footer: React.FC = () => {
  return (
    <footer className="p-8 pb-16 text-sm text-center">
      Made using <Link href="https://nextjs.org">Next.js</Link> and{" "}
      <Link href="https://tailwindcss.com">Tailwind CSS</Link>. Hosted on{" "}
      <Link href="https://vercel.com/home">Vercel</Link>.
      <br />
      Source code is{" "}
      <Link href="https://github.com/grikomsn/console-patterns">
        available on GitHub
      </Link>
      .
    </footer>
  );
};

export default Footer;
