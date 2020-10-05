export function getMergeSortAnimation(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    const mainArray = array.slice();
    mergeSortHelper(mainArray, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if(startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx)/2);
    mergeSortHelper(auxiliaryArray, startIdx, midIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, midIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray, animations)
}

function doMerge(
    mainArray,
    startIdx,
    midIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = midIdx +1;
    while(i <= midIdx && j <= endIdx){
        //Push two comparing indices to the animations array
        //fist push to change the color to SECONDARY_COLOR 
        animations.push([i, j]);
        //second to change back to PRIMARY_COLOR
        animations.push([i, j]);
        if(auxiliaryArray[i] <= auxiliaryArray[j]){
            //Push the index and its new height to the animations array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++]
        }
    }

    //When one sub-array has done its traversal
    while(i <= midIdx){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while(j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}