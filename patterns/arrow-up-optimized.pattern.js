for (let i = 0; i < size * 2 - 1; i++) {
  const rt /* ↙ */ = size + i;
  const rb /* ┌ */ = size;
  const limit = i < size ? rt : rb;

  for (let j = 0; j < limit; j++) {
    const head = j >= size - i - 1 && i < size;
    const line = j === size - 1;

    print(head || line ? "* " : "  ");
  }
  newline();
}
