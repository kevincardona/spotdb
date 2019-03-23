from nltk.tokenize import TweetTokenizer
from gensim.models import Word2Vec
from pymongo import MongoClient

tknzr = TweetTokenizer(strip_handles=True)
model = Word2Vec.load("word2vec.model")
