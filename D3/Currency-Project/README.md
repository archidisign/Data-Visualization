<h1> World Currency Change Map </h1>

This D3 based project takes the OECD Exchange Rates dataset to calculate the annual currency exchange rate of 51 countries from 1960 to 2016. After cleaning and calculating the annual change values, the data is then mapped on a TopoJSON world map using the D3 JavaScript Library. In the world, there are 180 different currencies and 196 different countries. Furthermore, not all years were tracked by OECD when it comes to exchange rate. We are hence working with an incomplete dataset; the regions colored in grey. Please read the blog post for more detail on this project.

<h3>1) Finding the Dataset</h3>
When you look at the stock market, you will see that a stock's value fluctuates daily with its change being marked by a percentage: in green if it rose, in red if it decreased. I was curious to see how these stats stand for Currency values around the world. After all, the exchange rate of a country is also tracked daily and is one of many ways to see how well the country is developing. Sadly, there weren't many clean dataset to use out there. I finally settle down with the OECD Exchange Rates Dataset. It has the values of 51 countries, from 1950 to 2016. In the world, there are 180 different currencies and 196 different countries. Furthermore, not all years were tracked by OECD when it comes to exchange rate. We are hence working with an incomplete dataset. Exchange rates are defined as the price of one country's' currency in relation to another. In this case, all data were compiled relatively to the value of the United States' dollar (USD). Hence, for U.S.A, the value is always 1. You can see and download the whole dataset <a href="https://data.oecd.org/conversion/exchange-rates.htm">here</a>.
<h3>2) Data Cleaning Using EXCEL</h3>
First, I used Microsoft EXCEL to clean the data. The countries were already marked by their Location ID, which makes it to map later on. I did a calculation between each of the numbers as I am not interested by the actual value of the exchange rate. Instead, I am more interested by how the change varies. Hence, I did:

<a href="https://catharticstudent.files.wordpress.com/2017/08/1.jpg"><img class="size-full wp-image-779 aligncenter" src="https://catharticstudent.files.wordpress.com/2017/08/1.jpg" alt="" width="154" height="45" /></a>

In this case, the previous year's exchange rate is X_t-1 and the current year is X_t. For the first available year per country, the change percentage was caliber-ed to 0. As for countries with no value for one year, they were kept at undefined or NaN. These are the percentages used for the mapping.

Notice that this method is good in the sense that it allows us to see how fast a country's currency is gaining value compared to others. If we kept the values as they are, we would have some countries being way lower then they actually are. For example, South Korea is known to be a well developed country and sells 1kg of apples for <span class="city-1">₩6,513 or $5.78. You can automatically see that even if the value of the Won is less than the Dollar, what that money converted can buy in both countries is similar.</span>

Finally, using Pivot Table functions in EXCEL, the new dataset was built and then converted into a large .csv file.
<h3>3) Map Creation Using D3</h3>
I first started by adapting my code to follow this <a href="https://gist.github.com/rgdonohue/9280446">Tutorial </a>such that it would work on it. However, this was a less interactive model as the user can't pick the year it wants to see. Luckily through searching around Github, bl.ocks and Stackoverflow, I was able to implement everything I wanted. You can find the code directly on my Github here.
<h4>A) Creating a UI Timeline</h4>
<a href="https://catharticstudent.files.wordpress.com/2017/08/timeline.png"><img class="alignnone size-full wp-image-781" src="https://catharticstudent.files.wordpress.com/2017/08/timeline.png" alt="" width="820" height="79" /></a>
<h4>B) Changing the Color Scale of Countries</h4>
<code> var color = d3.scale.linear() // create a linear scale</code>
<code>    .domain([valuesIn[0], 0, valuesIn[1]])  // input uses min and max values</code>
<code>    .range([d3.rgb("#FF0000"), d3.rgb("#FFFFFF"),d3.rgb('#00FF00')]);</code>
<h4>C) Show Data On Hover</h4>
<a href="https://catharticstudent.files.wordpress.com/2017/08/tip.png"><img class="alignnone size-full wp-image-780" src="https://catharticstudent.files.wordpress.com/2017/08/tip.png" alt="" width="820" height="352" /></a>
<h3>Final note:</h3>
<a href="https://catharticstudent.files.wordpress.com/2017/08/full.png"><img class="alignnone size-full wp-image-782" src="https://catharticstudent.files.wordpress.com/2017/08/full.png" alt="" width="820" height="379" /></a>

For this project, I learned how to:
<ul>
 	<li>Compress Javascript files: <a href="https://stackoverflow.com/questions/15694098/compress-javascript-in-windows">link</a></li>
</ul>
<p style="text-align: center;"><code> java -jar path\to\yuicompressor-x.y.z.jar myfile.js -o myfile-min.js </code></p>

<ul>
 	<li>Check the animated side of my project by running in the right directory</li>
</ul>
<p style="text-align: center;"><code> python -m http.server 8008 </code></p>
