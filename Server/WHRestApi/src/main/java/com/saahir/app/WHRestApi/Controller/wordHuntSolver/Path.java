package com.saahir.app.WHRestApi.Controller.wordHuntSolver;

import java.util.ArrayList;
import java.util.List;

public class Path {

    private List<Pair> pairList = new ArrayList<>();

    public void addToPath(int x, int y) {
        pairList.add(new Pair(x, y));
    }

    public Path newPathFromPath(int x, int y) {
        Path ret = new Path();
        ret.pairList = this.pairList;
        ret.addToPath(x, y);
        return ret;
    }

    public List<Pair> getPath() {
        return pairList;
    }

}
