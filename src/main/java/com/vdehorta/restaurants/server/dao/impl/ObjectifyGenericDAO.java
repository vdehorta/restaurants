package com.vdehorta.restaurants.server.dao.impl;

import com.google.common.collect.Lists;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.vdehorta.restaurants.server.dao.GenericDAO;
import com.vdehorta.restaurants.server.model.HasId;

import java.util.List;

public class ObjectifyGenericDAO<E extends HasId> implements GenericDAO<E> {
	
	private final static Objectify INSTANCE = ObjectifyService.factory().begin();

	@Override
	public void addOrUpdate(E entity) {
		INSTANCE.save().entity(entity).now();
	}

	@Override
	public void delete(E entity) {
		INSTANCE.delete().type(entity.getClass()).id(entity.getId());
	}

	@Override
	public List<E> listAll(Class<E> clazz) {
		return Lists.newArrayList(INSTANCE.load().type(clazz).list());
	}

}
