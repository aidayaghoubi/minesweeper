function checkAroundButton(fx) {
  const row = Number(fx[0])
  const column = Number(fx[2])
  const bottomList = createBottom(row, column)
  const topList = createTop(row, column)
  const lineList = createRightAndLeft(row, column)
  const finalList = [...bottomList, ...topList, ...lineList].filter(el => Boolean)
  return finalList
}
export default checkAroundButton


function createBottom(row, column) {
  const BottomList = []
  const newRow = row + 1
  if (newRow === 10) {
    return []
  } else {
    BottomList.push(`${newRow}-${column}`)
    const leftCol = column - 1
    const rightCol = column + 1
    if (leftCol >= 0 && leftCol <= 9) {
      BottomList.push(`${newRow}-${leftCol}`)
    }
    if (rightCol >= 0 && rightCol <= 9) {
      BottomList.push(`${newRow}-${rightCol}`)
    }
  }
  return BottomList
}
function createTop(row, column) {
  const TopList = []
  const newRow = row - 1
  if (newRow < 0) {
    return []
  } else {
    TopList.push(`${newRow}-${column}`)
    const leftCol = column - 1
    const rightCol = column + 1
    if (leftCol >= 0 && leftCol <= 9) {
      TopList.push(`${newRow}-${leftCol}`)
    }
    if (rightCol >= 0 && rightCol <= 9) {
      TopList.push(`${newRow}-${rightCol}`)
    }
  }
  return TopList
}
function createRightAndLeft(row, column) {
  const lineList = []
  const rightCol = column + 1
  const leftCol = column - 1
  if (rightCol >= 0 && rightCol <= 9) {
    lineList.push(`${row}-${rightCol}`)
  }
  if (leftCol >= 0 && leftCol <= 9) {
    lineList.push(`${row}-${leftCol}`)
  }
  return lineList
}