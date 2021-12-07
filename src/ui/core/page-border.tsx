import * as React from "react";

import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((t) => ({
  border: {
    backgroundColor: t.colors.indigo?.[9],
    height: 4,
    left: 0,
    position: "sticky",
    right: 0,
    top: 0,
    zIndex: 1000,
  },
}));

export default function PageBorder() {
  const { classes } = useStyles();
  return <Box className={classes.border} />;
}
