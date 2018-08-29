# Gossip Girl Wikia Social Network using Python and D3

One of the programming project I tackled this summer was to create a Social Network Force Layout Graph from scratch using Python and D3.js. This was an interesting project and I was able to combine various knowledge I had on algorithms and data visualization. The code can be found on Github <a href="https://github.com/archidisign/Data-Visualization/tree/master/wikia-network">here</a> and the project can be found on my personal website <a href="http://archidisign.github.io/wikia-visualization/index.html">here</a>.<!--more-->
<h3>Choosing the Dataset</h3>
<a href="https://catharticstudent.files.wordpress.com/2018/08/title.gif"><img class="alignnone size-full wp-image-1115" src="https://catharticstudent.files.wordpress.com/2018/08/title.gif" alt="" width="500" height="280" /></a>

For this project, I really wanted to explore the creation of a social network graph, especially of fictional characters I know well. I have watched many TV series in my life and many of them have very detailed wikia pages. I hesitated a bit, but the choice of American show Gossip Girl was easy to make. It is one of the few shows where EVERY character probably had a romantic relationship with each other and even the parents join in on the love affairs. I thought it would give me a complex network to work with and would be a lot more interesting to put under the microscope.
<h3>Web Crawler Using Python</h3>
First of all, I already thought that my project would use one of the many graph algorithms we learned in Data Structures and Algorithms class. I myself am more familiar with Breath First Search and using queue to keep track of which nodes/characters have already been crawled made a lot of sense to me. Luckily I found a similar project by <a href="https://github.com/hardikvasa/wikipedia-crawler" target="_blank" rel="noopener">hardikvasa</a> on Github. His project was more focused on Wikipedia while mine will be more focused on wikia fandom websites. This implies that I had to care about specific characters' links with each other.

In Python, I used the libraries
<pre><code>

import urllib.request
import re
import string

</code></pre>
Below are some example code to easily crawl all the HTML code of a webpage and especially, the tags and information relevant to us. For detailed code, please go on Github.
<pre><code>
headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
req = urllib.request.Request(url, headers = headers)
resp = urllib.request.urlopen(req)
page= str(resp.read())
start = page.find(start_tag)
end = page.find(end_tag, start + 1)
n = len(start_tag)
info = page[start + n : end]
</code></pre>
As with any Breadth First Search, we have to specify a starting webpage to start crawling data. I chose the main character Serena Van Der Woodsen. (SPOILER!) As her character is best friend with nearly all main characters, is sister-in-law with half of the group and even marries one of them, I believed that it would be most interesting to start analyzing from her. After all, the pilot episode also started with her as the center of all attention!
<h3>Visualization Using D3</h3>
D3 is a truly amazing an amazing JavaScript library as it allows you to go as complex as you want with your data visualization. There are a lot of blocks online to get inspiration from and as I am in the process of learning, I kept track of all the resources I found useful for this specific project.

Overall, I first made sure that all nodes are color categorized by season when the character was first introduced and all links are color categorized by relationship between the two nodes. For each, I had color legends added on either side of the Force Layout Graph. Next, for each node, the user can click on each node and will be directed to the Gossip Girl Wikia character page to read more about him/her. Since Serena Van Der Woodsen is the main character and has degree 0, its node is the largest. As the degree of connection increases, the radius of the character node decreases.

As an additional touch, I designed the page to look similar to an actual Gossip Girl Blog layout. It makes the whole project look a lot more professional! ;)

For this project, I got inspired by the following blocks:
<ul>
	<li><a href="https://bl.ocks.org/mbostock/4062045">Force-Directed Graph</a> by Mike Bostock</li>
	<li><a href="http://bl.ocks.org/jose187/4733747">A Simple d3 Network Graph</a> by Jose Christian</li>
	<li>To create a legend
<ul>
	<li><a href="http://bl.ocks.org/emeeks/8855733967174fe4b1b4">d3.svg.legend example</a> by Elijah Meeks</li>
	<li><a href="http://bl.ocks.org/ZJONSSON/3918369">d3.legend example</a> by Ziggy Jonsson</li>
	<li><a href="http://bl.ocks.org/kielni/a4347fe16864903fb9be">d3.legend with line or circle icons</a> by Kimberly Nicholls</li>
</ul>
</li>
	<li>Colors
<ul>
	<li><a href="http://bl.ocks.org/nsonnad/5982652">Colored links in force-directed graph</a> by Nikhil S</li>
	<li><a href="http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d">categorical colors</a> by Ariel Aizemberg</li>
</ul>
</li>
	<li>Helpful Stack Overflow: <a href="https://stackoverflow.com/questions/46206575/typeerror-cannot-read-property-push-of-undefined-d3">01,</a> <a href="https://stackoverflow.com/questions/20644415/d3-appending-text-to-a-svg-rectangle">02</a></li>
</ul>