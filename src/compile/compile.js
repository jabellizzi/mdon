import MarkdownIt from 'markdown-it';

import {adjustTagNesting} from '../lib/dataPrep.js';
import nestData from '../lib/nestData.js';
import createBook from '../lib/createBook.js';
import applyClass from '../lib/applyClass.js';
import applyStyle from '../lib/applyStyle.js';
import generateHTML from '../lib/generateHTML.js';

var md = new MarkdownIt();

export default function compileMarkdown(inputMarkdown){
  // =============== Markdown-It ===============
  // Parse input markdown using markdown-it
  var parse = md.parse(inputMarkdown);

    
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


  // =============== Class ===============
  var classList = [{
    tag: 'img',
    className: 'img-responsive'
  }]

  book.forEach((chapter) =>{ 
    chapter.sections.forEach((section) =>{
      applyClass(section.img, classList);
    })
  })


  // =============== HTML ===============
  /* Convert json structure to HTML */
  var headerHtml = '',
      bodyHtml = '';
  book.forEach((chapter) =>{
    headerHtml += generateHTML(chapter.header);
    chapter.sections.forEach((section) =>{
      bodyHtml += `<div id="section-${section.section}"`
      bodyHtml += 'class="section'
      if(section.img && section.content[0].tag === 'ol'){
        bodyHtml += ' section-list">';
      } else bodyHtml += '">';
      bodyHtml += `<div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 body-left">
      `;
      bodyHtml += generateHTML(section.content);
      bodyHtml += '</div>';

      if(section.img){
        bodyHtml += '<div class="col-sm-6 col-md-6 col-lg-6 body-right">';
        bodyHtml += generateHTML(section.img);
        bodyHtml += '</div>';
      }

      bodyHtml += '</div></div>';
    })
  })

  return {
    header: headerHtml,
    body: bodyHtml
  };
}