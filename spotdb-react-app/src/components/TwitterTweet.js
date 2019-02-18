import React from 'react';
import '../layouts/Twitter.css';

const TwitterTweet = ({ text, picture, name, user, date, url }) => {
	return (
		<blockquote className="twitter-tweet" 
				data-theme="dark" 
				data-link-color="#2ECDB7"
				data-width="550"
				data-align="center">
			<p lang="en" dir="ltr">
				{text}
				{picture && <a href={picture}>{picture}</a>}
			</p>
			&mdash; {name} (@{user}) <a href={url}>{date}</a>
		</blockquote>
	);
};

export default TwitterTweet;

// <blockquote class="twitter-tweet" data-theme="dark" data-link-color="#2ECDB7"><p lang="en" dir="ltr">Watch <a href="https://twitter.com/hashtag/AStarIsBorn?src=hash&amp;ref_src=twsrc%5Etfw">#AStarIsBorn</a> on <a href="https://twitter.com/iTunes?ref_src=twsrc%5Etfw">@iTunes</a> now 🌟 <a href="https://t.co/nNIj2MPHvj">https://t.co/nNIj2MPHvj</a> <a href="https://t.co/nNC6hb5vqC">pic.twitter.com/nNC6hb5vqC</a></p>&mdash; Lady Gaga (@ladygaga) <a href="https://twitter.com/ladygaga/status/1096469047024050176?ref_src=twsrc%5Etfw">February 15, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
// <blockquote class="twitter-tweet" data-theme="dark" data-link-color="#2ECDB7"><p lang="en" dir="ltr">This Cardi B/Bruno Mars Please Me is a whoooole mood 😩.</p>&mdash; Honey 🌺🌸 (@mimiJai__) <a href="https://twitter.com/mimiJai__/status/1096798069029511168?ref_src=twsrc%5Etfw">February 16, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>