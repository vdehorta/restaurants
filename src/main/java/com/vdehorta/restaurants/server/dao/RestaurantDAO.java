package com.vdehorta.restaurants.server.dao;

import com.vdehorta.restaurants.server.model.Restaurant;

import java.util.List;

public interface RestaurantDAO extends GenericDAO<Restaurant> {

	public void addOrUpdate(Restaurant article) throws RuntimeException, Error;
	public void delete(Restaurant article) throws RuntimeException, Error;
	public List<Restaurant> listAll() throws RuntimeException, Error;
}
