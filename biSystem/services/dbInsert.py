from config.db import get_connection

def insert_event(data):
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO tracks (userId, productId, eventType, timeSpent)
            VALUES (%s, %s, %s, %s)
        """, (
            data["clientId"],
            data["productId"],
            data["eventType"],
            data["timeSpent"]
        ))

        conn.commit()
    finally:
        cur.close()
        conn.close()