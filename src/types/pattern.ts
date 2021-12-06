export interface PatternComputer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (newline: () => void, print: (...vars: any[]) => void, size: number): void;
}

export interface PatternData {
  name: string;
  source: string;
  result: string;
}
