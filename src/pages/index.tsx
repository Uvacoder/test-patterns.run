import * as React from "react";

import { PatternData } from "@/types/pattern";
import cwd from "@/utils/cwd";
import { computePattern } from "@/utils/pattern";

import * as Mantine from "@mantine/core";
import { Prism } from "@mantine/prism";
import fs from "fs";
import { GetStaticProps } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { FaCode } from "react-icons/fa";

interface GalleryPageProps {
  data: PatternData[];
}

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const filenames = fs.readdirSync(cwd("./patterns"));

  const data = filenames.reduce<PatternData[]>((acc, filename) => {
    if (filename.endsWith(".pattern.js")) {
      const source = fs.readFileSync(cwd("./patterns", filename), "utf8");
      return acc.concat({
        name: filename.replace(".pattern.js", ""),
        source,
        result: computePattern(source),
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

export default function GalleryPage({ data }: GalleryPageProps) {
  return (
    <>
      <NextSeo title="Gallery" />

      {data.map(({ name, source, result }) => (
        <Mantine.Group key={name} align="stretch" direction="column">
          <Mantine.Group>
            <Mantine.Title order={4}>{name}</Mantine.Title>
            <Mantine.Box sx={{ "&": { flexGrow: "1" } }} />
            <Link href={`/pattern/${name}`} passHref>
              <Mantine.Button component="a" rightIcon={<FaCode />} size="xs">
                Edit in playground
              </Mantine.Button>
            </Link>
          </Mantine.Group>

          <Mantine.SimpleGrid
            breakpoints={[
              { cols: 2, minWidth: "sm" },
              { cols: 1, minWidth: "xs" },
              //
            ]}
          >
            <Prism language="javascript">{source}</Prism>
            <Prism language="markup" noCopy>
              {result}
            </Prism>
          </Mantine.SimpleGrid>

          <Mantine.Space h="xl" />
        </Mantine.Group>
      ))}
    </>
  );
}
