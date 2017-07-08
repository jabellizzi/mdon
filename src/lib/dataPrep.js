// Data Cleanse
export default function dataPrep(inputArray){
  var outputArray = [],
      i = 0;

  while(inputArray.length && i < 10000) {
    /* ==============================================================================================

      The structure of tags generally looks like this:
        - level n for the opening tag
        - level n + 1 for the content within the tag
        - level n for the closing tag

        The structure for tags that edit the text style (ex. <strong>) looks like this:
        - level n + 1 for the opening tag
        - level n + 1 for the content
        - level n for the closing tag

        In order to maintain consistency with the way in which data is nested, the initial <strong>
        tag is reduced by one to properly nest the inline content within it 

      ==============================================================================================*/

    if(inputArray[0].children){ // if element has children..
      if(inputArray[0].children.length > 1){ // ..and the # of children > 1..
        inputArray[0].children.forEach((child, i) =>{ // for each child..
          if(inputArray[0].children[i + 1]){ // if not on the last child..
            /* if we are looking at an opening tag (nesting = 1) and it shares the same level as its
                sibling, reduce the level on self */
            if((child.level === inputArray[0].children[i + 1].level) && child.nesting === 1) child.level -= 1;
          }
        })
      }
    }


    /* ==============================================================================================

      Handle Div seperators

      ============================================================================================== */
    if(inputArray[0].content.includes('class="graph"')){
      outputArray.pop(); // Get rid of last element in outputArray (p element)

      var j = 0;
      while(inputArray[0].children.length && j < 100){
        var child = inputArray[0].children[0];
        
        if(child.content.includes('<div')){
          child.attrs = [['class', 'graph']];
          if(child.content.includes('id=')){
            var ids = child.content.split('id=')[1].split('"')[1];
            child.attrs.push(['id', ids])
          }
          child.tag = 'div';
          child.type = 'div_open';
          child.nesting = 1;
          child.level = 0;
        }
        else if(child.content.includes('</div>')) {
          child.tag = 'div';
          child.type = 'div_close';
          child.nesting = -1;
          child.level = 0;
        }
        else {
          var source = child.attrs[0][1].split('/');
          var id = source[source.length - 1].split('.')[0];

          child.attrs.push(['class', 'img-responsive ' +id]);
          child.children = null;
          child.nesting = 1;
          child.level = 1;
        }

        if(inputArray[0].children[0].nesting != -1) outputArray.push(inputArray[0].children.shift());
        else inputArray[0].children.shift();
      }

      inputArray.shift();
      
    }
    else {
      if(inputArray[0].nesting != -1) outputArray.push(inputArray.shift());
      else inputArray.shift();
    }

    i++;
  }





  //   if(element.tag === 'h2' && element.nesting === 1){
  //     var h2Array = inputArray[elementIndex + 1].content.split(' ');
  //     var name = '';
  //     h2Array.forEach(function(word, i){
  //       if(i) name += '-';
  //       name += word.replace(/[^a-zA-Z]/g, '');
  //     })

  //     var attribute = ['name', name]
  //     if(element.attrs){
  //       element.attrs.push(attribute);
  //     } else element.attrs = [attribute];
  //   }

  //   outputArray.push(element)

  return outputArray;
}