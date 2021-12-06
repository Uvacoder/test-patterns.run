for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const /* ↘ */ ltrb = i === j;
    const /* ↙ */ rtlb = j === size - i - 1;

    print(ltrb || rtlb ? "* " : "  ");
  }
  newline();
}
