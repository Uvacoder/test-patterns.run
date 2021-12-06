import * as React from "react";

import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition mounted={scroll.y > 200} transition="slide-up">
        {(styles) => (
          <ActionIcon color="indigo" onClick={() => scrollTo({ y: 0 })} style={styles} variant="filled">
            <FaArrowUp />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
