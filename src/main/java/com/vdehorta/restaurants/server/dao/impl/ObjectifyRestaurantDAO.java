package com.vdehorta.restaurants.server.dao.impl;

import com.googlecode.objectify.ObjectifyService;
import com.vdehorta.restaurants.server.dao.RestaurantDAO;
import com.vdehorta.restaurants.server.model.Restaurant;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("restaurantDAO")
public class ObjectifyRestaurantDAO extends ObjectifyGenericDAO<Restaurant> implements RestaurantDAO {

	static {
		ObjectifyService.register(Restaurant.class);
	}
	
	@Override
	public List<Restaurant> listAll() throws RuntimeException, Error {
		return super.listAll(Restaurant.class);
	}

}
