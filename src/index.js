import MarkdownIt from 'markdown-it';
import chapter1 from './markdown-input/chapter1.js';

var md = new MarkdownIt();

var render = md.render(chapter1);
var parse = md.parse(chapter1);

// console.log(render);
console.log(parse);

var object = {
  chapter: 1,
  content: []
};

parse.forEach((parsedItem, i) =>{ // Parse through each token
  /* each token has a nesting value of either 1, 0, or -1. 
      1 represents an opening tag
      0 represents the content within a tag
      -1 represents a closing tag */
  if(parsedItem.nesting === 1){ // if find opening tag
    var tag = parsedItem.tag,
        level = parsedItem.level,
        content = [], 
        children;
    
    // if the following token has content, store it
    if(parse[i + 1].nesting === 0){
      // content = parse[i + 1].content;

      // children = parse[i + 1].children;
      parse[i + 1].children.forEach((child, childElement) =>{
        var tempObj = {};
        if(child.nesting === 0){
          tempObj.text = child.content;
          if(parse[i + 1].children[childElement - 1]){
            if(parse[i + 1].children[childElement - 1].nesting === 1) tempObj.tag = parse[i + 1].children[childElement - 1].tag;
            else tempObj.tag = child.tag;
          } else tempObj.tag = child.tag;

          tempObj.attrs = child.attrs;
          content.push(tempObj);
        }

      })
    }

    object.content.push({
      tag: tag,
      level: level,
      content: content
      // children: children
    })
  }
})

console.log(object);

// Recursive Function
/* Using the shift() function on the array of elements to pull from the input array. */
function nestData(inputArray, currentLevel){
  var outArray = [],
      outArrayIndex = 0,
      i = 0;

  while(inputArray.length && i < 10000){ // while array still has elements within..
    if(inputArray[0].level === currentLevel){ // if element is at current level
      outArray.push(inputArray.shift()); // shift the first element out 
      outArrayIndex++; // increase the array index counter
    }
    else if(inputArray[0].level > currentLevel){ // if not at current level..
      /* call nestData() on remaining array. the level that is passed is now one level deeper.
          when the level gets back to being less than the level of the scope, the recursive 
          function will break back out. the sub-nested data that gets returned from calling
          the recursive function gets stored within the previous element's content */
      outArray[outArrayIndex - 1].content = nestData(inputArray, inputArray[0].level);
    } else break;

    i++; // Failsafe to ensure while loop exits
  }

  return outArray;
}

var nestedData = nestData(object.content, 0);

console.log(nestedData);