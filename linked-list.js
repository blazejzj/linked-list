// node factory
const node = (value = null, nextNode = null) => {
    return {
        value,
        nextNode
    };
}

const linkedList = () => {
    let head = null;
    let size = 0;

    // Add node to the end
    const append = (value) => {
        const newNode = node(value);

        // if no head node, set new node as head
        if (!head) {
            head = newNode;
            size++;
            return;
        }

        let currentPointer = head;
        // find the last node
        while (currentPointer.nextNode !== null) {
            currentPointer = currentPointer.nextNode;
        }
        // set new node as the last node
        currentPointer.nextNode = newNode;
        size++;
    };

    // Add node in the beginning
    const prepend = (value) => {
        const newNode = node(value, head);
        head = newNode;
        size++;
    };

    // Get size
    const getSize = () => {return size};
    // Get head (first node)
    const getHead = () => {return head};
    // Get tail (last node)
    const getTail = () => {
        let currentPointer = head;
        while (currentPointer.nextNode !== null) {
            currentPointer = currentPointer.nextNode;
        }
        return currentPointer;
    };

    // Return node at index
    const at = (index) => {
        // Check if index is out of bounds
        if (index < 0 || index >= size) {
            return null
        };

        // Traverse to the index, assign currentPointer to the node at the index and return
        let currentPointer = head;
        for (let i = 0; i < index; i++) {
            currentPointer = currentPointer.nextNode;
        };

        return currentPointer;
    };

    // Removes teh last element from the list
    const pop = () => {
        // Check first if there is no head node
        if (!head) {
            return null;
        };

        // Check if only 1 node -> remove head
        if (size === 1) {
            head = null;
            size--;
            return;
        };

        // Traverse to the last node and remove it
        let currentPointer = head;
        for (let i = 0; i < size - 2; i++) {
            currentPointer = currentPointer.nextNode;
        };
        currentPointer.nextNode = null;
        size--;
    };

    // returns true if the passed in value is in the list
    const contains = (value) => {
        if (!head) {
            return false;
        }

        let currentPointer = head;
         while (currentPointer !== null) {
            // Check if value is found
            if (currentPointer.value === value) {
                return true;
            }
            // Move to the next node
            currentPointer = currentPointer.nextNode;
         }
        
         return false;
    };

    // returns the index of the node containing value, or null if not found
    const find = (value) => {
        if (!head) {
            return null;
        };

        let index = 0;
        let currentPointer = head;

        if (contains(value)) {
            while (currentPointer !== null) {
                if (currentPointer.value === value) {
                    return index;
                };
                currentPointer = currentPointer.nextNode;
                index++;
            };
        };

        return null;
    };

    // repesents the list as a string in the format: ( value ) -> ( value ) -> ( value ) -> null
    const toString = () => {
        let string = '';
        let currentPointer = head;
        
        // Traverse the list and append the value of each node to the string
        while (currentPointer !== null) {
            string += `(${currentPointer.value}) -> `;
            currentPointer = currentPointer.nextNode;
        }

        return string + 'null';
    }

    // inserts a new node with the provided value at the given index.
    const insert = (value, index) => {
        // Check if index is valid
        if (index < 0 || index > size) {
            return null;
        };

        // Check if head node is empty
        if (!head) {
            head = node(value);
            size++;
            return;
        };

        // append if index is greater than size
        if (index > size) {
            append(value);
            return;
        };

        // prepend if index is 0
        if (index === 0) {
            prepend(value);
            return;
        };

        const nodeBeforeIndex = at(index - 1);
        const newNode = node(value, nodeBeforeIndex.nextNode);
        nodeBeforeIndex.nextNode = newNode;
        size++;
    };

    // removes the node at the given index
    const removeAt = (index) => {
        if (index < 0 || index >= size) {
            return null;
        };

        if (index === 0) {
            head = head.nextNode;
            size--;
            return;
        };

        const nodeBeforeIndex = at(index - 1);
        nodeBeforeIndex.nextNode = nodeBeforeIndex.nextNode.nextNode;
        size--;
    };

    return {
        append,
        prepend,
        getSize,
        getHead,
        getTail,
        at,
        pop,
        contains,
        find,
        toString,
        insert,
        removeAt
    };
};

// Test the linked list

const list = linkedList();

// Test append
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log("Complete list = " + list.toString());

// Test Prepend
list.prepend("rabbit");
console.log("Prepending Rabbit = " + list.toString());

// Test getSize
console.log("List Size = " + list.getSize());

// Test getHead
console.log("Head = " + list.getHead().value);

// Test getTail
console.log("Tail = " + list.getTail().value);

// Test at
console.log("At index 3 = " + list.at(3).value);

// Test pop
list.pop();
console.log("Popped last element = " + list.toString());

// Test contains
console.log("Contains cat = " + list.contains("cat"));
console.log("Contains elephant = " + list.contains("elephant"));

// Test find
console.log("Find snake = " + list.find("snake"));
console.log("Find elephant = " + list.find("elephant"));

// Test insert
list.insert("elephant", 3);
console.log("Insert elephant at index 3 = " + list.toString());

// Test removeAt
list.removeAt(3);
console.log("Remove at index 3 = " + list.toString());