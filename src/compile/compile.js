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
  // var preppedData2 = dataPrep(parse2);
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
    var ids = '';
    section.graph[0].attrs.forEach((attr) =>{
      if(attr[0] === 'id') ids += attr[1];
    })
    bodyHtml += `<div id="section-${section.section}"`
    bodyHtml += `class="section ${ids}">`

    if(section.graph){
      // if more than just a class is set in attributes, give width of 6
      if(section.graph[0].attrs.length > 1){
        /* Give left width of 6 */
        bodyHtml += `<div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 body-left">
        `;
        bodyHtml += generateHTML(section.content);
        bodyHtml += '</div>';

        /* Give right width of 6 */
        bodyHtml += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 body-right">';
        bodyHtml += generateHTML(section.graph);
        bodyHtml += '</div>';
      }
      // Otherwise, give 0
      else {
        /* Give left width of 6 and offset by 3*/
        bodyHtml += `<div class="row">
              <div class="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 body-left">
        `;
        bodyHtml += generateHTML(section.content);
        bodyHtml += '</div>';

        /* Give right width of 0 */
        bodyHtml += '<div class="col-xs-0 col-sm-0 col-md-0 col-lg-0 body-right">';
        bodyHtml += generateHTML(section.graph);
        bodyHtml += '</div>';
      }
    }

    bodyHtml += '</div></div>';
  })

  return {
    header: headerHtml,
    body: bodyHtml
  };
}