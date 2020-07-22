export type Factory<T> = (container: Container) => T;
export type FactoryOrInstance<T> = T | Factory<T>;

export function isFactory<T>(factoryOrInstance: FactoryOrInstance<T>): factoryOrInstance is Factory<T> {
  return typeof factoryOrInstance === 'function';
}

export interface IContainer {
  get<T>(name: string): T;
}

export class Container implements IContainer {
  private readonly singletonRegistry = {} as any;
  private readonly trancientRegistry = {} as any;
  private loadingSingleton = false;

  private preRegisterCheck<T>(name: string) {
    if (this.singletonRegistry[name]) {
      throw new Error(`Service ${name} already registered as a singleton.`);
    }
    if (this.trancientRegistry[name]) {
      throw new Error(`Service ${name} already registered.`);
    }
  }

  public register<T>(name: string, factory: Factory<T>): Container {
    this.preRegisterCheck<T>(name);
    this.trancientRegistry[name] = factory;
    return this;
  }

  public registerSingleton<T>(name: string, factoryOrInstance: FactoryOrInstance<T>): Container {
    this.preRegisterCheck<T>(name);
    this.singletonRegistry[name] = factoryOrInstance;
    return this;
  }

  private createSingletonInstance<T>(factory: Factory<T>): T {
    const loadingSingleton = this.loadingSingleton;
    try {
      return factory(this);
    } finally {
      this.loadingSingleton = loadingSingleton;
    }
  }

  private getSingleton<T>(name: string): T | undefined {
    const factoryOrInstance: FactoryOrInstance<T> = this.singletonRegistry[name];
    if (factoryOrInstance) {
      if (isFactory(factoryOrInstance)) {
        const instance = this.createSingletonInstance(factoryOrInstance);
        // Singleton resolved. Replace factory with instance
        this.singletonRegistry[name] = instance;
        return instance;
      }
      return factoryOrInstance;
    }
    if (this.loadingSingleton) throw Error(`Service ${name} not registered as singleton.`);
    return undefined;
  }

  private getTrancient<T>(name: string): T {
    const factory: Factory<T> = this.trancientRegistry[name];
    if (factory) return factory(this);

    throw Error(`Service ${name} not registered.`);
  }

  public get<T>(name: string): T {
    // console.warn("container", this.singletonRegistry, this.trancientRegistry);

    return this.getSingleton(name) || this.getTrancient(name);
  }
}
