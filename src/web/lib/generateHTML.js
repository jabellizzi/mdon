export default function generateHTML(input){
  var outString = '';

  input.forEach((element) =>{ // for each element..
    if(Array.isArray(element.content)){ // if element's content is an array..
      outString += '<' +element.tag; // Element will be a tag element

      /* add any classes that exist for this element */
      if(element.classList.length){
        outString += ' class="';
        element.classList.forEach((className) =>{
          outString += className +' ';
        })
        outString += '"';
      };

      /* add any styles that exist for this element */
      if(element.styleList.length){
        outString += ' style="';
        element.styleList.forEach((style) =>{
          outString += style.style +':' +style.definition +';';
        })
        outString += '"';
      };

      /* add any attributes that exist for this element */
      if(element.attrs) if(element.attrs.length){
        element.attrs.forEach((attr) =>{
          outString += ' ' +attr[0] +'="' +attr[1] +'"';
        })
      }

      outString += '>'; // close out the opening tag
      outString += generateHTML(element.content); // insert nested content within tag
      outString += '</' +element.tag +'>'; // add closing tag
    } else{ // element's content is not an array
      outString += element.content;
    }
  })

  return outString;
}