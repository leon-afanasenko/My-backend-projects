export function generateFibonacci(limit: number): number[] {
  const sequence: number[] = [0, 1];
  while (
    sequence[sequence.length - 1] + sequence[sequence.length - 2] <
    limit
  ) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2]
    );
  }
  return sequence;
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (primes.every((p) => i % p !== 0)) primes.push(i);
  }
  return primes;
}
