from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from cache import var
from config.db import get_connection

model = SentenceTransformer('all-MiniLM-L6-v2')
def get_products():
    text = []
    products_ids = []
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("select * from products")
    data = cur.fetchall()
    for d in data:
        products_ids.append(d[0])
        text.append(d[1]+" "+d[2]+" "+d[3]+" "+d[4])
    return text,products_ids

def encode_products(new_data=None):
    if(new_data and new_data.get("eventType") == "new_product"):
        var.product_ids.append(new_data["id"])
        text = new_data["name"]+" "+new_data["description"]+" "+new_data["category"]+" "+new_data["subCategory"]
        emb = model.encode([text])
        var.embeddings.append(emb[0])
        var.similarity = cosine_similarity(var.embeddings)

        return var.similarity, var.product_ids
    
    text, products_ids = get_products()
    
    vectors = model.encode(text)
    var.embeddings = list(vectors)
    similarity = cosine_similarity(vectors)
    return similarity, products_ids