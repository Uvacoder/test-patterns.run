for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const diagonal = i === j;
    const horizontal = i === 0;
    const vertical = j === size - 1;

    const clause = diagonal || horizontal || vertical;
    print(clause ? "* " : "  ");
  }
  newline();
}
