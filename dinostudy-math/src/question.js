
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Make nums global or outside the function

export function tileNums() {
  // Check if there are still numbers left in the array
  if (nums.length === 0) {
    // Optionally, reset the array if all numbers have been picked
    nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  // Randomly pick an index from the available numbers
  const randomIndex = Math.floor(Math.random() * nums.length);

  // Get the number at the random index
  const pickedNumber = nums[randomIndex];

  // Remove the picked number from the array to ensure it's not picked again
  nums.splice(randomIndex, 1);

  return pickedNumber;
}
