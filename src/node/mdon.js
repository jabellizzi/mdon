if(process.argv.length < 3){
  // console.log('input file source to convert');
  // process.exit(1);
  var filename = 'dist-mdon/markdown-input/101. What Are Extensions.md'
} else var filename = process.argv[2];

var fs = require('fs'),
    fileHeaderOutput = 'dist-mdon/html-output/chapter1-header.ejs',
    fileBodyOutput = 'dist-mdon/html-output/chapter1-body.ejs';

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