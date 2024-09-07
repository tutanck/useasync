import isObject from './isObject.js';

export default function isContextEmpty(context) {
  return !context || (isObject(context) && !Object.keys(context).length);
}
