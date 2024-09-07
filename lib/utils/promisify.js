import isFunction from './isFunction.js';

/* TODO 
replace content of promisify with bluebird or smthg to be able to wrap natively async fn as well transparently  
#transparentPromisify
*/
export default function promisify(fn) {
  if (!isFunction(fn))
    throw new Error(
      `'fn' should be a function but its value is ${fn ?? 'not defined'}`
    );

  return (...args) => new Promise((resolve, reject) => {
      try {
        const result = fn(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
}
