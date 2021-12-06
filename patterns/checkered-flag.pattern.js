for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const odd = i % 2 !== 0 && j % 2 !== 0;
    const even = i % 2 === 0 && j % 2 === 0;

    print(odd || even ? "█ " : "  ");
  }
  newline();
}
