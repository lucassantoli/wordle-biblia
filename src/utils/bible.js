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
    text: chapter.verses[index - acc - 1],
    selected: false,
    isCorrect,
  };
};

export const hardOptions = (verse, rng) => {
  const verseindex = verse.index;

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
      Math.floor(rng() * lenPentateuco) + 0,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 8719) {
    // historicos 1
    return [
      Math.floor(rng() * lenHistoricos1) + 5852,
      Math.floor(rng() * lenHistoricos2) + 12020,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 12019) {
    // reis & cronicas
    return [
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 12705) {
    // historicos 2
    return [
      Math.floor(rng() * lenHistoricos1) + 5852,
      Math.floor(rng() * lenHistoricos2) + 12020,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 17657) {
    // poeticos
    return [
      Math.floor(rng() * lenPoeticos) + 12706,
      Math.floor(rng() * lenPoeticos) + 12706,
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 22097) {
    // profetas maiores
    return [
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 23147) {
    // profetas menores
    return [
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenAT) + 0,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else if (verseindex <= 27930) {
    // evangelhos
    return [
      Math.floor(rng() * lenEvangelhos) + 23148,
      Math.floor(rng() * lenNT) + 23148,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
    ];
  } else {
    // cartas
    return [
      Math.floor(rng() * lenCartas) + 27931,
      Math.floor(rng() * lenCartas) + 27931,
      Math.floor(rng() * lenBiblia),
      Math.floor(rng() * lenBiblia),
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
