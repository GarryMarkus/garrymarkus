# Phase 4: NumPy Array I/O and Image Manipulation

This section covers the fundamental methods for saving and loading NumPy arrays to and from the local file system using the native `.npy` format. It bridges basic data structure generation with persistent memory storage, ensuring arrays maintain their exact dimensional properties. Furthermore, it demonstrates how NumPy arrays can functionally represent visual image data, allowing for mathematical image manipulation and side-by-side visualization utilizing the Matplotlib library.

## 1. Array Generation and Persistent Storage

NumPy allows complex multidimensional arrays to be saved directly to the disk without the need for manual data serialization.

- **`np.save()`**: A NumPy function that accepts a string filename and a target array variable, writing the array structure to a secure binary `.npy` file on the disk.
    

|**Array Variable**|**Initialization Code**|**Dimensionality / Shape**|
|---|---|---|
|**`array1`**|`np.array([[1, 2, 3], [4, 5, 6]])`|2D Matrix|
|**`array2`**|`np.random.rand(3, 3)`|3x3 Random Float Matrix|
|**`array3`**|`np.zeros((4, 4))`|4x4 Zero Matrix|

**Chronological Flow: Saving Arrays to Disk**

1. Generate the target NumPy arrays within the active memory environment.
    
2. Execute `np.save('array1.npy', array1)` to permanently write the first array to the local storage.
    
3. Repeat the exact `np.save` execution process for `'array2.npy'` and `'array3.npy'`.
    

## 2. Loading Arrays from Disk

Once arrays are securely stored as binary `.npy` files, they can be dynamically reloaded into Python variables to resume data operations.

**Worked Examples / Practice**

- **Result:** Executing `loaded_array1 = np.load('array1.npy')` followed by `print(loaded_array1)` outputs `[[1 2 3] [4 5 6]]`.
    
    - **Technical Deduction:** The `np.load()` function successfully restores both the structural dimensions (2x3) and the raw integer values of the original `array1` from the disk back into active memory.
        

## 3. Mathematical Image Manipulation

Because images can be digitally interpreted as multidimensional NumPy arrays, numerical scalar operations directly alter their visual output when rendered via Matplotlib.

> **Crucial Callout:** By subtracting the original image array from the integer 1 (using the code `1 - logo`), NumPy automatically broadcasts the subtraction across every single pixel value. This mathematically inverts the color matrix, instantly generating a "Dark" version of the original image.

> **Technical Depth Injection:** Matplotlib grid placement is managed via the `plt.subplot()` function. Passing the integer `121` specifies a grid of 1 row, 2 columns, targeting the 1st position. Passing `122` strictly targets the 2nd position in that same layout.

**Chronological Flow: Image Loading and Visualization**

1. Establish a `try` block and load the visual data array using `logo = np.load('numpy-logo.npy')`.
    
2. Initialize a Matplotlib figure environment with specific dimensions using `plt.figure(figsize=(10,5))`.
    
3. Target the left sector of the figure (`plt.subplot(121)`) and render the raw array using `plt.imshow(logo)`, setting the title to "Numpy logo" and turning the grid off (`plt.grid(False)`).
    
4. Mathematically invert the array values: `dark_logo = 1 - logo`.
    
5. Target the right sector of the figure (`plt.subplot(122)`) and render the inverted array using `plt.imshow(dark_logo)`, titling it "Numpy Dark logo".
    
6. Handle missing files with an `except FileNotFoundError:` fallback that explicitly prints "numpy logo file not found".
    

## 8. Summary & Review

|**Core Study Area**|**Key Takeaways**|
|---|---|
|**Array File I/O**|NumPy arrays are natively written to binary storage using `np.save()` and restored using `np.load()`.|
|**Data Integrity**|Loading an `.npy` file perfectly preserves the data type, numerical values, and structural shape of the original matrix.|
|**Visual Rendering**|Matplotlib directly interprets NumPy arrays as visual matrices, displaying them via the `plt.imshow()` command within defined subplots.|

> **Crucial Callout:** Combining `np.load()` with Matplotlib's visualization proves that digital images are fundamentally just multi-dimensional numerical arrays. Consequently, they can be drastically altered—such as color inversion—using standard, single-line NumPy scalar arithmetic (`1 - logo`) without iterative pixel-by-pixel loops.
