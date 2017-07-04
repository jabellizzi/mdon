export default function createChapter(nestedData){
  // Convert content into book/chapter hierarchy
  /* Inputting array of nested elements. Enter nestedData array into
      a while loop. for every iteration will shift() a value out of 
      the array, and will repeat until the array is empty */
  var chapter = {
        sections: []
      },
      i = 0;

  while(nestedData.length && i < 10000){
    var sectionIndex = chapter.sections.length;

    if(nestedData[0].tag === 'h1'){
      chapter.title = nestedData[0].content[0].content;
      chapter.header = [nestedData.shift()];
    } else if(nestedData[0].tag === 'div'){
      chapter.sections.push({
        section: sectionIndex,
        graph: [nestedData.shift()],
        content: []
      })
    } else {
      if(sectionIndex > 0) chapter.sections[sectionIndex - 1].content.push(nestedData.shift());
      else chapter.header.push(nestedData.shift());
    }

    i++;
  }

  return chapter;
}