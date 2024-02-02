import { Client } from '@/core/builder/client/client.builder';

export class OptimizedRouteCalculator {
  private static instance: OptimizedRouteCalculator | null = null;
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

  public calculateOptimalRoute() {
    const distancesFromOrigin = this.clients.map((client) => ({
      distance: this.calculateDistance(client),
      ...client
    }));

    distancesFromOrigin.sort(
      (coordinate_x, coordinate_y) =>
        coordinate_x.distance - coordinate_y.distance
    );

    return distancesFromOrigin.map((client) => client);
  }

  private calculateDistance(client: Client): number {
    const deltaX = client.coordinates.x - 0;
    const deltaY = client.coordinates.y - 0;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
}
