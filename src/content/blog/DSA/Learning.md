# Learning DSA the hard way

## Anything that I learn while solving questions goes here!!

### **Understanding Pairs in C++**

The `pair` is one of the most useful tools you will encounter. It allows you to bind two values of different (or the same) data types together into a single, cohesive unit. You will use this constantly when dealing with Hash Maps, Graph adjacency lists, or whenever a function needs to return two distinct pieces of information.

Here is the complete breakdown of how to declare, use, and return pairs.

### **1. Declaring and Initializing**

You must specify the two data types inside the angle brackets `< >`.

C++

```
#include <bits/stdc++.h>
using namespace std;

int main() {
    // 1. Basic Declaration (Defaults to 0 and empty string "")
    pair<int, string> p1;
    
    // 2. Initialization using curly braces (Modern and Recommended)
    pair<int, int> p2 = {10, 20};
    
    // 3. Initialization using make_pair (Older, but still common)
    pair<int, char> p3 = make_pair(100, 'A');

    // 4. Using 'auto' for instant deduction
    auto p4 = make_pair(3.14, "Pi");

    return 0;
}
```

### **2. Accessing the Data**

A `pair` only has two components, and they are not accessed using indexes like an array. You access the first element using `.first` and the second element using `.second`.

C++

```
#include <bits/stdc++.h>
using namespace std;

int main() {
    pair<string, int> player = {"Alice", 500};
    
    // Reading values
    cout << "Name: " << player.first << "\n";
    cout << "Score: " << player.second << "\n";
    
    // Modifying values
    player.second = 600;
    
    return 0;
}
```

### **3. Arrays and Vectors of Pairs**

In DSA, you will rarely use just one pair. You will often store multiple pairs inside an array or a vector to keep related coordinates, intervals, or weights together.

C++

```
#include <bits/stdc++.h>
using namespace std;

int main() {
    // A vector holding pairs of integers
    vector<pair<int, int>> coordinates;
    
    // Adding pairs to the vector
    coordinates.push_back({1, 5});
    coordinates.push_back({2, 10});
    
    // Accessing the second element of the first pair
    cout << "Y-coordinate: " << coordinates[0].second << "\n";
    
    return 0;
}
```

### **Complexity Analysis**

We will always discuss the efficiency of your approach using formal Big-O notation.

- **Time Complexity:** Creating a pair, or accessing `.first` and `.second`, is strictly an $\mathcal{O}(1)$ operation.
    
- **Space Complexity:** A pair only takes up the exact memory required by the two data types you put inside it, making it $\mathcal{O}(1)$ additional space overhead.
    

### **Quick Reference Table**

|**Syntax**|**Description**|**Example**|
|---|---|---|
|`pair<T1, T2> p;`|Declares a pair of types T1 and T2.|`pair<int, int> p;`|
|`p.first`|Accesses or modifies the first element.|`p.first = 10;`|
|`p.second`|Accesses or modifies the second element.|`p.second = 20;`|
|`make_pair(x, y)`|Constructs a pair without explicitly stating types.|`p = make_pair(1, 2);`|
|`{x, y}`|Modern initializer list syntax to create/return a pair.|`p = {1, 2};`|

### **Returning a Pair in C++**

Returning a pair is the standard C++ workaround when you need a function to return two values but do not want to go through the hassle of defining a custom struct or class. It is incredibly useful in algorithms like Depth First Search (DFS) where you might need to return both a node's state and its distance, or when finding minimum and maximum elements simultaneously.

### **The Mechanics of Returning a Pair**

To return a pair, you simply replace the standard return type (like `int` or `string`) with `pair<type1, type2>`.

Here is a practical code example showing the two primary ways to return the data:

C++

```
#include <bits/stdc++.h>
using namespace std;

// 1. Function signature defines the return type as pair<int, int>
pair<int, int> getMinMax(int a, int b) {
    if (a < b) {
        // Method A: Modern initializer list syntax (Highly Recommended)
        return {a, b}; 
    } else {
        // Method B: Using make_pair (Older, but still valid)
        return make_pair(b, a); 
    }
}

int main() {
    // Calling the function and storing the returned pair
    pair<int, int> result = getMinMax(42, 15);
    
    cout << "Minimum: " << result.first << "\n";
    cout << "Maximum: " << result.second << "\n";

    return 0;
}
```

### **Breakdown of Return Methods**

|**Syntax**|**Description**|**Best Use Case**|
|---|---|---|
|`return {x, y};`|Modern initializer list syntax to create/return a pair.|This is the cleanest, most modern approach (C++11 and later). It requires the least amount of typing.|
|`return make_pair(x, y);`|Constructs a pair without explicitly stating types.|Useful if you are working with older C++ codebases or need the compiler to auto-deduce types strictly.|

> **Pro-Tip:** Notice that in the modern syntax `{a, b}`, you do not need to explicitly write out `pair<int, int>{a, b}`. The C++ compiler looks at the function's return type in the signature and automatically knows exactly what data structure to build.

### **Complexity Analysis**

- **Time Complexity:** Returning a pair is an $\mathcal{O}(1)$ operation. The elements are copied (or moved) directly back to the caller in constant time.
    
- **Space Complexity:** An $\mathcal{O}(1)$ space overhead, as it simply returns two distinct variables packaged together on the call stack.
