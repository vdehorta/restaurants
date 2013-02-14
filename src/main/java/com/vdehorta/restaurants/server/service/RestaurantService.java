package com.vdehorta.restaurants.server.service;

import com.vdehorta.restaurants.server.dao.RestaurantDAO;
import com.vdehorta.restaurants.server.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class RestaurantService {
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
    RestaurantDAO restaurantDAO;
	
	public List<Restaurant> getAllRestaurant(){
		log.info("SRV : Get all Restaurant");
		return restaurantDAO.listAll();
	}
	
	public void addOrUpdateRestaurant(String name, String address, String description){
		log.info("SRV : Add new Restaurant");
		restaurantDAO.addOrUpdate(new Restaurant(null, name, address, description));
	}

	public void removeRestaurant(Long id) {
		log.info("SRV : Remove Restaurant");
        final Restaurant restaurant = new Restaurant(id, null, null, null);
        restaurantDAO.delete(restaurant);
	}
}
