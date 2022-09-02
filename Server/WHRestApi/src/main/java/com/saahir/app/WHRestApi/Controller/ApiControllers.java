package com.saahir.app.WHRestApi.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.saahir.app.WHRestApi.Controller.wordHuntSolver.Solver;

@RestController
public class ApiControllers {

    @GetMapping(value = "/")
    public String getPage() {
        return "welcome";
    }

    @CrossOrigin
    @RequestMapping(value = "board", method = RequestMethod.GET)
    public @ResponseBody HashMap<String, List<Integer>> getItem(@RequestParam("letters") String letters,
            @RequestParam("dimensions") int numTiles) {

        return Solver.solve(letters, numTiles);
        // return list;
    }

}
