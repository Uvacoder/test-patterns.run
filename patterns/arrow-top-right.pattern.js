for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const line = i === size - j - 1;
    const head = j > i - 1;

    print(line || head ? "* " : "  ");
  }
  newline();
}
