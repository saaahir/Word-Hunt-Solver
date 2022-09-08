package com.saahir.wordhunt.springcloudwhsolver.Controller.wordHuntSolver;

public class Trie {
    private TrieNode root = new TrieNode();
    public int count = 0;

    public void addWord(String word) {
        TrieNode curr = root;
        word = word.toLowerCase();
        for (int i = 0; i < word.length(); i++) {
            Character letter = word.charAt(i);
            TrieNode next = curr.getChildren().get(letter);
            if (next == null) {
                next = new TrieNode();
                curr.getChildren().put(letter, next);
            }
            curr = next;
        }
        curr.setIsFullWord(true);
    }

    public boolean findWord(String word) {
        TrieNode curr = root;
        word = word.toLowerCase();
        for (int i = 0; i < word.length(); i++) {
            Character letter = word.charAt(i);
            TrieNode next = curr.getChildren().get(letter);
            if (next == null) {
                return false;
            }
            curr = next;
        }
        return curr.getIsFullWord();
    }

    public TrieNode getRoot() {
        return root;
    }

}
