from pymongo import MongoClient
import config as cfg
client = MongoClient()
db = client.spotdb
collection = db.artists
posts = []

# add posts
# for name in cfg.artist_names:
#     post = {"name": name}
#     posts.append(post)
# post_ids = collection.insert_many(posts)

# see all posts in collection
for post in collection.find():
    print(post)

# delete all
# x = collection.delete_many({})
# print('Deleted Documents')
# print(x.deleted_count)
