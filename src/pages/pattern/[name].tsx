import * as React from "react";

import Container from "@/components/container";
import Editor from "@/components/editor";
import { EditorProvider } from "@/store/editor";

import fs from "fs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import path from "path";

interface PatternPageProps {
  filename: string;
  source: string;
}

const PatternPage: NextPage<PatternPageProps> = (props) => {
  const { source } = props;

  const router = useRouter();
  const title = `${router.query.name as string}`;

  return (
    <Container>
      <NextSeo title={title} />

      <div className="mb-4 text-center">
        <NextLink href="/">
          <a href="/">⬅ Back to gallery</a>
        </NextLink>
      </div>

      <EditorProvider value={{ source, title }}>
        <Editor />
      </EditorProvider>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const patternsDirectory = path.join(process.cwd(), "patterns");
  const filenames = fs.readdirSync(patternsDirectory);

  const paths = filenames.reduce((acc, filename) => {
    if (/\.pattern.js$/.test(filename)) {
      return acc.concat({ params: { name: filename.split(".")[0] } });
    }
    return acc;
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const directory = path.join(process.cwd(), "patterns");
  const filePath = path.join(directory, `${params.name as string}.pattern.js`);
  const source = fs.readFileSync(filePath, "utf8").trim();

  return {
    props: {
      source,
    },
  };
};

export default PatternPage;
