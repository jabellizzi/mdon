import MarkdownIt from 'markdown-it';
import chapter1 from './markdown-input/chapter1.js';

import {adjustTagNesting} from './lib/dataPrep.js';
import nestData from './lib/nestData.js';
import createBook from './lib/createBook.js';
import applyClass from './lib/applyClass.js';
import applyStyle from './lib/applyStyle.js';
import generateHTML from './lib/generateHTML.js';

import './style.css';

var md = new MarkdownIt();

// Get div panes
// Get Body
var body = document.querySelector('body');

// Create left pane
var leftPane = document.createElement('div');
leftPane.setAttribute('id', 'left-pane');
// Create left textarea
var leftInput = document.createElement('textarea');
leftInput.classList.add('left-text-input');
leftInput.innerHTML = chapter1;
leftPane.appendChild(leftInput);

// // Create middle pane
// var middlePane = document.createElement('div');
// middlePane.setAttribute('id', 'middle-pane');
// // Create middle textarea
// var middleInput = document.createElement('textarea');
// middleInput.classList.add('middle-text-input');
// middlePane.appendChild(middleInput);

// Create right output pane
var rightPane = document.createElement('div');
rightPane.setAttribute('id', 'right-pane');
// Create right textarea
var rightInput = document.createElement('textarea');
rightInput.classList.add('right-text-input');

// Append panes to body
body.appendChild(leftPane);
// body.appendChild(middlePane);

leftInput.addEventListener('input', function(){
  var updatedMarkdown = leftInput.value;
  outputMarkdown(updatedMarkdown);
})

outputMarkdown(chapter1);

function outputMarkdown(inputMarkdown){
  // =============== Markdown-It ===============
  // Parse input markdown using markdown-it
  var parse = md.parse(inputMarkdown);
  var parse2 = md.parse(inputMarkdown);
  console.log(parse2);

  // Render HTML using markdown-it
  var render = md.render(inputMarkdown);
  // leftPane.innerHTML = render;

    
  // =============== Data Conversion ===============
  /* Find opening tags that have same nesting value as inline 
      and update */
  adjustTagNesting(parse);
  adjustTagNesting(parse2);


  /* Nest all content into tags that contain them */
  var nestedData = nestData(parse);
  var nestedData2 = nestData(parse2);
  console.log(nestedData2);

  /* Nest data using special rules where <h1> represents the
      start of a chapter and <h2> represents a section within
      a chapter */
  var book = createBook(nestedData);
  console.log(book);


  // =============== HTML ===============
  /* Convert json structure to HTML */
  var html = '';
  book.forEach((chapter) =>{
    html += generateHTML(chapter.header);
    chapter.sections.forEach((section) =>{
      html += generateHTML(section.content);
    })
  })

  rightInput.innerText = html;
  rightPane.appendChild(rightInput);
  
  body.appendChild(rightPane);
}

