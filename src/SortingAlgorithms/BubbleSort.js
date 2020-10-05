export function getBubbleSortAnimation(array){
    const animations = [];
    const auxiliarayArray = array.slice();
    bubbleSort(auxiliarayArray, animations);
    console.log(auxiliarayArray)
    console.log(animations)
    return animations;
}

function bubbleSort(array, animations){
    let time = 0;
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length-i-1; j++){
            animations.push([0, j, j+1]);
            animations.push([0, j, j+1]);
            if(array[j]>array[j+1]){
                [array[j], array[j+1]] = [array[j+1], array[j]];    
                animations.push([1, j , array[j]]);
                animations.push([1, j , array[j]]);
                animations.push([1, j+1 , array[j+1]]);
                animations.push([1, j+1 , array[j+1]]);
            }
        }
    }
}