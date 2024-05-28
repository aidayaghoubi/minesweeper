export function checkBombCount(bomb, list) {
  let counter = 0;
  list.forEach(element => {
    if (bomb.includes(element)) {
      counter++;
    }
  });

  return counter
}