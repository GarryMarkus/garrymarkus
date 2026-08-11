# Phase 3: Advanced NumPy Operations and Business Analysis

This module explores advanced mathematical manipulations and real-world business data analysis using NumPy and Matplotlib. It demonstrates how to apply aggregate functions across specific multi-dimensional axes to extract actionable business intelligence, such as yearly totals and restaurant averages. Additionally, it covers fundamental vector calculus concepts (dot products and vector angles) alongside string vectorization and scalar broadcasting.

## 1. Multi-Dimensional Data Aggregation

NumPy's aggregate functions can be targeted along specific geometric axes (rows or columns) to compute sums, maximums, minimums, and averages from 2D matrices.

**Worked Examples / Practice**

_(Given Zomato `sales_data` shape `(5, 5)` mapping `[restaurant_id, 2021, 2022, 2023, 2024]`)_

- **Result:** Executing `np.sum(sales_data[:, 1:], axis=0)` yields `[810000 945000 1085000 1240000]`.
    
    - **Technical Deduction:** By slicing `[:, 1:]`, the operation explicitly ignores the `restaurant_id` located at index 0. Passing `axis=0` forces the addition to run vertically down the columns, yielding the aggregate total sales for each specific year across all restaurants.
        
- **Result:** Executing `np.min(sales_data[:, 1:], axis=1)` yields `[150000 120000 200000 180000 160000]`.
    
    - **Technical Deduction:** Passing `axis=1` forces the calculation to evaluate horizontally across rows, successfully isolating the lowest performing sales year for each individual restaurant.
        
- **Result:** Executing `np.mean(sales_data[:, 1:], axis=1)` yields `[200000. 152500. 247500. 225000. 195000.]`.
    
    - **Technical Deduction:** Computes the strict mathematical average of the horizontal sales rows per restaurant.
        

> **Crucial Callout:** In NumPy 2D array architecture, defining `axis=0` always applies the mathematical function vertically down the columns (collapsing the rows), whereas `axis=1` applies the function horizontally across the rows (collapsing the columns).

## 2. Cumulative Operations and Plotting

Beyond static aggregates, arrays support sequential cumulative processing over specific dimensions, the results of which can be visualized directly via Matplotlib.

- **Cumulative Sum**: Using `np.cumsum`, NumPy generates a running total across a specified axis, progressively adding the current array element to the sum of all preceding elements.
    

**Worked Examples / Practice**

- **Result:** Executing `np.cumsum(sales_data[:, 1:], axis=1)` computes the rolling sales total over the four years for each restaurant sequentially.
    

> **Technical Depth Injection:** To properly plot the average cumulative sales across all restaurants, the 2D matrix output of the `cumsum` calculation must first be mathematically collapsed into a 1D sequence using `np.mean(cumsum, axis=0)` before being passed to Matplotlib's `plt.plot()`.

## 3. Vector Arithmetic and Dot Products

NumPy natively supports linear algebra operations between 1D arrays, treating them as mathematical vectors rather than standard Python lists.

|**Mathematical Operation**|**Implementation Syntax**|**Calculated Result**|
|---|---|---|
|**Vector Addition**|`vector1 + vector2`|`[ 7 9 11 13 15]`|
|**Element Multiplication**|`vector1 * vector2`|`[ 6 14 24 36 50]`|
|**Dot Product**|`np.dot(vector1, vector2)`|`130`|

_(Calculations above assume `vector1 = np.array([1, 2, 3, 4, 5])` and `vector2 = np.array([6, 7, 8, 9, 10])`)_.

> **Technical Depth Injection:** The exact geometric angle (in radians) between two multi-dimensional vectors can be algorithmically derived using the formula `np.arccos(np.dot(vector1, vector2) / (np.linalg.norm(vector1) * np.linalg.norm(vector2)))`. For the provided vectors, this evaluates strictly to `0.26554161733900966`.

## 4. Advanced Array Manipulation

NumPy possesses the capability to dynamically vectorizes standard Python string methods and inherently broadcast scalar mathematics across multidimensional planes.

**Chronological Flow: String Vectorization**

1. Initialize an array containing string elements: `restaurant_types = np.array(['biryani', 'chinese', 'pizza', 'burger', 'cafe'])`.
    
2. Encapsulate the base Python string method inside NumPy's vectorization function: `vectorized_upper = np.vectorize(str.upper)`.
    
3. Apply the new vectorized function directly to the target array: `vectorized_upper(restaurant_types)`.
    
4. The output string manipulation is automatically mapped across all elements: `['BIRYANI' 'CHINESE' 'PIZZA' 'BURGER' 'CAFE']`.
    

**Worked Examples / Practice (Broadcasting)**

- **Result:** To calculate the monthly average sales, the entire annual sales matrix slice is divided by a scalar integer: `sales_data[:, 1:] / 12`.
    
    - **Technical Deduction:** NumPy natively broadcasts the division operation across every single data point in the 2D matrix simultaneously. This produces an identical dimensional shape populated with the precise floating-point values without requiring manual nested loops.
        

## 8. Summary & Review

|**Core Study Area**|**Key Takeaways**|
|---|---|
|**Axis-Based Aggregation**|Passing `axis=0` (columns) or `axis=1` (rows) dynamically directs mathematical functions like `np.sum`, `np.min`, `np.max`, and `np.mean` across specific dimensions of complex matrices.|
|**Vector Linear Algebra**|NumPy natively performs linear algebra operations, including standard element-wise arithmetic, dot products (`np.dot`), and spatial vector norms (`np.linalg.norm`) without manual traversal.|
|**Broadcasting & Vectorization**|Standard scalar mathematics (e.g., `/ 12`) and Python string methods (using `np.vectorize`) can be instantly broadcast across multi-dimensional arrays, bypassing iterative loops entirely.|

> **Crucial Callout:** The core optimization power of NumPy for data analysis lies in its ability to fuse array slicing with axis-directed aggregation (e.g., evaluating `np.sum(sales_data[:, 1:], axis=0)`). This allows developers to mathematically bypass irrelevant data—such as index IDs—and strictly compute target metrics on raw values in a single line of $O(1)$ syntactical execution.
