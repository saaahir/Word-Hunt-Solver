package com.saahir.wordhunt.springcloudwhsolver.Controller.wordHuntSolver;

import java.util.HashMap;

public class TrieNode {
    private final int ALPHABETSIZE = 26;
    private HashMap<Character, TrieNode> children = new HashMap<>(ALPHABETSIZE);
    // The children of the node is contained in a hashmap which maps from each
    // possible next letter to the corresponding TrieNode associated with it

    private boolean isFullWord; // Indicates whether the set of nodes thus far forms a full word

    TrieNode(HashMap<Character, TrieNode> children, boolean isFullWord) {
        this.children = children;
        this.isFullWord = isFullWord;
    }

    TrieNode(HashMap<Character, TrieNode> children) {
        this.children = children;
        this.isFullWord = false;
    }

    TrieNode() {
        this.children = new HashMap<Character, TrieNode>(ALPHABETSIZE);
        this.isFullWord = false;
    }

    HashMap<Character, TrieNode> getChildren() {
        return this.children;
    }

    boolean getIsFullWord() {
        return this.isFullWord;
    }

    void setChildren(HashMap<Character, TrieNode> children) {
        this.children = children;
    }

    void setIsFullWord(boolean isFullWord) {
        this.isFullWord = isFullWord;
    }

}
