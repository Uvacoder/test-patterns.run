/* eslint-disable react/no-array-index-key */
import * as React from "react";

import Container from "@/components/container";
import theme from "@/prism-theme";
import { LogicFunction } from "@/types";
import createPattern from "@/utils/create-pattern";

import * as fs from "fs";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import * as path from "path";
import Highlight, { Prism } from "prism-react-renderer";

interface PatternData {
  title: string;
  source: string;
  example: string;
}

interface HomePageProps {
  data: PatternData[];
}

export const getStaticProps: GetStaticProps = async () => {
  const patternsDirectory = path.join(process.cwd(), "patterns");
  const filenames = fs.readdirSync(patternsDirectory);

  const data = filenames.reduce<PatternData[]>((acc, filename) => {
    if (/\.pattern.js$/.test(filename)) {
      const filePath = path.join(patternsDirectory, filename);
      const source = fs.readFileSync(filePath, "utf8").trim();
      const logic: LogicFunction = require(`../../patterns/${filename}`)
        .default;
      const example = createPattern(logic).test(5);
      return acc.concat({ title: filename.split(".")[0], source, example });
    }
    return acc;
  }, []);

  return {
    props: {
      data,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({ data }) => (
  <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {data.map(({ title, source, example }, i) => (
      <div
        key={i}
        className="flex flex-col h-full p-4 bg-gray-900 rounded shadow"
      >
        <h6 className="mt-0 text-center">{title}</h6>

        <div className="flex flex-col flex-grow pb-8 lg:flex-row">
          <div className="flex-grow overflow-x-auto text-sm">
            <Highlight
              Prism={Prism}
              code={source}
              language="javascript"
              theme={theme}
            >
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
          <Link href={`/pattern/${title}`}>
            <a href={`/pattern/${title}`}>Open playground</a>
          </Link>
        </div>
      </div>
    ))}
  </Container>
);

export default HomePage;
