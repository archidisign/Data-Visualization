# README
Data source: World Development Indicators (Updated on 1/25/2018) <a href="https://data.worldbank.org/indicator/ST.INT.ARVL">Link</a>

International tourism, number of departures

International tourism, number of arrivals

Note about dataset:

International outbound tourists are the number of departures that people make from their country of usual residence to any other country for any purpose other than a remunerated activity in the country visited. The data on outbound tourists refer to the number of departures, not to the number of people traveling. Thus a person who makes several trips from a country during a given period is counted each time as a new departure.

International inbound tourists (overnight visitors) are the number of tourists who travel to a country other than that in which they have their usual residence, but outside their usual environment, for a period not exceeding 12 months and whose main purpose in visiting is other than an activity remunerated from within the country visited. When data on number of tourists are not available, the number of visitors, which includes tourists, same-day visitors, cruise passengers, and crew members, is shown instead. Sources and collection methods for arrivals differ across countries. In some cases data are from border statistics (police, immigration, and the like) and supplemented by border surveys. In other cases data are from tourism accommodation establishments. For some countries number of arrivals is limited to arrivals by air and for others to arrivals staying in hotels. Some countries include arrivals of nationals residing abroad while others do not. Caution should thus be used in comparing arrivals across countries. The data on inbound tourists refer to the number of arrivals, not to the number of people traveling. Thus a person who makes several trips to a country during a given period is counted each time as a new arrival.

Note about data directory:
- arrivals.csv: Original dataset from World Development Indicators
- arrival_rev.csv: Putting countries as attributes/columns; years as tuples/rows
- arrival_R.csv: Removing undesired tuples/rows (if they are not countries)
- departures.csv: Original dataset from World Development Indicators
- departure_rev.csv: Putting countries as attributes/columns; years as tuples/rows
- departures_R.csv: Removing undesired tuples/rows (if they are not countries)