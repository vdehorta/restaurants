package com.vdehorta.restaurants.server.dao;

import com.vdehorta.restaurants.server.model.HasId;

import java.util.List;

public interface GenericDAO<E extends HasId> {

	public void addOrUpdate(final E entity);

	public void delete(final E entity);

	public List<E> listAll(final Class<E> clazz);
}
