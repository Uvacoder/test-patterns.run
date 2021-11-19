import * as React from "react";

import { EditorProvider } from "@/store/editor";
import Container from "@/ui/container";
import Editor from "@/ui/editor";
import cwd from "@/utils/cwd";

import fs from "fs";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

interface PatternPageProps {
  source: string;
}

export default function PatternPage({ source }: PatternPageProps) {
  const router = useRouter();
  const title = `${router.query.name as string}`;

  return (
    <Container>
      <NextSeo title={title} />

      <div className="mb-4 text-center">
        <NextLink href="/" passHref>
          <a>⬅ Back to gallery</a>
        </NextLink>
      </div>

      <EditorProvider value={{ source, title }}>
        <Editor />
      </EditorProvider>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
  const filenames = fs.readdirSync(cwd("./patterns"));

  const paths = filenames.reduce<GetStaticPathsResult<{ name: string }>["paths"]>((acc, filename) => {
    if (/\.pattern.js$/.test(filename)) {
      return acc.concat({ params: { name: filename.split(".")[0] as "" } });
    }
    return acc;
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PatternPageProps> = async ({ params }) => {
  const name = params?.name as string;
  const filePath = cwd("./patterns", `${name}.pattern.js`);
  const file = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      source: file.trim(),
    },
  };
};
