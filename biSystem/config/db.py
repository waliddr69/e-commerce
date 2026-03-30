import os
from dotenv import load_dotenv
import snowflake.connector

load_dotenv()

def get_connection():
    conn = snowflake.connector.connect(
    user=os.getenv("user"),
    password=os.getenv("pass"),
    account=os.getenv("account"),
    database=os.getenv("database"),
    schema=os.getenv("schema"),
    warehouse=os.getenv("warehouse"),
    )
    return conn
