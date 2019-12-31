export const moveItem = (from: number, to: number, list: any[]) => {
  // remove `from` item and store it
  const f = list.splice(from, 1)[0];
  // insert stored item into position `to`
  list.splice(to, 0, f);
};
