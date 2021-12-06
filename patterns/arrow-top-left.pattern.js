for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const line = i === j;
    const head = i < size - j;

    print(line || head ? "* " : "  ");
  }
  newline();
}
