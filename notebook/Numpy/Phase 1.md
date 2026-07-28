# Numpy Array and Basics

This topic covers the fundamental usage of the NumPy library in Python, highlighting its significant performance benefits over standard lists. Understanding these basics is critical for data analysis and machine learning, focusing on array creation, mathematical operations, and dimensional properties.

## 1. Creating Arrays

NumPy arrays can be constructed directly from standard Python lists or generated from scratch using built-in NumPy functions.

- **np.array()**: A foundational function that creates a NumPy array from a provided Python list, supporting both 1D and 2D structures.
    

**Worked Examples / Practice**

- **Result:** Creating a 1D array using `np.array([1, 2, 3, 4, 5])` outputs `[1 2 3 4 5]`.
    
- **Result:** Creating a 2D array using `np.array([[1, 2, 3], [4, 5, 6]])` outputs `[[1 2 3] [4 5 6]]`.
    

## 2. Python List vs. NumPy Array

NumPy arrays offer distinct operational behaviors and immense speed advantages compared to standard Python lists.

> **Crucial Callout:** When multiplying a Python list by an integer (e.g., `py_list * 2`), it duplicates the sequence of the list elements, resulting in `[1, 2, 3, 1, 2, 3]`. Conversely, multiplying a NumPy array by an integer strictly performs element-wise multiplication (e.g., `np.array([1, 2, 3]) * 2` results in `[2 4 6]`).

**Chronological Flow: Performance Time Comparison**

1. Initialize the operation start time using the `time.time()` function.
    
2. Execute a standard Python list comprehension operation generating $1,000,000$ elements: `[i*2 for i in range(1000000)]`.
    
3. The printed execution time for the list operation is $0.031139135360717773$ seconds.
    
4. Reset the start time tracker.
    
5. Execute the mathematically equivalent NumPy operation: `np.arange(1000000) * 2`.
    
6. The printed execution time for the NumPy operation is $0.0009281635284423828$ seconds. **Technical Deduction:** NumPy operates at a drastically faster computational speed than standard Python list comprehensions for mathematical processing.
    

## 3. Array Creation Functions

NumPy provides built-in functions to initialize arrays from scratch with specific patterns or values without needing an existing Python list.

|**Function Type**|**Code Example**|**Output Result**|
|---|---|---|
|**Zeros**|`np.zeros((3, 4))`|`[[0. 0. 0. 0.] [0. 0. 0. 0.] [0. 0. 0. 0.]]`|
|**Ones**|`np.ones((2, 3))`|`[[1. 1. 1.] [1. 1. 1.]]`|
|**Full**|`np.full((2, 2), 7)`|`[[7 7] [7 7]]`|
|**Random**|`np.random.random((2, 3))`|`[[0.42896172 0.20553213 0.30010237] [0.14272913 0.79010903 0.93810579]]`|
|**Sequence**|`np.arange(0, 11, 2)`|`[0 2 4 6 8 10]`|

## 4. Vector, Matrix, and Tensor

Arrays are classified technically based on their specific number of dimensions.

- **Vector**: A 1-dimensional NumPy array layout, structured like `np.array([1, 2, 3])`.
    
- **Matrix**: A 2-dimensional NumPy array layout, structured like `np.array([[1, 2, 3], [4, 5, 6]])`.
    
- **Tensor**: A 3-dimensional NumPy array layout, structured like `np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])`.
    

## 5. Array Properties

NumPy array objects contain internal properties that define their structural limits and data forms. _(Values below are based on the sample array `[[1, 2, 3], [4, 5, 6]]`)_.

|**Property Metric**|**Method Syntax**|**Sample Output**|
|---|---|---|
|**Shape**|`arr.shape`|`(2, 3)`|
|**Dimension**|`arr.ndim`|`2`|
|**Size**|`arr.size`|`6`|
|**Data Type**|`arr.dtype`|`int64`|

> **Technical Depth Injection:** The `.shape` property mathematically maps to a tuple representing `(rows, columns)` for a 2D matrix. The `.size` property explicitly calculates the total element count across all axes.

## 6. Array Reshaping

NumPy includes built-in commands to alter the physical layout and structural grouping of array elements. _(The following operations apply to a 1D base array of `np.arange(12)` mapping to `[ 0 1 2 3 4 5 6 7 8 9 10 11]`)_.

|**Transform Operation**|**Code Execution**|**Expected Structural Output**|
|---|---|---|
|**Reshape**|`arr.reshape((3, 4))`|`[[0 1 2 3] [4 5 6 7] [8 9 10 11]]`|
|**Flatten**|`reshaped.flatten()`|`[ 0 1 2 3 4 5 6 7 8 9 10 11]`|
|**Ravel**|`reshaped.ravel()`|`[ 0 1 2 3 4 5 6 7 8 9 10 11]`|
|**Transpose**|`reshaped.T`|`[[0 4 8] [1 5 9] [2 6 10] [3 7 11]]`|

> **Crucial Callout:** Both `.flatten()` and `.ravel()` successfully convert a multi-dimensional array backward into a 1D sequence. However, `.ravel()` distinctly returns a _view_ of the array instead of generating a hard copy in memory.

## 8. Summary & Review

|**Core Study Area**|**Key Takeaways**|
|---|---|
|**List vs. Array**|NumPy arrays natively perform element-wise mathematical calculations and execute operations significantly faster than Python lists.|
|**Initialization**|Arrays can be built dynamically without lists using `np.zeros`, `np.ones`, `np.full`, `np.random`, and `np.arange`.|
|**Dimensions**|Categorized progressively as 1D Vectors, 2D Matrices, and 3D Tensors.|
|**Restructuring**|An array's shape can be dynamically modified utilizing `.reshape()`, flattened with `.flatten()` or `.ravel()`, and mathematically transposed using `.T`.|

> **Crucial Callout:** The core advantage of NumPy lies in its optimized underlying C-based implementation, handling large-scale sequence generation, manipulation, and mathematical broadcasting efficiently in constant memory layouts compared to Python's native list structures.