import asyncio
import json
from websockets.asyncio.server import serve
from services.dbInsert import insert_event, insert_products
from services.analysis import analysis
from services.embedding import encode_products
from cache import var

var.similarity, var.product_ids = encode_products()


async def handle_events(websocket):
   
    async for message in websocket:
        print("Raw message:", message)

        
        data = json.loads(message)

        
        print("Parsed data:", data)
        if(data["eventType"] == "new_product"):
            insert_products(data)
            encode_products(data)
        elif(data["eventType"] == "connection"):
            
            var.clients_dict[data["clientId"]] = websocket
            await analysis(data["clientId"],var.clients_dict[data["clientId"]], var.similarity)
        else:
            insert_event(data)
            await analysis(data["clientId"],var.clients_dict[data["clientId"]], var.similarity) 
           
        

async def start_server():
    async with serve(handle_events, "localhost", 4000) as server:
        await server.serve_forever()
        await asyncio.Future()
        
