export default function isObject(obj) {
  const objType = typeof obj;

  return obj && objType === 'object' && !Array.isArray(obj) && obj !== null;
}
