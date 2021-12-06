for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const top = i === 0;
    const bottom = i === size - 1;
    const left = j === 0;
    const right = j === size - 1;

    const /* ↘ */ ltrb = i === j;
    const /* ↙ */ rtlb = j === size - i - 1;

    const square = top || bottom || left || right;
    const x = ltrb || rtlb;

    print(square || x ? "* " : "  ");
  }
  newline();
}
