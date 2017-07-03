if(process.argv.length < 3){
  // console.log('input file source to convert');
  // process.exit(1);
  var filename = 'markdown-input/101. What Are Extensions.md'
} else var filename = process.argv[2];

var fs = require('fs'),
    classJSON = 'styles/classes.json',
    styleJSON = 'styles/styles.json',
    fileOutput = 'html-output/101-what-are-extensions.html';

import MarkdownIt from 'markdown-it';

import {adjustTagNesting} from './lib/dataPrep.js';
import nestData from './lib/nestData.js';
import createBook from './lib/createBook.js';
import applyClass from './lib/applyClass.js';
import applyStyle from './lib/applyStyle.js';
import generateHTML from './lib/generateHTML.js';


fs.readFile(filename, 'utf8', function(err, markdownData){
  if(err) throw err;
fs.readFile(classJSON, 'utf8', function(err, classString){
  if(err) throw err;
  var classes = JSON.parse(classString);
fs.readFile(styleJSON, 'utf8', function(err, styleString){
  if(err) throw err;
  var styles = JSON.parse(styleString);
  // =============== Markdown-It ===============
  // Parse input markdown using markdown-it
  var md = new MarkdownIt();
  var parse = md.parse(markdownData);
  
    
  // =============== Data Conversion ===============
  /* Find opening tags that have same nesting value as inline 
      and update */
  adjustTagNesting(parse);


  /* Nest all content into tags that contain them */
  var nestedData = nestData(parse);

  /* Nest data using special rules where <h1> represents the
      start of a chapter and <h2> represents a section within
      a chapter */
  var book = createBook(nestedData);


  /* Apply classes to elements */
  book.forEach((chapter) =>{
    applyClass(chapter.content, classes); 
    chapter.sections.forEach((section) =>{
      applyClass(section.content, classes);
    })
  })


  /* Apply styles to elements */
  book.forEach((chapter) =>{
    applyStyle(chapter.content, styles);
    chapter.sections.forEach((section) =>{
      applyStyle(section.content, styles);
    })
  })


  // =============== HTML ===============
  /* Convert json structure to HTML */
  var html = '';
  book.forEach((chapter) =>{
    html += generateHTML(chapter.content);
    chapter.sections.forEach((section) =>{
      html += generateHTML(section.content);
    })
  })
  

  // =============== Output ===============
  fs.writeFile(fileOutput, html, function(err){
    if(err) throw err;
  });
})})})