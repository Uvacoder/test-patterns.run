for (let i = 0; i < size; i++) {
  for (let j = 0; j < size - i; j++) {
    const diagonal = j === size - i - 1; // ↙
    const horizontal = i === 0;
    const vertical = j === 0;

    const clause = diagonal || horizontal || vertical;
    print(clause ? "* " : "  ");
  }
  newline();
}
