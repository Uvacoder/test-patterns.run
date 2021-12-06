for (let i = 0; i < size; i++) {
  for (let j = 0; j <= i; j++) {
    const diagonal = i === j;
    const horizontal = i === size - 1;
    const vertical = j === 0;

    const clause = diagonal || horizontal || vertical;
    print(clause ? "* " : "  ");
  }
  newline();
}
