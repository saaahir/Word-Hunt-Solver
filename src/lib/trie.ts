class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let curr = this.root;
        for (const char of word) {
            if (!curr.children.has(char)) {
                curr.children.set(char, new TrieNode());
            }
            curr = curr.children.get(char)!; // non-null assertion
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        let curr: TrieNode | undefined = this.root;
        for (const char of word) {
            curr = curr.children.get(char);
            if (!curr) return false;
        }
        return curr.isWord;
    }

    startsWith(prefix: string): boolean {
        let curr: TrieNode | undefined = this.root;
        for (const char of prefix) {
            curr = curr.children.get(char);
            if (!curr) return false;
        }
        return true;
    }
}

export { TrieNode, Trie };
