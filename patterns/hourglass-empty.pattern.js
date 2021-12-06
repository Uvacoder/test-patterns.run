for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const ltrb /* ↘ */ = i === j;
    const rtlb /* ↙ */ = j === size - i - 1;
    const top = i === 0;
    const bottom = i === size - 1;

    const clause = ltrb || rtlb || top || bottom;
    print(clause ? "* " : "  ");
  }
  newline();
}
