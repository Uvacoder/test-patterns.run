for (let i = 0; i < size * 2 - 1; i++) {
  const rt /* ↙ */ = size + i;
  const rb /* ↖ */ = size * 3 - i - 2;
  const limit = i < size ? rt : rb;

  for (let j = 0; j < limit; j++) {
    const lt /* ↘ */ = j >= size - i - 1;
    const lb /* ↗ */ = j > i - size;

    print(lt && lb ? "* " : "  ");
  }
  newline();
}
