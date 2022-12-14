package com.saahir.wordhunt.springcloudwhsolver.Controller.wordHuntSolver;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.*;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.transfer.PresignedUrlDownload;
import com.amazonaws.services.s3.transfer.internal.PresignedUrlDownloadImpl;
import com.amazonaws.util.IOUtils;


public class Solver {
    public static final int MINWORDLENGTH = 2;

    public static Trie buildTrie(File file) {
//        File file = new File(pathname);
        Trie trie = new Trie();
        try {
            Scanner fileReader = new Scanner(file);
            while (fileReader.hasNextLine()) {
                String word = fileReader.nextLine().toLowerCase();
                trie.addWord(word);
            }
            fileReader.close();
            return trie;
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return null;
        }

    }

    public static Trie buildTrieNew() {
//        Trie trie = new Trie();

        String accessKey = System.getenv("accessKey");
        String secretKey = System.getenv("secretKey");
        String bucketName = "my-whs-bucket";
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion("us-east-2").build();
//        S3Object obj = client.getObject(bucketName, "dict.txt");
        File localDict = new File("/tmp/localDict.txt");
        ObjectMetadata obj = client.getObject(new GetObjectRequest(bucketName, "dict.txt"), localDict);

        return buildTrie(localDict);


//        BufferedReader reader = new BufferedReader(new InputStreamReader(
//                obj.getObjectContent()));

//        String line;
//        try {
//            while ((line = reader.readLine()) != null) {
//                String word = line.toLowerCase();
//                trie.addWord(word);
//            }
//            reader.close();
//        }
//        catch (Exception e) {
//         e.printStackTrace();
//        }

//        return trie;
    }

    public static HashMap<String, List<Integer>> solve(String letters, int numTiles) {
        if (letters.length() < numTiles * numTiles)
            return null;
//        Trie trie = buildTrie("src/main/java/com/saahir/wordhunt/springcloudwhsolver/Controller/wordHuntSolver/Resources/dict.txt");
        Trie trie = buildTrieNew();
        HashMap<String, List<Integer>> map = new HashMap<>();
        Character[][] board = new Character[numTiles][numTiles];
        boolean[][] visited = new boolean[numTiles][numTiles];

        for (int row = 0; row < numTiles; row++) {
            for (int col = 0; col < numTiles; col++) {
                board[row][col] = letters.charAt(row * numTiles + col);
                visited[row][col] = false;
            }
        }
        for (int row = 0; row < numTiles; row++) {
            for (int col = 0; col < numTiles; col++) {
                ArrayList<Integer> pathList = new ArrayList<>();
                pathList.add(row);
                pathList.add(col);
                dfs(board, visited, row, col, "", trie.getRoot(), map, numTiles, pathList);
            }
        }
        // List<String> list = new ArrayList<>(set);
        // list.sort(((String str1, String str2) -> str2.length() - str1.length()));
        return map;

    }

    public static void dfs(Character board[][], boolean visited[][], int row, int col, String current, TrieNode node,
            HashMap<String, List<Integer>> map, int numTiles, ArrayList<Integer> pathList) {
        // Base cases: return if we are out of bounds, if we have already visited the
        // tile, or if the node doesn't exist (meaning that the word doesn't continue)
        if (node == null ||
                row > numTiles - 1 ||
                col > numTiles - 1 ||
                row < 0 ||
                col < 0 ||
                visited[row][col])
            return;

        // Mark this tile as visited so that we don't visit again in the recursive calls
        visited[row][col] = true;

        if (current.length() > MINWORDLENGTH && node.getIsFullWord())
            map.put("" + current + "", pathList);

        // Iterate our node and string
        Character letter = board[row][col];
        node = node.getChildren().get(letter);

        current = current + letter;

        // Recursive calls in all 8 directions (cardinals + diagonals)
        int[] dRow = { 0, 0, 1, -1, 1, 1, -1, -1 };
        int[] dCol = { 1, -1, 0, 0, 1, -1, 1, -1 };

        for (int i = 0; i < dRow.length; i++) {
            int newRow = row + dRow[i];
            int newCol = col + dCol[i];
            ArrayList<Integer> newPathList = new ArrayList<>(pathList);
            newPathList.add(newRow);
            newPathList.add(newCol);
            dfs(board, visited, newRow, newCol, current, node, map, numTiles, newPathList);
        }

        // Mark the tile as unvisited as we are about to return from this call
        // This array is just used to make sure we don't resuse a letter in the
        // recursive calls
        visited[row][col] = false;
        pathList.remove(pathList.size() - 1);
        pathList.remove(pathList.size() - 1);

    }

}
