// Data Cleanse
function adjustTagNesting(inputArray){
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

  inputArray.forEach((element, elementIndex) =>{ // for each element..
    if(element.children){ // if element has children..
      if(element.children.length > 1){ // ..and the # of children > 1..
        element.children.forEach((child, i) =>{// for each child..
          if(element.children[i + 1]){// if not on the last child..
          /* if we are looking at an opening tag (nesting = 1) and it shares the same level as its
              sibling, reduce the level on self */
          if((child.level === element.children[i + 1].level) && child.nesting === 1) child.level -= 1;
          }
        })
      };

      element.children.forEach((child) =>{
        if(child.type === 'image'){
          child.nesting = 1;
          child.attrs[1][1] = child.content;
        }
      })
    };
  })

  return inputArray;
}

export {adjustTagNesting};