const hspacing = 2;
const vspacing = 2;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const horizontal = j < size && j % hspacing == 0;
    const vertical = i < size && i % vspacing == 0;

    print(horizontal && vertical ? "* " : "  ");
  }
  newline();
}
