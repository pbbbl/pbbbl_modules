export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

console.log({
    id: '@pbbbl/tester',
    sum: sum(1, 2),
})
