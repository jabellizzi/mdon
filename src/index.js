import MarkdownIt from 'markdown-it';
import chapter1 from './markdown-input/chapter1.js';

import nestData from './lib/nestData.js';

var md = new MarkdownIt();
var parse = md.parse(chapter1);

var nestedData = nestData(parse);
console.log(nestedData);

