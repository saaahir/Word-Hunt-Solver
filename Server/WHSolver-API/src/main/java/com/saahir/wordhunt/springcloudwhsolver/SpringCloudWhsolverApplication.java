package com.saahir.wordhunt.springcloudwhsolver;

import com.saahir.wordhunt.springcloudwhsolver.Controller.wordHuntSolver.Solver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.List;
import java.util.function.Function;

@SpringBootApplication
public class SpringCloudWhsolverApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudWhsolverApplication.class, args);
	}

	@Bean
	public Function<HashMap<String, String>, HashMap<String, List<Integer>>> getSolution() {
		return (input)->Solver.solve(input.get("letters"), Integer.parseInt(input.get("dimensions")));
	}


}
