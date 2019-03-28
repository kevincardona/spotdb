import config as cfg
from pymongo import MongoClient
import tweepy
import re
import preprocessor
import contractions
from string import punctuation


def completelyProcess(tweet):
    tweet = fixEncoding(tweet)
    tweet = initialPreprocess(tweet)
    return custom_preprocess(tweet)


def initialPreprocess(tweet):
    return preprocessor.clean(tweet)


def strip_punctuation(tweet):
    return ''.join(c for c in tweet if c not in punctuation)


def strip_rt(tweet):
    tweet = tweet.replace('rt  ', '')
    tweet = tweet.replace(' rt ', '')
    return tweet.replace(' rt', '')


def fix_contractions(tweet):
    return contractions.fix(tweet)


def duplicate_whitespace(tweet):
    return re.sub(' +', ' ', tweet)


def fixIam(tweet):
    return tweet.replace('i\'m', 'I\'m')


def fixEncoding(tweet):
    return str(tweet.encode('ascii', 'ignore'), 'ascii')


def custom_preprocess(tweet):
    tweet = fixIam(tweet)
    tweet = fix_contractions(tweet)
    tweet = strip_punctuation(tweet)
    tweet = strip_rt(tweet)
    tweet = duplicate_whitespace(tweet)
    return tweet


if __name__ == "__main__":
    # auth
    auth = tweepy.OAuthHandler(cfg.api_key, cfg.secret_key)
    auth.set_access_token(cfg.access_token, cfg.access_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)

    # connect to mongo
    client = MongoClient('mongodb://spotdb-admin:SuperSecr3tPasswordb@ds249035.mlab.com:49035/spotdb')
    db = client.spotdb
    collection = db.artists

    # get tweets
    for post in collection.find():
        tweets = []
        artistCollection = db[post['name']]

        # clear all the old tweets
        artistCollection.delete_many({})

        for tweet in tweepy.Cursor(api.search, q=post['name'],
                                   lang='en').items(100):
            tweet_Data = {
                'time': tweet._json['created_at'],
                'text': tweet._json['text']
                }
            tweets.append(tweet_Data)

        # clean tweets
        cleaned_tweets = []
        for tweet in tweets:
            tweet['text'] = completelyProcess(tweet['text'])
            cleaned_tweets.append(tweet)
        artistCollection.insert_many(cleaned_tweets)

    # tests
    # bad_tweet = 'I love music. I\'m cool \U0001F600 \U0001F300 \U0001F680
    # \U0001F1E0. http://twitter.com'
    # bad_tweet = str(bad_tweet.encode('utf-7'), 'utf-7')
    # print("Bad Tweet: " + bad_tweet)
    # processed_tweet = completelyProcess(bad_tweet)
    # print("Processed tweet: " + processed_tweet)
