import asyncio

from webSocket.webSocket import start_server

async def main():
    
    await start_server()

asyncio.run(main())