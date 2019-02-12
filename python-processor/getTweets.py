import config as cfg
import tweepy
import re
import preprocessor
import contractions
from string import punctuation
from nltk.tokenize import TweetTokenizer
from gensim.models import Word2Vec


tknzr = TweetTokenizer(strip_handles=True)
model = Word2Vec.load("word2vec.model")


def initialPreprocess(tweet):
    return preprocessor.clean(tweet)


def strip_punctuation(tweet):
    return ''.join(c for c in tweet if c not in punctuation)


def strip_rt(tweet):
    tweet = tweet.replace('rt  ', '')
    return tweet.replace(' rt ', '')


def fix_contractions(tweet):
    return contractions.fix(tweet)


def duplicate_whitespace(tweet):
    return re.sub(' +', ' ', tweet)


def custom_preprocess(tweet):
    tweet = fix_contractions(tweet)
    tweet = strip_punctuation(tweet)
    tweet = strip_rt(tweet)
    tweet = duplicate_whitespace(tweet)
    return tweet


class MyStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        try:
            tweet = status.extended_tweet['full_text']
        except:
            tweet = status.text
        tweet = initialPreprocess(tweet)
        tweet = custom_preprocess(tweet)
        tweetArray = tweet.split(' ')
        print(tweet)
        for word in tweetArray:
            if word in model.wv.vocab:
                print('good')

auth = tweepy.OAuthHandler(cfg.api_key, cfg.secret_key)

auth.set_access_token(cfg.access_token, cfg.access_secret)

api = tweepy.API(auth)

myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
myStream.filter(languages=["en"], track=['pizza'])
