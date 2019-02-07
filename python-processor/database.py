from pymongo import MongoClient
import config as cfg
client = MongoClient("mongodb+srv://" + cfg.mongo_user + ":"
                    + cfg.mongo_password +
                    "@cluster0-bvmnf.mongodb.net/test?retryWrites=true")
print(client.test)
