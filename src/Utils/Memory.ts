/**
 * Describes a readonly memory slice of an array. 
 */
export interface ReadonlyMemory<T> {
  /**
   * Used to read data from this memory slice.
   * @param index Index of an item relative to the start of the slice.
   */
  get(index: number): T;

  /**
   * Length of this readonly memory slice.
   */
  length: number;
}

/**
 * Creates a readonly memory slice of an array without copying its contents.
 * @param arr The array to be sliced.
 * @param from Starting index of the slice.
 * @param to Ending index of the slice.
 * @returns The readonly memory slice.
 */
export function slice<T = unknown>(arr: T[], from = 0, to = arr.length): ReadonlyMemory<T> {
  if (to < 0) to = arr.length - to;
  if (to > arr.length) to = arr.length;

  return {
    get(index) {
      return arr[index + from];
    },

    get length(): number {
      return to - from;
    },
  };
}
