function createRandomBombs() {
  const list = [];
  while (list.length < 15) {
    const random1 = Math.round(Math.random(1, 9) * 10)
    const random2 = Math.round(Math.random(1, 9) * 10)
    const createItem = `${random1 === 10 ? 9 : random1}-${random2 === 10 ? 9 : random2}`
    if (!list.includes(createItem)) {
      list.push(createItem)
    }
  }
  return list
}

export default createRandomBombs
