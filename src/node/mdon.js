if(process.argv.length < 3){
  // console.log('input file source to convert');
  // process.exit(1);
  var filename = 'markdown-input/101. What Are Extensions.md'
} else var filename = process.argv[2];

var fs = require('fs'),
    fileHeaderOutput = 'html-output/101-what-are-extensions-header.html',
    fileBodyOutput = 'html-output/101-what-are-extensions-body.html';

import compileMarkdown from '../compile/compile.js';


fs.readFile(filename, 'utf8', function(err, markdownData){
  if(err) throw err;

  var html = compileMarkdown(markdownData);

  // =============== Output ===============
  fs.writeFile(fileHeaderOutput, html.header, function(err){
    if(err) throw err;
  });
  fs.writeFile(fileBodyOutput, html.body, function(err){
    if(err) throw err;
  });
})