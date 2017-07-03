export default function applyClass(inputArray, classArray){
  if(Array.isArray(inputArray)){
    inputArray.forEach((element) =>{
      applyClass(element.content, classArray);
      classArray.forEach((classObject) =>{
        if(element.tag === classObject.tag){
          if(element.classList.indexOf(classObject.className) === -1){
            element.classList.push(classObject.className);
          }
        }
      })
    })
  }
}