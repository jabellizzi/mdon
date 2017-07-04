var fs = require('fs'),
    path = require('path');

import compileMarkdown from '../compile/compile.js';

fs.readFile('./path.json', 'utf8', (err, directories) =>{
  var directoryObj = JSON.parse(directories);
  
  var markdownPath = directoryObj.input,
      htmlOutputDir = directoryObj.output;

  if(!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir);

  fs.readdir(markdownPath, function(err, files){
    if(err) throw err;

    files.forEach((file) =>{
      if(path.extname(file) === '.md'){
        fs.readFile(markdownPath +'/' +file, 'utf8', (err, markdownData) =>{
          if(err) throw err;
          var filename = file.split('.md')[0];
          if(!fs.existsSync(htmlOutputDir +'/' +filename)) fs.mkdirSync(htmlOutputDir +'/' +filename);

          var html = compileMarkdown(markdownData);
          
          fs.writeFile(htmlOutputDir +'/' +filename +'/' +filename +'-header.ejs', html.header, (err) =>{
            if(err) throw err;
          });
          fs.writeFile(htmlOutputDir +'/' +filename +'/' +filename +'-body.ejs', html.body, (err) =>{
            if(err) throw err;
          })
        })
      }
    })
  })
})