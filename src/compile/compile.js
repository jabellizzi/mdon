import MarkdownIt from 'markdown-it';

import dataPrep from '../lib/dataPrep.js';
import nestData from '../lib/nestData.js';
import createChapter from '../lib/createChapter.js';
import applyClass from '../lib/applyClass.js';
import generateHTML from '../lib/generateHTML.js';

var md = new MarkdownIt();

export default function compileMarkdown(inputMarkdown){
  // =============== Testing ===============
  // var parse2 = md.parse(inputMarkdown);
  // dataPrep(parse2);
  // var nestedData2 = nestData(parse2);

  // =============== Markdown-It ===============
  // Parse input markdown using markdown-it
  var parse = md.parse(inputMarkdown);
    
  // =============== Data Conversion ===============
  /* Find opening tags that have same nesting value as inline 
      and update */
  var preppedData = dataPrep(parse);
  

  /* Nest all content into tags that contain them */
  var nestedData = nestData(preppedData);

  /* Nest data using special rules where <h1> represents the
      start of a chapter and <h2> represents a section within
      a chapter */
  var chapter = createChapter(nestedData);


  // =============== HTML ===============
  /* Convert json structure to HTML */
  var headerHtml = '',
      bodyHtml = '';
      
  headerHtml += generateHTML(chapter.header);
  chapter.sections.forEach((section) =>{
    bodyHtml += `<div id="section-${section.section}"`
    bodyHtml += 'class="section">'
    // if(section.content.length > 0){
    //   if(section.img && section.content[0].tag === 'ol'){
    //     bodyHtml += ' section-list">';
    //   } else bodyHtml += '">';
    // } else bodyHtml += '">';
    bodyHtml += `<div class="row">
          <div class="col-sm-6 col-md-6 col-lg-6 body-left">
    `;
    bodyHtml += generateHTML(section.content);
    bodyHtml += '</div>';

    if(section.graph){
      bodyHtml += '<div class="col-sm-6 col-md-6 col-lg-6 body-right">';
      bodyHtml += generateHTML(section.graph);
      bodyHtml += '</div>';
    }

    bodyHtml += '</div></div>';
  })

  return {
    header: headerHtml,
    body: bodyHtml
  };
}