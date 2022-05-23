// containerElement can has 3 states empty,active,dropped
export const createBorder = (column = 7, row = 7) => {
  const containerSchema = Array.from({ length: row }).map((el, rowIndex) =>
    Array.from({ length: column }).map(
      (el, columnIndex) =>
        (el = { rowIndex: rowIndex, columnIndex: columnIndex, state: "empty" })
    )
  );
  containerSchema[Math.floor(column / 2)][Math.floor(row / 2)].state = "active";
  return containerSchema;
};
