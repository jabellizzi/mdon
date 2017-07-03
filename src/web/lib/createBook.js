export default function createBook(nestedData){
  // Convert content into book/chapter hierarchy
  /* Inputting array of nested elements. Enter nestedData array into
      a while loop. for every iteration will shift() a value out of 
      the array, and will repeat until the array is empty */
  var book = [],
      i = 0;

  while(nestedData.length && i < 10000){ // while there are still values in array..
    /* Get current length of book and current length of sections with current book */
    var bookIndex = book.length - 1;
    if(book[bookIndex]) var sectionIndex = book[bookIndex].sections.length - 1;
    else var sectionIndex = 0;

    /* If we reach an h1 tag, create a new chapter for the book. This content will
        be a part of the header of the page. */
    if(nestedData[0].tag === 'h1'){
      book.push({
        chapter: book.length + 1,
        title: nestedData[0].content[0].content,
        header: [nestedData.shift()],
        sections: []
      })
    }

    /* If we reach an img tag, create a new section within the chapter. The image
        content will be stored in the img object and the pertinent left pane text
        will be stored in the content array */
    else if(nestedData[0].tag === 'img'){
      book[bookIndex].sections.push({
        section: book[bookIndex].sections.length,
        img: [nestedData.shift()],
        content: []
      });

      /* Normally, an h2 tag will create a new section in the chapter. If an h2 tag
          immediately follows an img tag, we want to shift it out of the array and
          place it within the content of the image we just pulled */
      if(nestedData[0].tag === 'h2'){
        book[bookIndex].sections[book[bookIndex].sections.length - 1].content.push(nestedData.shift())
      }

      /* If we have an ol with associated img, the following tag should always start
          a new section */
      if(nestedData[0].tag === 'ol'){
        book[bookIndex].sections[book[bookIndex].sections.length - 1].content.push(nestedData.shift());

        if(nestedData[0].tag != 'img'){
          book[bookIndex].sections.push({
            section: book[bookIndex].sections.length,
            content: [nestedData.shift()]
          })
        }
      }
    }

    /* If we reach an h2 tag, create a new section. This will be triggered whenever
        we have an h2 that doesn't have an image associated with it */
    else if(nestedData[0].tag === 'h2'){
      book[bookIndex].sections.push({
        section: book[bookIndex].sections.length,
        content: [nestedData.shift()]
      })
    }

    /* All other content gets stored in whatever section of the book we are currently at. */
    else {
      if(book[bookIndex].sections.length > 0) 
        book[bookIndex].sections[sectionIndex].content.push(nestedData.shift());
      else book[bookIndex].header.push(nestedData.shift());
    }

    i++;
  }

  return book;
}