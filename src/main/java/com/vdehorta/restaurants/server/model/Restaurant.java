package com.vdehorta.restaurants.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class Restaurant implements HasId {

    @Id
	private Long id;

	@JsonProperty
	private String name;

	@JsonProperty
	private String address;

    @JsonProperty
    private String description;
	
	public Restaurant(){}
	
	public Restaurant(Long id, String name, String address, String description){
		this.id = id;
		this.name = name;
		this.address = address;
        this.description = description;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Restaurant) {
            final Restaurant that = (Restaurant) obj;
            return Objects.equal(id, that.id);
        }
        return false;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(Restaurant.class) //
                .add("id", id) //
                .add("name", name) //
                .add("address", address) //
                .add("description", description) //
                .toString();
    }
}
