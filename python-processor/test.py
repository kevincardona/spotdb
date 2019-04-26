import unittest
from pymongo import MongoClient
import config as cfg
client = MongoClient(cfg.mongo_connection)


class TestStringMethods(unittest.TestCase):
    global db
    db = client.spotdb

    def testArtistsExists(self):
        self.assertIn('artists', db.list_collection_names())

    def testAllArtistsPresent(self):
        collection = db.artists
        collection.names
        counter = 0
        for post in collection.find():
            self.assertEqual(post['name'], cfg.artist_names[counter])
            counter = counter + 1

    def testEachArtistDbExists(self):
        collectionList = db.list_collection_names()
        for name in cfg.artist_names:
            self.assertIn(name, collectionList)

    def testEachArtistDbPopulated(self):
        counter = 0
        for name in cfg.artist_names:
            tweetListLength = db[cfg.artist_names[counter]].count_documents
            self.assertNotEqual(tweetListLength, 0)
            counter = counter + 1


if __name__ == '__main__':
    unittest.main()
