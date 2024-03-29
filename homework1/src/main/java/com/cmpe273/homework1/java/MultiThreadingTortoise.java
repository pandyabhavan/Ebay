package com.cmpe273.homework1.java;

public class MultiThreadingTortoise implements Runnable
{
	Thread t;
	public MultiThreadingTortoise()
	{
		t = new Thread(this);
		t.setPriority(4);
		t.start();
	}
	
	public void run()
	{
		for(int i=0;i<100;i++)
		{
			if(i%10 == 0)
				System.out.println("Tortoise Covered: "+i);
		}
		System.out.println("Tortoise Won");
	}
	
	
	@SuppressWarnings("deprecation")
	public void stopThread()
	{
		try
		{
			t.stop();
		}
		catch(Exception e)
		{
			
		}
	}
}
