import { Trie } from "./trie";

export async function loadDictionary(minWordLength = 3): Promise<Trie> {
    const res = await fetch("/resources/dict.txt"); // put dict.txt in `public/`
    const text = await res.text();
    const words = text.split(/\r?\n/).filter(word => word.length >= minWordLength);

    const trie = new Trie();
    words.forEach(word => trie.insert(word));

    return trie;
}
