export function getQuickSortAnimation(array){
    const animations = [];
    if (array.length <= 1) return array;

    const auxiliaryArray = array.slice();
    QuickSort(auxiliaryArray, animations);
    
    return animations;
}

// Find a "pivot" element in the array to compare all other
// elements against and then shift elements before or after
// pivot depending on their values
function QuickSort(arr, animations, left = 0, right = arr.length - 1) {
    let len = arr.length,
        index
  
    if(len > 1) {
  
      index = partition(arr, animations, left, right)
  
      if(left < index - 1) {
        QuickSort(arr, animations, left, index - 1)
      } 
  
      if(index < right) {
        QuickSort(arr, animations, index, right)
      }
  
    }
  
    return arr
  
  }
  
  function partition(arr, animations, left, right) {
    let middle = Math.floor((right + left) / 2),
        pivot = arr[middle],
        i = left,                 // Start pointer at the first item in the array
        j = right                 // Start pointer at the last item in the array
    
    while(i <= j) {
  
      // Move left pointer to the right until the value at the
      // left is greater than the pivot value
      while(arr[i] < pivot) {
        i++
        animations.push([0, i, middle]);
        animations.push([0, i, middle]);
      }
  
      // Move right pointer to the left until the value at the
      // right is less than the pivot value
      while(arr[j] > pivot) {
        j--
        animations.push([0, j, middle]);
        animations.push([0, j, middle]);
      }
  
      // If the left pointer is less than or equal to the 
      // right pointer, then swap values
      if(i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]  // ES6 destructuring swap
        animations.push([1, i, arr[i]]);
        animations.push([1, i, arr[i]]);
        animations.push([1, j, arr[j]]);
        animations.push([1, j, arr[j]]);
        i++
        j--
      }
    }
  
    return i
  
  }