for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const diagonal = j === size - i - 1; // ↙
    const horizontal = i === size - 1;
    const vertical = j === size - 1;

    const clause = diagonal || horizontal || vertical;
    print(clause ? "* " : "  ");
  }
  newline();
}
