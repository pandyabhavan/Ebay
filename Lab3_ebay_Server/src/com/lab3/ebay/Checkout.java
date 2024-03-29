package com.lab3.ebay;

import java.sql.ResultSet;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class Checkout {

	@WebMethod
	public int deleteCart(String user_id,String item_id)
	{
		return MySQL.updateData("delete from cart where user_id="+user_id+" and item_id = "+item_id+"");
	}

	@WebMethod
	public int updateItem(String quantity,String item_id)
	{
		return MySQL.updateData("update item set quantity_remaining = quantity_remaining-"+quantity+" where id = "+item_id+"");
	}

	@WebMethod
	public int insertBuySell(String user_id,String quantity,String item_id)
	{
		try
		{
			ResultSet rs = MySQL.fetchResultSet("select user_id from item where id = "+item_id+"");

			String user_id1 = "0";
			while(rs.next())
			{
				user_id1 = rs.getString(1);
			}

			return MySQL.updateData("insert into buy_sell (seller_id,buyer_id,item_id,quantity,purchase_date) values("+user_id1+","+user_id+","+item_id+","+quantity+",now())");
		}
		catch(Exception e)
		{
			System.out.println(e);
			return 0;
		}
	}
}
