package com.cmpe273.homework1.java;

import java.util.HashMap;

public class HashMap_Logic 
{
	HashMap<Integer,String> loggedIn = new HashMap<Integer, String>();
	static Integer i = 0;
	
	public void addUser(String username)
	{
		loggedIn.put(++i, username);
	}
	
	public void deleteUser(Integer key)
	{
		loggedIn.remove(key);
	}
	
	public String getUser(Integer key)
	{
		return loggedIn.get(key);
	}
}