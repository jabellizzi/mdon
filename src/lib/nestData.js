function nestData(inputArray){
    // Data Cleanse
    /* The structure of tags generally looks like this:
        - level n for the opening tag
        - level n + 1 for the content within the tag
        - level n for the closing tag

        The structure for tags that edit the text style (ex. <strong>) looks like this:
        - level n + 1 for the opening tag
        - level n + 1 for the content
        - level n for the closing tag

        In order to maintain consistency with the way in which data is nested, the initial <strong>
        tag is reduced by one to properly nest the inline content within it */

    inputArray.forEach((element) =>{ // for each element..
        if(element.children){ // if element has children..
            if(element.children.length > 1){ // ..and the # of children > 1..
            element.children.forEach((child, i) =>{// for each child..
                if(element.children[i + 1]){// if not on the last child..
                /* if we are looking at an opening tag (nesting = 1) and it shares the same level as its
                    sibling, reduce the level on self */
                if((child.level === element.children[i + 1].level) && child.nesting === 1) child.level -= 1;
                }
            })
            }
        }
    })
    return recursiveNest(inputArray, 0);

    // Recursive Function
    /* This recursive function takes in an array of values and nests inline content within their
        appropriate html element. The format of the incoming data is:
        inputArray = [
            {
            tag: 'h1',
            content: null,
            nesting: 1, // represents opening tag
            level: 0
            }, {
            tag: null,
            content: 'Title',
            attrs: attrs,
            nesting: 0, // represents inline content
            level: 1
            }, {
            tag: 'h1',
            content: null,
            nesting: -1, // represents closing tag
            level: 0
            }
        ];

        The desired output is:
        outputArray = [
            {
            tag: 'h1',
            content: [
                {
                tag: null,
                content: 'Title',
                attrs: attrs
                }
            ]
            }
        ] 
        
        The function works by shifting (using the shift() function) the 
        first item out of the array and storing it in a new structured 
        array based on its level and nesting. This is done until there 
        are no items left in the array. */

    function recursiveNest(inputArray, currentLevel){
        var outArray = [],
            i = 0;
            
        while(inputArray.length && i < 10000){
            if(inputArray[0].level === currentLevel){ // if at current level..

            // if closing tag, trash the element as we don't need it
            if(inputArray[0].nesting === -1) inputArray.shift(); // -1 Closing Tag

            // else if opening tag, store the tag and an empty content array
            else if(inputArray[0].nesting === 1){ // 1 Opening Tag
                var tempItem = inputArray.shift();
                var tempObject = {
                content: [],
                tag: tempItem.tag
                }
                outArray.push(tempObject);
            }

            // else if inline content, store the attrs, content, and tag
            else{ // 0 Inline Content
                var tempItem = inputArray.shift();
                if(tempItem.tag.length < 1) tempItem.tag = null;
                var tempObject = {
                attrs: tempItem.attrs,
                content: tempItem.content,
                tag: tempItem.tag
                }

                outArray.push(tempObject);
            }
            }
            
            /* if we are at a deeper level, we will call recursiveNest() again on the
                current remaining inputArray, and the returned nested data set
                will be passed into the content of the previous element (which
                is the parent) */
            else if(inputArray[0].level > currentLevel){ // Deeper Level

            if(inputArray[0].children){// if there are children, nest the children
                outArray[outArray.length - 1].content = recursiveNest(inputArray[0].children, inputArray[0].children[0].level);
                inputArray.shift();
            } else{// else, just nest the rest of this subset of the element
                outArray[outArray.length - 1].content = recursiveNest(inputArray, inputArray[0].level);
            }
            }
            
            /* Once we reach a point when the item we retrieve from the array has a level
                with a lower number than the level we entered the array with, it is time
                to break out of the nest loop as we have nested everything in this level */
            else break;

            i++;
        }

        return outArray;
    }
}



export default nestData;