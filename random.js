export function rand_range(start, end) {
  const minCeiled = Math.ceil(start);
  const maxFloored = Math.floor(end);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
