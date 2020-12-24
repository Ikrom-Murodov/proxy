# Proxy for reactive programming.

##### This library uses webpack. I added my webpack config to the project. You can learn more [here](https://github.com/Ikrom-Murodov/Webpack-4).

This library only provides one function named reactive. this function takes two parameters 1) the object of which needs to be wrapped in a proxy 2) An object that contains functions that will be called at a certain moment.

### Installation.

```
npm install proxy-handler-for-reactivity
```

### Create a reactive object.

```ts
import reactive from 'proxy-handler-for-reactivity';

const user = reactive(
  {
    name: 'Ikrom',
    surname: 'Murodov',
    age: 19,

    friends: [{ name: 'Some-name', surname: 'Some-surname', age: 'Some-age' }],
  },
  {
    getHook(target, key) {
      // This function will be called when you read any property.
      console.log('target', target);
      console.log('key', key);
    },

    setHook(target, key, value) {
      // This function will be called when you change any property.

      console.log('target', target);
      console.log('key', key);
      console.log('value', value);
    },

    deleteProperty(target, key) {
      // This function will be called when you delete any property.

      console.log('target', target);
      console.log('key', key);
    },

    has(target, key) {
      // This function will be called when you check any property for existence.

      console.log('target', target);
      console.log('key', key);
    },

    ownKeys(target) {
      // This function will be called when iterating over the object
      console.log('target', target);
    },
  },
);
```
