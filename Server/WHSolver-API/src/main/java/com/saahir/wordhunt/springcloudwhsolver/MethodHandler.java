package com.saahir.wordhunt.springcloudwhsolver;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saahir.wordhunt.springcloudwhsolver.Controller.wordHuntSolver.Solver;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;

public class MethodHandler implements RequestStreamHandler {

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        JSONParser parser = new JSONParser(inputStream);
        JSONObject responseBody = new JSONObject();
        JSONObject response = new JSONObject();
        try {
            String queryString = "";
            Object obj = parser.parseObject().get("rawQueryString");
            if (obj != null) {
                queryString = obj.toString();
                System.out.println("rawQueryString: " + queryString);
                String[] qsarr = queryString.split("&");
                String letters = qsarr[0].split("=")[1];
                int dimensions = Integer.parseInt(qsarr[1].split("=")[1]);

                HashMap<String, List<Integer>> solution = Solver.solve(letters, dimensions);
                String json = new ObjectMapper().writeValueAsString(solution);
                OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
                assert solution != null;
                writer.write(json);
                writer.close();

//                try {
//                    responseBody.put("solution", solution);
//                    responseBody.put("statusCode", 200);
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }
//        try {
//            response.put("body", responseBody);
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }

//        OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
//        writer.write(response.toString());
//        writer.close();

    }

}
