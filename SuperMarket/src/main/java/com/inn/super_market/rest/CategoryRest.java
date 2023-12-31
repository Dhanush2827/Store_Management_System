package com.inn.super_market.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.inn.super_market.POJO.Category;

@RequestMapping(path ="/category")
public interface CategoryRest {
	
	
	@PostMapping(path ="/add")
	public ResponseEntity<String> addNewCategory(@RequestBody(required=true)Map<String,String>requestMap);
	


	@GetMapping(path= "/get")
	public ResponseEntity<List<Category>> getAllCategory(@RequestBody(required=false)String filterValue);
	
	@PostMapping(path ="/update")
	public ResponseEntity<String> updateCategory(@RequestBody(required=true)Map<String,String>requestMap);
	
	
}
