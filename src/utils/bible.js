const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const shuffle = (array, rng) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const shuffle2 = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const findVerse = (index, bible, isCorrect) => {
  index--;
  let acc = 0;
  let bookIndex = 0;
  while (acc < index && bookIndex < bible.length) {
    acc = bible[bookIndex].acc;
    if (acc >= index) break;
    bookIndex++;
  }

  let book = bible[--bookIndex];
  acc = book.acc;
  let chapterIndex = 0;
  while (acc < index && chapterIndex < book.chapters.length) {
    acc = book.chapters[chapterIndex].acc;
    if (acc >= index) break;
    chapterIndex++;
  }

  let chapter = book.chapters[--chapterIndex];
  acc = chapter.acc;

  return {
    index: index,
    book: book.name,
    chapter: chapter.number,
    verse: index - acc,
    ref: capitalize(`${book.name} ${chapter.number}:${index - acc}`),
    text: chapter.verses[index - acc],
    selected: false,
    isCorrect,
  };
};
