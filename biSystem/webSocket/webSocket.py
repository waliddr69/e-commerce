import asyncio
import json
from websockets.asyncio.server import serve
from services.dbInsert import insert_event
async def handle_events(websocket):
    async for message in websocket:
        print("Raw message:", message)

        
        data = json.loads(message)

     
        print("Parsed data:", data)
        insert_event(data)

async def start_server():
    async with serve(handle_events, "localhost", 4000) as server:
        await server.serve_forever()
        await asyncio.Future()
