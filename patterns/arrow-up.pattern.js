for (let i = 0; i < size * 2 - 1; i++) {
  for (let j = 0; j < size * 2 - 1; j++) {
    const lt /* ↘ */ = j >= size - i - 1;
    const rt /* ↙ */ = j <= size + i - 1;
    const head = lt && rt && i < size;
    const line = j === size - 1;

    print(head || line ? "* " : "  ");
  }
  newline();
}
