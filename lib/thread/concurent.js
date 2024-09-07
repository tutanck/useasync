export default function concurent(...fns) {
  return (arg) => fns.map((fn) => fn(arg));
}
