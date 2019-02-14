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
    auth = tweepy.OAuthHandler(cfg.api_key, cfg.secret_key)

    auth.set_access_token(cfg.access_token, cfg.access_secret)

    api = tweepy.API(auth)
    limit = None
    tweets = []
    for tweet in tweepy.Cursor(api.search, q='Drake', lang='en').items(10):
        tweets.append(tweet._json['text'])

    cleaned_tweets = []
    for tweet in tweets:
        cleaned_tweets.append(completelyProcess(tweet))
    print(cleaned_tweets)

    bad_tweet = 'I love music. I\'m cool \U0001F600 \U0001F300 \U0001F680 \U0001F1E0. http://twitter.com'
    print("Bad Tweet: " + bad_tweet)
    bad_tweet = str(bad_tweet.encode('utf-7'), 'utf-7')
    print(bad_tweet)
    processed_tweet = completelyProcess(bad_tweet)
    print("Processed tweet: " + processed_tweet)
