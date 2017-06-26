export default function applyStyle(inputArray, styleArray){
  if(Array.isArray(inputArray)){
    inputArray.forEach((element) =>{
      applyStyle(element.content, styleArray);
      styleArray.forEach((styleObject) =>{
        if(element.tag === styleObject.tag){
          styleObject.styleDefinitions.forEach((inlineStyle) =>{
            element.styleList.push(inlineStyle);
          })
        }
      })
    })
  }
}