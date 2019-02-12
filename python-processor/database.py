from pymongo import MongoClient
import config as cfg
client = MongoClient("mongodb+srv://" + cfg.mongo_user + ":"
                    + cfg.mongo_password +
                    "@cluster0-bvmnf.mongodb.net/test?retryWrites=true")
db = client['test-database']
collection = db['test-collection']
print(db.posts)
print(collection)
