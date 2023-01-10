// Алгоритм - набор последовательных действий которые решают какую-то задачу
// BIG O(n) - сложность алгоритма или его скорость, O - "О" большое, n - количество операций; 

const randomArr = [0,3,2,5,6,8,1,9,4,2,1,2,9,6,4,1,7,-1, -5, 23,6,2,35,6,3,32]
const sortedArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

// O(n), Линейный поиск
const linearSearch = () => {

    const anonym = (arr, item) => {
        let result = null, count = 0  

        for(let i = 0; i < arr.length; i++) {
            count = i
            if (arr[i] === item) {
                result = i
                break
            }
        }
    
        console.log('Линейный поиск, количество итераций:', count);
    
        return result
    }

    console.log('Линейный поиск', anonym(randomArr, 97));
    console.log('Линейный поиск', anonym(randomArr, 0));
}



// O(log2n), Бинарный поиск
const binarySearch = () => {
    const anonym = (arr, item) => {
        let result = null, count = 0  

        let middle
        let start = 0
        let end = arr.length

        while(start <= end) {
            middle = Math.floor((start + end) / 2)
            count++

            if(arr[middle] === item) {
                result = middle
                break;
            } 
            else if (arr[middle] > item) end = middle - 1
            else start = middle + 1
        }
    
        console.log('Бинарный поиск, количество итераций:', count);
    
        return result
    }

    console.log('Бинарный поиск', anonym(sortedArr, 9));
    console.log('Бинарный поиск', anonym(sortedArr, 1482));
}

// binarySearch()


// O(n*n), Сортировка выбором
const selectionSort = () => {
    const anonym = (arr) => {
        let count = 0  
        
        for(let i = 0; i < arr.length; i++) {
            let idxMin = i

            for(let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[idxMin]) {
                    idxMin = j
                }

                count++
            }

            let tmp = arr[i]
            arr[i] = arr[idxMin]
            arr[idxMin] = tmp
        }
        
        console.log('Сортировка выбором, количество итераций:', count);
        console.log('Сортировка выбором, длина массива:', arr.length);
    
        return arr
    }

    console.log('Сортировка выбором', anonym(randomArr));
}

// selectionSort() 

const factorialRecursive = () => {
    let count = 0
    const anonym = (n) => {
        count++
        if(n === 1) return 1
        return n * anonym(n - 1)
    }

    console.log('Факториал числа, через рекурсию, количество итераций:', count);
    console.log('Факториал числа, через рекурсию:', anonym(8));
}

// factorialRecursive()

const fibonachiRecursive = () => {
    let count = 0
    const anonym = (n) => {
        count++
        if(n === 1 || n === 2) return 1
        return anonym(n - 1) + anonym(n - 2)
    }

    console.log('Числа фибоначи, через рекурсию, количество итераций:', count);
    console.log('Числа фибоначи, через рекурсию:', anonym(5));
}

// fibonachiRecursive()

// Сортировка Хоара
const quickSort = () => {
    let count = 0

    const anonym = (arr) => {
        if (arr.length <= 1) return arr

        let pivotIdx = Math.floor(arr.length / 2)
        let pivot = arr[pivotIdx]
        let less = []
        let greater = []

        for(let i = 0; i < arr.length; i++) {
            count += 1
            if (pivotIdx === i) continue
            if (arr[i] < pivot) less.push(arr[i])
            else greater.push(arr[i])
        }

        return [...anonym(less), pivot, ...anonym(greater)]
    }

    console.log('Быстрая сортировка, количество итераций:', count);
    console.log('Быстрая сортировка:', anonym(randomArr));
}

// quickSort()


// Graphs



const graph = {
    a: ['b', 'c'],
    b: ['f'],
    c: ['d', 'e'],
    d: ['f'],
    e: ['f'],
    f: ['g'],
}

// Search in breadth, for a little steps

const breadthSearch = (graph, start, end) => {
    let queue = [start]

    while(queue.length > 0) {
        const current = queue.shift()

        if(!graph[current]) graph[current] = []

        if(graph[current].includes(end)) return true
        else queue = [...queue, ...graph[current]]
    }

    return false
}

// Есть ли путь из a в n - false
// console.log(breadthSearch(graph, 'a', 'n'));

// Матрица смежности

const matrix = [
    [0,1,1,0,0,0,0],
    [0,0,0,0,1,0,0],
    [0,0,0,1,0,1,0],
    [0,0,0,0,1,0,0],
    [0,0,0,0,0,0,1],
    [0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0],
]

// Algorithm Дейкстры (пути с весом)

const graphDekstr = {
    a: { b: 2, c: 1 },
    b: {f: 7},
    c: {d: 5, e: 2},
    d: {f: 2},
    e: {f: 1},
    f: {g: 1},
    g: {}
}

const findNodeLowestCost = (costs, processed) => {
    let lowestCost = 100000000
    let lowestNode;

    Object.keys(costs).forEach(node => {
        let cost = costs[node]
        if (cost < lowestCost && !processed.includes(node)) {
            lowestCost = cost
            lowestNode = node
        }
    })

    return lowestNode
}

const shortPath = (graph, start) => {
    const costs = {}
    const processed = []
    let neighbors = {}

    Object.keys(graph).forEach(node => {
        if (node !== start) {
            let value = graph[start][node]
            costs[node] = value || 100000000
        }
    })
    console.log(costs);

    let node = findNodeLowestCost(costs, processed)

    while (node) {
        const cost = costs[node]
        neighbors = graph[node]

        Object.keys(neighbors).forEach(neighbor => {
            let newCost = cost + neighbors[neighbor]
            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost
            }
        })

        processed.push(node)
        node = findNodeLowestCost(costs, processed)
    }

    return costs
}

// shortPath(graphDekstr, 'c')


// Caching data

const cashFunction = (fn) => {
    const cash = {}
    return (n) => {
        if (cash[n]) {
            console.log('Взято из кеша', cash[n])
            return cash[n]
        }
        const result = fn(n)
        console.log('Посчитала функция = ', result)
        cash[n] = result
        return result;
    };
}

const factorial = (n) => {
    let result = 1
    while (n != 1) {
        result *= n
        n -= 1
    }
    return result
}

const cashFactorial = cashFunction(factorial)

// cashFactorial(5)
// cashFactorial(4)
// cashFactorial(3)
// cashFactorial(4)
// cashFactorial(5)
// cashFactorial(1)


// Структуры данных

// Связный список (простая реализация)

class LinkedList {
    #size = 0
    #lastNode = 0
    #root = {}

    createNode(value) {
        this.#size++
        return {
            value,
            next: null
        }
    }

    add(value) {
        if (this.#size === 0) {
            this.#root[`node-${this.#lastNode}`] = this.createNode(value)
        } else {
            const node = this.createNode(value)
            this.#root[`node-${this.#lastNode}`].next = `node-${++this.#lastNode}`
            this.#root[`node-${this.#lastNode}`] = node
        }

        return this.#root[`node-${this.#lastNode}`].value
    }

    pop() {
        this.#size--
        const del = this.#root[`node-${this.#lastNode}`].value
        delete this.#root[`node-${this.#lastNode}`]
        this.#root[`node-${--this.#lastNode}`].next = null

        return del
    }

    getSize() {
        return this.#size
    }
}

// const list = new LinkedList()
// console.log(list.add(5),list.add(5),list.add(5),list.add(5),list.add(5),list.add(5),
// list.add(4),
// list.pop(),list.pop(),list.pop());
// list.add(27)
// list.add(8)
// list.add(6)



// Бинарное дерево поиска

class BinaryTree {
    constructor() {
        this.root = null
    }

    add(value) {
        if (!this.root) {
            this.root = new TreeNode(value)
        } else {
            let node = this.root
            let newNode = new TreeNode(value)
            while(node) {
                if(value > node.value) {
                    if(!node.right) {
                        break
                    }
                    node = node.right
                } else {
                    if(!node.left) {
                        break
                    }
                    node = node.left
                }
            }

            if(value > node.value) {
                node.right = newNode
            } else {
                node.left = newNode
            }
        }
    }

    print(root = this.root) {
        if(!root) {
            return 
        }
        console.log(root.value);
        this.print(root.left)
        this.print(root.right)
    }
}

class TreeNode {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}


// const tree = new BinaryTree()

// tree.add(5)
// tree.add(2)
// tree.add(6)
// tree.add(2)
// tree.add(1)
// tree.print()


class CustomArray {
    constructor() {
      this.data = {},
      this.length = 0;
    }
  
    access(index) {
      return this.data[index];
    }
  
    push(value) {
      this.data[this.length] = value;
      this.length++;
      return this.length;
    }
  
    pop() {
      const lastValue = this.data[this.length - 1];
      delete this.data[this.length - 1];
      this.length--;
      return lastValue;
   }
  }

class HashTable {
    constructor(size) {
        this.table = new Array(size);
    }

    hashFunction(value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
        hash = (hash + value.charCodeAt(i) * i) % this.table.length;
        }
        return hash;
    }

    set(key, value) {
        let memoryLocation = this.hashFunction(key);
        if (!this.table[memoryLocation]) {
            this.table[memoryLocation] = [];
        }
        this.table[memoryLocation].push([key, value]);
        return this.table;
    }

    getItems(key) {
        let memoryLocation = this.hashFunction(key);
        if (!this.table[memoryLocation]) return null;

        return this.table[memoryLocation].find((x) => x[0] === key)[1];
    }
}