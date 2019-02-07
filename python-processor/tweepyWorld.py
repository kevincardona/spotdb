import tweepy
import config as cfg

counter = 0


class MyStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        try:
            print(status.extended_tweet['full_text'])
        except:
            print(status.text)


auth = tweepy.OAuthHandler(cfg.api_key, cfg.secret_key)

auth.set_access_token(cfg.access_token, cfg.access_secret)

api = tweepy.API(auth)

myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
myStream.filter(languages=["en"], track=['pizza'])
