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

export const findVerseByReference = (indexbook, indexchapter, indexverse, bible) => {
  let book = bible[indexbook];
  let chapter = book.chapters[indexchapter];
  let verse = chapter[indexverse];
  let index = book.chapters[indexchapter].acc + indexverse;

  return {
    index: index + 1,
    book: book.name,
    chapter: chapter.number,
    verse: indexverse + 1,
    ref: capitalize(`${book.name} ${chapter.number}:${indexverse + 1}`),
    text: verse,
  };
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
    text: chapter.verses[index - acc - 1],
    selected: false,
    isCorrect,
  };
};

const hardSingleOption = (book, rng, min, max, bible) => {
  let index = Math.floor(rng() * min) + max;
  let verse = findVerse(index, bible, false);

  while (verse.book == book && rng() > 0.1) {
    index = Math.floor(rng() * min) + max;
    verse = findVerse(index, bible, false);
  }

  return verse;
};

export const hardOptions = (verse, rng, bible) => {
  const verseindex = verse.index;
  const versebook = verse.book;

  const lenPentateuco = 5851;
  const lenHistoricos1 = 2867;
  const lenHistoricos2 = 685;
  // const lenReisCronicas = 3299
  const lenPoeticos = 4951;
  // const lenProfMaiores = 4439
  // const lenProfMenores = 1049
  const lenEvangelhos = 4782;
  const lenCartas = 3172;
  const lenAT = 23147;
  const lenNT = 7954;
  const lenBiblia = 31103;

  if (verseindex <= 5851) {
    // pentateuco
    return [
      hardSingleOption(versebook, rng, lenPentateuco, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 8719) {
    // historicos 1
    return [
      hardSingleOption(versebook, rng, lenHistoricos1, 5852, bible),
      hardSingleOption(versebook, rng, lenHistoricos2, 12020, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 12019) {
    // reis & cronicas
    return [
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 12705) {
    // historicos 2
    return [
      hardSingleOption(versebook, rng, lenHistoricos1, 5852, bible),
      hardSingleOption(versebook, rng, lenHistoricos2, 12020, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 17657) {
    // poeticos
    return [
      hardSingleOption(versebook, rng, lenPoeticos, 12706, bible),
      hardSingleOption(versebook, rng, lenPoeticos, 12706, bible),
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 22097) {
    // profetas maiores
    return [
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 23147) {
    // profetas menores
    return [
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenAT, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else if (verseindex <= 27930) {
    // evangelhos
    return [
      hardSingleOption(versebook, rng, lenEvangelhos, 23148, bible),
      hardSingleOption(versebook, rng, lenNT, 23148, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  } else {
    // cartas
    return [
      hardSingleOption(versebook, rng, lenCartas, 27931, bible),
      hardSingleOption(versebook, rng, lenCartas, 27931, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
      hardSingleOption(versebook, rng, lenBiblia, 0, bible),
    ];
  }
};

/*
pentateuco 
    0 -  5851 = 5851

historicos
 5852 -  8719 = 2867
12020 - 12705 =  685

reis & cronicas
 8720 - 12019 = 3299

poeticos
12706 - 17657 = 4951

profetas maiores
17658 - 22097 = 4439

profetas menores
22098 - 23147 = 1049

evagelhos
23148 - 27930 = 4782

cartas
27931 - 31103 = 3172
*/
