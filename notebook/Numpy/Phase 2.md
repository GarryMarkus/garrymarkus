# NumPy Array Operations

This module focuses on intermediate to advanced array manipulations utilizing the NumPy library. Mastering these operations is essential for efficient data analysis, as they allow for rapid subset extraction, logical filtering, and structural modification of multidimensional datasets without relying on slow, iterative loops.

## 1. Array Slicing and Indexing

NumPy provides powerful syntax for extracting specific subsets of data from both 1-dimensional and 2-dimensional arrays using index positions and step parameters.

**Worked Examples / Practice**

(Given a 1D base array: `arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` )

- **Result:** Applying basic slicing via `arr[2:7]` yields `[3 4 5 6 7]`.
    
    - **Technical Deduction:** Slicing is inclusive of the start index and exclusive of the end index.
        
- **Result:** Slicing with a defined step via `arr[1:8:2]` yields `[2 4 6 8]`.
    
- **Result:** Extracting with a negative index via `arr[-3]` yields `8`.
    

(Given a 2D base array: `arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])` )

- **Result:** Selecting a specific element using coordinate indexing `arr_2d[1, 2]` extracts the integer `6`.
    
- **Result:** Extracting an entire row using `arr_2d[1]` returns `[4 5 6]`.
    
- **Result:** Extracting an entire column using slice notation `arr_2d[:, 1]` returns `[2 5 8]`.
    

## 2. Sorting Arrays

NumPy includes native functions to logically order the internal elements of an array.

**Worked Examples / Practice**

- **Result:** Executing `np.sort(unsorted)` on a 1D array `[3, 1, 4, 1, 5, 9, 2, 6]` returns `[1 1 2 3 4 5 6 9]`.
    
- **Result:** Executing `np.sort(arr_2d_unsorted, axis=0)` on a 2D array `[[3, 1], [1, 2], [2, 3]]` results in `[[1 1], [2 2], [3 3]]`.
    

> **Technical Depth Injection:** In a 2D array environment, explicitly passing the parameter `axis=0` forces the sorting algorithm to evaluate elements vertically across the columns rather than horizontally across the rows.

## 3. Filtering and Boolean Masking

Elements can be dynamically extracted by evaluating them against specific logical conditions.

**Worked Examples / Practice**

(Given base array: `numbers = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` )

- **Result:** Applying an inline modulo filter `numbers[numbers % 2 == 0]` returns `[2 4 6 8 10]`.
    
- **Result:** Generating an explicit logical mask `mask = numbers > 5` and applying it via `numbers[mask]` extracts `[6 7 8 9 10]`.
    

## 4. Advanced Selection: Fancy Indexing vs. np.where()

Beyond basic boolean masking, NumPy provides advanced indexing tools for precise data point retrieval or conditional transformation.

- **Fancy Indexing**: The process of extracting multiple specific elements by passing a discrete list of index integers into the array brackets, such as `numbers[indices]`.
    
- **np.where()**: A conditional function that parses an array and either returns the explicit indices of elements meeting a condition or applies a ternary-like transformation.
    

**Worked Examples / Practice**

- **Result:** Using `np.where(numbers > 5)` returns a tuple of the corresponding index positions: `(array([5, 6, 7, 8, 9]),)`.
    
    - **Technical Deduction:** This tuple can be passed straight into the original array as `numbers[where_result]` to output the raw integer values `[6 7 8 9 10]`.
        
- **Result:** Utilizing `np.where` for data transformation via `np.where(numbers > 5, "true", "false")` returns `['false' 'false' 'false' 'false' 'false' 'true' 'true' 'true' 'true' 'true']`.
    

## 5. Adding, Removing, and Shaping Data

Arrays can be structurally combined or reduced using dedicated NumPy manipulation functions.

|**Operation**|**Implementation Syntax**|**Operational Result**|
|---|---|---|
|**Check Compatibility**|`a.shape == b.shape`|Evaluates to `False` if dimensional shapes do not strictly align.|
|**Concatenate**|`np.concatenate((arr1, arr2))`|Merges two 1D arrays end-to-end, producing `[1 2 3 4 5 6]`.|
|**Vertical Stack**|`np.vstack((original, new_row))`|Appends row `[[5, 6]]` beneath the original matrix to form `[[1 2], [3 4], [5 6]]`.|
|**Horizontal Stack**|`np.hstack((original, new_col))`|Appends column `[[7], [8]]` to the right of the matrix to form `[[1 2 7], [3 4 8]]`.|
|**Delete Element**|`np.delete(arr, 2)`|Removes the element located at index 2 from array `[1, 2, 3, 4, 5]`, resulting in `[1 2 4 5]`.|

> **Crucial Callout:** When attempting to stack arrays either vertically (`np.vstack`) or horizontally (`np.hstack`), dimensional compatibility is mathematically required. The dimensions of the new arrays must perfectly match the axis of the original array they are attaching to.

## 8. Summary & Review

|**Core Study Area**|**Key Takeaways**|
|---|---|
|**Targeted Indexing**|Elements can be isolated using exact index steps, multidimensional coordinates, lists of explicit index targets (fancy indexing), or negative indexing.|
|**Data Filtering**|Utilizing boolean masks (e.g., `mask = numbers > 5`) or the `np.where()` function allows rapid extraction of elements meeting mathematical conditions without explicit loops.|
|**Structural Manipulation**|Arrays can be sorted by specific axes, vertically/horizontally stacked, logically concatenated, or have specific indices outright deleted using functions like `vstack`, `hstack`, and `np.delete`.|

> **Crucial Callout:** True proficiency in NumPy requires transitioning away from standard Python loops and heavily relying on conditional boolean masking, structural reshaping, and built-in optimized mapping functions like `np.where()` to cleanly scale operations across massive datasets.