export default function createBook(nestedData){
  // Convert content into book/chapter hierarchy
  var book = [];

  nestedData.forEach((element) =>{
    var bookIndex = book.length - 1;
    if(book[bookIndex]) var sectionIndex = book[bookIndex].sections.length - 1;
    else var sectionIndex = 0;

    if(element.tag === 'h1'){
      book.push({
        chapter: book.length + 1,
        title: element.content[0].content,
        content: [element],
        sections: []
      })
    } else if(element.tag === 'h2'){
      book[bookIndex].sections.push({
        section: book[bookIndex].sections.length + 1,
        title: element.content[0].content,
        content: [element]
      })
    } else{
      if(book[bookIndex].sections.length > 0) book[bookIndex].sections[sectionIndex].content.push(element);
      else book[bookIndex].content.push(element);
    }
  })

  return book;
}