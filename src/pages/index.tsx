import * as React from "react";

import { PatternData } from "@/types/pattern";
import cwd from "@/utils/cwd";

import * as Mantine from "@mantine/core";
import { Prism } from "@mantine/prism";
import fs from "fs";
import { GetStaticProps } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { patternRunner } from "pattern-runner";
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
        result: patternRunner(source),
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

const useStyles = Mantine.createStyles((t) => ({
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: `${t.spacing.xs}px`,
    [`@media (min-width: ${t.breakpoints.xs}px)`]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  grid: {
    [`@media (min-width: ${t.breakpoints.xs}px)`]: {
      display: "flex",
      gap: `${t.spacing.sm}px`,
      "& > *": {
        width: "50%",
      },
    },
  },
  patternTitle: {
    paddingBottom: t.spacing.sm,
    [`@media (max-width: ${t.breakpoints.xs}px)`]: {
      textAlign: "center",
    },
  },
}));

export default function GalleryPage({ data }: GalleryPageProps) {
  const { classes } = useStyles();
  return (
    <>
      <NextSeo title="Gallery" />

      {data.map(({ name, source, result }) => (
        <Mantine.Group key={name} align="stretch" direction="column" sx={{ overflow: "hidden" }}>
          <Mantine.Box className={classes.header}>
            <Mantine.Title order={4}>{name}</Mantine.Title>
            <Mantine.Box sx={{ "&": { flexGrow: "1" } }} />
            <Link href={`/pattern/${name}`} passHref>
              <Mantine.Button component="a" rightIcon={<FaCode />} size="xs">
                Edit in playground
              </Mantine.Button>
            </Link>
          </Mantine.Box>

          <Mantine.Box className={classes.grid}>
            <Mantine.Box sx={(t) => ({ paddingBottom: t.spacing.sm })}>
              <Mantine.Title className={classes.patternTitle} order={6}>
                Source code
              </Mantine.Title>
              <Prism language="javascript" sx={{ maxWidth: "100vw" }}>
                {source}
              </Prism>
            </Mantine.Box>
            <Mantine.Box sx={(t) => ({ paddingBottom: t.spacing.sm })}>
              <Mantine.Title className={classes.patternTitle} order={6}>
                Result
              </Mantine.Title>
              <Prism language="markup" noCopy sx={{ maxWidth: "100vw" }}>
                {result}
              </Prism>
            </Mantine.Box>
          </Mantine.Box>

          <Mantine.Space h="xl" />
        </Mantine.Group>
      ))}
    </>
  );
}
