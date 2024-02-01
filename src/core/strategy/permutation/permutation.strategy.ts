export interface PermutationStrategy {
  generatePermutations(permutationArray: number[]): Generator<number[]>;
}

export class DefaultPermutationStrategy implements PermutationStrategy {
  *generatePermutations(permutationArray: number[]): Generator<number[]> {
    const arrayLength = permutationArray.length;
    const currentIndex = Array(arrayLength).fill(0);

    for (let outerIndex of Array(arrayLength).keys()) {
      if (currentIndex[outerIndex] < outerIndex) {
        if (outerIndex % 2 === 0) {
          [permutationArray[0], permutationArray[outerIndex]] = [
            permutationArray[outerIndex],
            permutationArray[0],
          ];
        } else {
          [permutationArray[currentIndex[outerIndex]], permutationArray[outerIndex]] = [
            permutationArray[outerIndex],
            permutationArray[currentIndex[outerIndex]],
          ];
        }

        yield [...permutationArray];

        currentIndex[outerIndex]++;
        outerIndex = 0;
      } else {
        currentIndex[outerIndex] = 0;
      }
    }
  }
}

export class Permutator {
  private permutationStrategy: PermutationStrategy | undefined;

  setPermutationStrategy(strategy: PermutationStrategy): void {
    this.permutationStrategy = strategy;
  }

  *generatePermutations(inputArray: number[]): Generator<number[]> {
    return this.permutationStrategy?.generatePermutations(inputArray);
  }
}
