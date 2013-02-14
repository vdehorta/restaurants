package com.vdehorta.restaurants.server.controller;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vdehorta.restaurants.server.model.Restaurant;
import com.vdehorta.restaurants.server.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

@Controller
@RequestMapping("/restaurants")
public class RestaurantController {
	
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	RestaurantService restaurantService;
	
	@RequestMapping(method=RequestMethod.GET, value="/all")
	public void getAllRestaurant(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Retrieving restaurants...");
		List<Restaurant> l = restaurantService.getAllRestaurant();
		log.info("Write JSON in the output stream of the servlet");
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), l);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/add/{name}/{address}/{description}")
	public void addEarning(@PathVariable String name, @PathVariable String address, @PathVariable String description, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Add new restaurant...");
		restaurantService.addOrUpdateRestaurant(name, address, description);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), null);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/delete/{id}")
	public void removeEarning(@PathVariable Long id, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Delete restaurant...");
		restaurantService.removeRestaurant(id);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), null);
	}

    public void setRestaurantService(RestaurantService service) {
        this.restaurantService = service;
    }
}
