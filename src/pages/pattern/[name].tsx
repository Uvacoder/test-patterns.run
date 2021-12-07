import * as React from "react";

import cwd from "@/utils/cwd";

import * as Mantine from "@mantine/core";
import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { FaArrowLeft } from "react-icons/fa";

const SandpackEditor = dynamic(() => import("@/ui/editor/sandpack"));

interface PatternPageProps {
  name: string;
  source: string;
}

export const getStaticProps: GetStaticProps<PatternPageProps> = async ({ params }) => {
  const name = params?.name as string;
  const source = fs.readFileSync(cwd("./patterns", `${name}.pattern.js`), "utf8");
  return {
    props: {
      name,
      source,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
  const filenames = fs.readdirSync(cwd("./patterns"));

  const paths = filenames.reduce<{ params: { name: string } }[]>((acc, filename) => {
    if (filename.endsWith(".pattern.js")) {
      acc.push({ params: { name: filename.replace(".pattern.js", "") } });
    }
    return acc;
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export default function PatternPage({ name, source }: PatternPageProps) {
  return (
    <Mantine.Group align="stretch" direction="column">
      <NextSeo title={name} />

      <Mantine.Box
        sx={(t) => ({
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: `${t.spacing.xs}px`,
          [`@media (min-width: ${t.breakpoints.xs}px)`]: {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        })}
      >
        <Mantine.Title order={4}>{name}</Mantine.Title>
        <Link href="/" passHref>
          <Mantine.Button component="a" leftIcon={<FaArrowLeft />} size="xs">
            Back to gallery
          </Mantine.Button>
        </Link>
      </Mantine.Box>

      <Mantine.Box sx={{ maxWidth: "100vw", overflow: "auto" }}>
        <SandpackEditor name={name} source={source} />
      </Mantine.Box>
    </Mantine.Group>
  );
}
