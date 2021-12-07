import * as React from "react";

import siteConfig from "@/config/site";

import IconPng from "../../../public/icon.png";

import * as Mantine from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { FaCode } from "react-icons/fa";

export default function Header() {
  return (
    <Mantine.Box
      sx={(t) => ({
        paddingTop: t.spacing.md,
        position: "relative",
        [`@media (max-width: ${t.breakpoints.xs}px)`]: {
          textAlign: "center",
        },
      })}
    >
      <Link href="/" passHref>
        <Mantine.Box component="a">
          <Image height={48} src={IconPng} width={48} />
        </Mantine.Box>
      </Link>
      <Link href="/" passHref>
        <Mantine.Anchor>
          <Mantine.Title>{siteConfig.title}</Mantine.Title>
        </Mantine.Anchor>
      </Link>
      <Mantine.Text>{siteConfig.description}</Mantine.Text>
      <Mantine.Text
        sx={(t) => ({
          "&, a": {
            fontSize: t.fontSizes.sm,
          },
          [`@media (min-width: ${t.breakpoints.xs}px)`]: {
            textAlign: "right",
          },
        })}
      >
        <Mantine.Anchor href={`${siteConfig.links.github}/issues/new/choose`}>Request pattern</Mantine.Anchor> or{" "}
        <Mantine.Anchor href={siteConfig.links.github}>view source on GitHub</Mantine.Anchor>
      </Mantine.Text>

      <Mantine.Box sx={(t) => ({ paddingTop: t.spacing.md })}>
        <Link href="/playground" passHref>
          <Mantine.Button
            color="green"
            component="a"
            rightIcon={<FaCode />}
            size="xs"
            sx={(t) => ({
              [`@media (min-width: ${t.breakpoints.xs}px)`]: {
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 1,
              },
            })}
          >
            Open playground
          </Mantine.Button>
        </Link>
      </Mantine.Box>

      <Mantine.Divider mt="lg" />
    </Mantine.Box>
  );
}
