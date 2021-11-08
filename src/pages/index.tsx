/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";

import theme from "@/theme/prism";
import { LogicFunction } from "@/types";
import Container from "@/ui/container";
import createPattern from "@/utils/create-pattern";
import cwd from "@/utils/cwd";

import fs from "fs";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { NextSeo } from "next-seo";
import Highlight, { Prism } from "prism-react-renderer";

interface PatternData {
  title: string;
  source: string;
  example: string;
}

interface HomePageProps {
  data: PatternData[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const filenames = fs.readdirSync(cwd("./patterns"));

  const data = filenames.reduce<PatternData[]>((acc, filename) => {
    if (/\.pattern.js$/.test(filename)) {
      const file = fs.readFileSync(cwd("./patterns", filename), "utf8");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const logic: LogicFunction = require(`../../patterns/${filename}`).default;

      return acc.concat({
        title: filename.split(".")[0],
        source: file.replace(/\/\*\*.+\*\//, "").trim(),
        example: createPattern(logic).test(5),
      });
    }
    return acc;
  }, []);

  return {
    props: {
      data,
    },
  };
};

export default function HomePage({ data }: HomePageProps) {
  return (
    <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <NextSeo title="Gallery" />
      {data.map(({ title, source, example }, i) => (
        <div key={i} className="flex flex-col h-full p-4 bg-gray-900 rounded shadow">
          <h6 className="mt-0 text-center">{title}</h6>

          <div className="flex flex-col flex-grow pb-8 lg:flex-row">
            <div className="flex-grow overflow-x-auto text-sm">
              <Highlight Prism={Prism} code={source} language="javascript" theme={theme}>
                {({ className, getLineProps, getTokenProps, tokens }) => (
                  <pre className={className}>
                    {tokens.map((line, j) => (
                      <div {...getLineProps({ line, key: j })} key={j}>
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} key={key} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>

            <div className="m-4 border border-gray-800" />

            <pre className="m-auto text-sm">{example}</pre>
          </div>

          <div className="text-sm text-center">
            <NextLink href={`/pattern/${title}`}>
              <a href={`/pattern/${title}`}>Open playground</a>
            </NextLink>
          </div>
        </div>
      ))}
    </Container>
  );
}
