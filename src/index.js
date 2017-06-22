import MarkdownIt from 'markdown-it';
import chapter1 from './markdown-input/chapter101.js';

var md = new MarkdownIt();

var render = md.render(chapter1);
var parse = md.parse(chapter1);

console.log(render);
console.log(parse);

var object = {
  chapter: 1,
  content: []
};

parse.forEach((parsedItem, i) =>{
  if(parsedItem.nesting === 1){
    object.content.push({
      tag: parsedItem.tag,
      level: parsedItem.level
    })
  }
})

console.log(object);
// console.log(JSON.stringify(object));