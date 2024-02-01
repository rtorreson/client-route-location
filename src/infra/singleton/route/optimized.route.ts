import { Client } from '@/core/builder/client/client.builder';
import { Permutator } from '@/core/strategy';

export class OptimizedRouteCalculator {
  private static instance: OptimizedRouteCalculator | null = null;
  private shortestDistance: number = Number.MAX_SAFE_INTEGER;
  private optimalOrder: number[] = [];
  private clients: Client[] = [];

  private constructor(clients: Client[]) {
    this.clients = clients;
  }

  static getInstance(clients: Client[]): OptimizedRouteCalculator {
    if (!OptimizedRouteCalculator.instance) {
      OptimizedRouteCalculator.instance = new OptimizedRouteCalculator(clients);
    }
    return OptimizedRouteCalculator.instance;
  }

  public calculateOptimalRoute(): number[] {
    const numberOfClients = this.clients.length;
    const clientIndices = [...Array(numberOfClients).keys()];

    const permutationGenerator = new Permutator();
    const permutations =
      permutationGenerator.generatePermutations(clientIndices);

    this.calculate(permutations);

    return this.optimalOrder;
  }

  private calculate(permutations: Generator<number[]>): void {
    for (const currentPermutation of permutations) {
      const totalDistance = this.calculateTotalDistance(currentPermutation);

      if (totalDistance < this.shortestDistance) {
        this.shortestDistance = totalDistance;
        this.optimalOrder = [...currentPermutation];
      }
    }
  }

  private calculateTotalDistance(clientIndices: number[]): number {
    return clientIndices.reduce((totalDistance, currentIndex, index) => {
      const currentClient = this.clients[currentIndex];
      const nextClient = this.clients[clientIndices[index + 1]];

      if (nextClient) {
        return (
          totalDistance + this.calculateDistance(currentClient, nextClient)
        );
      } else {
        return (
          totalDistance + this.calculateDistance(currentClient, nextClient)
        );
      }
    }, 0);
  }

  private calculateDistance(pointA: Client, pointB: Client): number {
    const deltaX = pointB.coordinates.x - pointA.coordinates.x;
    const deltaY = pointB.coordinates.y - pointA.coordinates.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}
