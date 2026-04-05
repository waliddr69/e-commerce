

from config.db import get_connection



def insert_products(data):
    conn = get_connection()
    cur = conn.cursor()
    
    
    cur.execute("insert into products (id,name,description,price,category,subCategory) values (%s, %s, %s, %s, %s, %s)", (
            data["id"],
            data["name"],
            data["description"],
            data["price"],
            data["category"],
            data["subCategory"]
           
     )
    )
    conn.commit()
    cur.close()
    

def insert_event(data):
    conn = get_connection()
    cur = conn.cursor()
  

    try:
        if(data["eventType"] == "click"):
           
            cur.execute("""
            INSERT INTO tracks (userId, productId, eventType, timeSpent)
            VALUES (%s, %s, %s, %s)
            """, (
            data["clientId"],
            data["productId"],
            data["eventType"],
            data["timeSpent"]
            ))
        elif(data["eventType"] == "search"):
            data["timeSpent"] = 0   
            cur.execute("""
                    insert into tracks (userId, query, eventType, timespent)
                    values (%s, %s, %s, %s)
                    """, (
                        data["clientId"],
                        data["query"],
                        data["eventType"],
                        data["timeSpent"]
                    ))
        elif(data["eventType"] == "purchase"):
            
            data["timeSpent"] = 0
            for product in data["productId"]:
                cur.execute("""
                        insert into tracks (userId, productId, eventType, timespent)
                        values (%s, %s, %s, %s)
                        """, (
                            data["clientId"],
                            product,
                            data["eventType"],
                            data["timeSpent"]
                        ))
        
       
            
        

        conn.commit()
    finally:
        cur.close()
        conn.close()