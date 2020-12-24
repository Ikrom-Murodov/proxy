/* eslint-disable @typescript-eslint/ban-types */

function proxyHandler<T extends object = object>(): ProxyHandler<T> {
  return {
    get(target, key): unknown {
      const result = Reflect.get(target, key);

      if (typeof result === 'function') return result.bind(target);
      if (typeof result === 'object') return new Proxy(result, this);
      return result;
    },

    set(target, key, value): boolean {
      const result = Reflect.set(target, key, value);
      return result;
    },

    deleteProperty(target, key): boolean {
      const result = Reflect.deleteProperty(target, key);
      return result;
    },

    has(target, key): boolean {
      const result = Reflect.has(target, key);
      return result;
    },

    ownKeys(target): (string | number | symbol)[] {
      return Reflect.ownKeys(target);
    },
  };
}
