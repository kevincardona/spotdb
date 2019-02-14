from pymongo import MongoClient
client = MongoClient()
db = client.local
collection = db.artists
names = ['Drake', 'Lady Gaga', 'Justin Bieber', 'Rush', 'Chance the Rapper',
         'Ski Mask the Slump God', 'Kanye', 'Migos', 'Green Day']
posts = []

# add posts
for name in names:
    post = {"name": name}
    posts.append(post)
post_ids = collection.insert_many(posts)

# see all posts in collection
for post in collection.find():
    print(post)

# delete all
# x = collection.delete_many({})
# print('Deleted Documents')
# print(x.deleted_count)
