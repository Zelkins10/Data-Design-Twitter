# code pour La fréquence de 100 mots les plus importants relevés dans
# 1000 tweets récents sur le sujet "twitter+algorithm",
# après la suppression des URL et des mots "vides" (stop words)

# reference page
# https://www.earthdatascience.org/courses/use-data-open-source-python/intro-to-apis/calculate-tweet-word-frequencies-in-python/

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import itertools
import collections

import tweepy as tw
import nltk
from nltk.corpus import stopwords
import re
import networkx

import warnings
warnings.filterwarnings("ignore")

sns.set(font_scale=1.5)
sns.set_style("whitegrid")

consumer_key= 'kNCBAOvXkb4xZohbldgkoyToG' # insert your key here
consumer_secret= 'UARxx9SRW7TDXafL7AlN9ktrFWJWLtMWFbbMlUC9g9JUThKlAU' # insert your secret key here
access_token= None
access_token_secret= None

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

search_term = "#twitter+algorithm -filter:retweets"

tweets = tw.Cursor(api.search_tweets,
                   q=search_term,
                   lang="en",
                   result_type="recent").items(1000)

all_tweets = [tweet.text for tweet in tweets]

def remove_url(txt):
    """Replace URLs found in a text string with nothing 
    (i.e. it will remove the URL from the string).

    Parameters
    ----------
    txt : string
        A text string that you want to parse and remove urls.

    Returns
    -------
    The same txt string with url's removed.
    """

    return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", txt).split())


#  remove urls
all_tweets_no_urls = [remove_url(tweet) for tweet in all_tweets]

# print(all_tweets_no_urls)

# split and lower case
words_in_tweet = [tweet.lower().split() for tweet in all_tweets_no_urls]

# Remove stop words
#--------------------------

nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

for all_words in words_in_tweet:
    for word in all_words:
        # remove stop words
        tweets_nsw = [[word for word in tweet_words if not word in stop_words]
              for tweet_words in words_in_tweet]

tweets_nsw[0]

all_words_nsw = list(itertools.chain(*tweets_nsw))

counts_nsw = collections.Counter(all_words_nsw)

# create the Pandas Dataframe and plot the word frequencies without the stop words.

clean_tweets_nsw = pd.DataFrame(counts_nsw.most_common(100),
                             columns=['words', 'count'])

fig, ax = plt.subplots(figsize=(8, 8))

# # Plot horizontal bar graph
# clean_tweets_nsw.sort_values(by='count').plot.barh(x='words',
#                       y='count',
#                       ax=ax,
#                       color="purple")

# ax.set_title("Common Words Found in Tweets (Without Stop Words)")

# plt.show()

clean_tweets_nsw.to_csv('twitter.csv', index=False)
print('csv saved')

#--------------------------

# # List of all words across tweets
# all_words_no_urls = list(itertools.chain(*words_in_tweet))

# # Create counter
# counts_no_urls = collections.Counter(all_words_no_urls)

# clean_tweets_no_urls = pd.DataFrame(counts_no_urls.most_common(100),
#                              columns=['words', 'count'])
# print(clean_tweets_no_urls)

#--------------------------




