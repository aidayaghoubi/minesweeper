function Empty({ value }) {
  const color = value === 1 ? "blue" : value === 2 ? "green" : "red"
  return <button className="empty icons">
    {value === "empty" ? "" : <span style={{ color: color }}>{value}</span>}
  </button>
}
export default Empty