import { ISourceAdapter } from './adapter';
import { CalendarAdapter } from './calendar-adapter';
import { RestAdapter } from './rest-adapter';
import { HistoryAdapter } from './history-adapter';
import { StaticAdapter } from './static-adapter';

type AdapterConstructor = new () => ISourceAdapter;

class AdapterRegistry {
  private registry = new Map<string, AdapterConstructor>();

  register(type: string, ctor: AdapterConstructor): void {
    this.registry.set(type, ctor);
  }

  create(type: string): ISourceAdapter {
    const ctor = this.registry.get(type);
    if (!ctor) {
      throw new Error(`[chronicle-card] Unknown adapter type: "${type}". Available types: ${Array.from(this.registry.keys()).join(', ')}`);
    }
    return new ctor();
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }

  types(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const adapterRegistry = new AdapterRegistry();

// Pre-register all built-in adapter types
adapterRegistry.register('calendar', CalendarAdapter);
adapterRegistry.register('rest', RestAdapter);
adapterRegistry.register('history', HistoryAdapter);
adapterRegistry.register('static', StaticAdapter);
