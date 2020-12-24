/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

interface IHooks<T> {
  getHook?(target: T, key: string | number | symbol): void;
  setHook?(target: T, key: string | number | symbol, value: any): void;
  deleteProperty?(target: T, key: string | number | symbol): void;
  has?(target: T, key: string | number | symbol): void;
  ownKeys?(target: T): void;
}

/**
 * The result of this function will be a proxy handler.
 * @param { IHooks } hooks - An object containing special functions that
 *   will be called when certain hooks are triggered.
 * @returns { ProxyHandler } Returns proxy handler.
 */
function proxyHandler<T extends object = object>(
  hooks?: IHooks<T>,
): ProxyHandler<T> {
  return {
    get(target, key): unknown {
      const result = Reflect.get(target, key);
      if (result && hooks?.getHook) hooks.getHook(target, key);
      if (typeof result === 'function') return result.bind(target);
      if (typeof result === 'object') return new Proxy(result, this);
      return result;
    },

    set(target, key, value): boolean {
      const result = Reflect.set(target, key, value);
      if (result && hooks?.setHook) hooks.setHook(target, key, value);
      return result;
    },

    deleteProperty(target, key): boolean {
      const result = Reflect.deleteProperty(target, key);
      if (result && hooks?.deleteProperty) hooks.deleteProperty(target, key);
      return result;
    },

    has(target, key): boolean {
      const result = Reflect.has(target, key);
      if (result && hooks?.has) hooks.has(target, key);
      return result;
    },

    ownKeys(target): (string | number | symbol)[] {
      if (hooks?.ownKeys) hooks.ownKeys(target);
      return Reflect.ownKeys(target);
    },
  };
}

/**
 * This function creates a proxy and also adds a tracking handler for the object,
 *   you can subscribe to an action using hooks.
 * @param {Object} target - The target to add the proxy to.
 * @param { IHooks } hooks - An object containing special functions that
 *   will be called when certain hooks are triggered.
 * @returns An object that is wrapped in a proxy.
 */
function reactive<T extends object = object>(target: T, hooks?: IHooks<T>): T {
  return new Proxy(target, proxyHandler(hooks));
}
