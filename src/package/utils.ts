export function random(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
