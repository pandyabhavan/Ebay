package com.cmpe273.homework1.java;
import java.util.*;


public class Stack_Logic 
{
	Stack<String> stack = new Stack<String>();
	public Stack_Logic()
	{
		
	}
	
	public void pushItem(String st)
	{
		stack.push(st);
		System.out.println("Item Pushed..\n Stack :"+stack);
	}
	
	public void popItem()
	{
		stack.pop();
		System.out.println("Item Popped..\n Stack :"+stack);
	}
	
	public String getElement()
	{
		return stack.peek();
	}
	
	public String reverseString(String str)
	{
		Stack<Character> stack = new Stack<Character>();
        String reversed = "";
        for (int i = 0; i < str.length(); i++) 
        {
            char ch = str.charAt(i);
            stack.push(ch);
        }
        for (int i = 0; i < str.length(); i++) 
        {
            char ch = stack.pop();
            reversed = reversed + ch;
        }
        return reversed;
	}
}