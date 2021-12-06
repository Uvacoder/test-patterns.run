for (let i = 0; i < size * 2 - 1; i++) {
  for (let j = 0; j < size * 2 - 1; j++) {
    const lt /* ↘ */ = j >= size - i - 1;
    const lb /* ↗ */ = j > i - size;
    const rt /* ↙ */ = j <= size + i - 1;
    const rb /* ↖ */ = j < size * 3 - i - 2;

    print(lt && lb && rt && rb ? "* " : "  ");
  }
  newline();
}
