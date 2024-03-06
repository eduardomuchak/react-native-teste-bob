export * from './components/button';
export * from './components/text';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a + b);
}
