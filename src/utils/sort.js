//sort the data
export const sortCharacters = (type, characters) => {
  characters.sort((item1, item2) => {
    if (item1.character > item2.character) {
      return 1;
    }
    if (item1.character < item2.character) {
      return -1;
    }
    return 0;
  });

  if (type === "za") {
    characters.reverse();
  }
};
