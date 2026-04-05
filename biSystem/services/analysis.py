import json

from config.db import get_connection
from cache import var

async def analysis(client,websocket,similarity):
    conn = get_connection()
    cur = conn.cursor()
    if(not client):
        return
    
    cur.execute("select distinct t.productId, t.eventType, t.timeSpent, t.query from tracks t left join products p on p.id = t.productId where t.userId = %s", (client,))
    data = cur.fetchall()
        
    
    clicks = []
    searches = []
    purchases = []
    for i in data:
        if(i[1] == "click" and i[2] >= 3):
            clicks.extend(content_based_recommendation_clicks(i[0],similarity))
        if(i[1] == "search"):
            searches.extend(content_based_recommendation_searches(i[3]))
        if(i[1] == "purchase"):
            purchases.extend(collaborative_based_recommendation(i[0],client))
            
                
            
    await websocket.send(json.dumps({"clicks": list(set(clicks)),"searches":list(set(searches)),"purchases":list(set(purchases))}))   
            
        


def content_based_recommendation_clicks(product_id,similarity):
    index = var.product_ids.index(product_id)
   
    results =[]
    #results = [var.product_ids[i] for i in range(len(similarity[index])) if i!=index and similarity[index][i]>=0.6]
    for i in range(len(similarity[index])):
        
        if i != index and similarity[index][i] >= 0.6:
            results.append(var.product_ids[i])
    
    return results

def content_based_recommendation_searches(query):
    print(query)
    results = []
    cur = get_connection().cursor()
    cur.execute("select id, name, description, category, subCategory from products where name like %s or description like %s or category like %s or subCategory like %s",(f"%{query}%",f"%{query}%",f"%{query}%",f"%{query}%"))
    
    data = cur.fetchall()
    
    results = [d[0] for d in data]
    
    return results

def collaborative_based_recommendation(productId,clientid):

    results = []
    cur = get_connection().cursor()
    cur.execute("""select 
    t2.productid,
    COUNT(*) as score
    from tracks t1
    join tracks t2 
    on t1.userId = t2.userId
    where 
    t1.productid = %s
    and t1.eventtype = 'purchase'
    and t2.eventtype = 'purchase'
    and t2.productid != t1.productid
    and t2.productid not in(
        select productid from tracks where userid = %s
    )
    group by t2.productid
    order by score desc;""",(productId,clientid))
    
    data = cur.fetchall()
    
    results = [d[0] for d in data]
    
    return results
    
    
    

        

    
    