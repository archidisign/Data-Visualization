//globals
var width, height, projection, path, graticule, svg, attributeArray = [], currentAttribute = 0, playing = false;
var width = 1500, height = 500;
//var formatPercent = d3.format(".0%");
var deffile;
var color = d3.scale.category20b();

function ld1(){
  deffile = "/data clean/arrival_test.csv"
  start();
}
function ld2(){
  deffile = "/data clean/departure_test.csv"
  start();
}

function init() {
  ld1();
}

function start() {
  Plotly.d3.csv(deffile, function(data){
    function unpack(data, key, ind) {
      if(ind == 1){ //return the column
        return data.map(function(row){return row[key]; });
      }
      else{ //return the row
        //return data.filter(function(row){return row[0]=='id'; });
        return d3.keys(data[0]).filter(function(col) { return (col !== "id");});
      }
    }
    var year_list = unpack(data, 'id', 1);
    var country_list = unpack(data, 'id', 2)
    function def_country(country, color){
      trace = {
        type: "scatter",
        opacity: 0.5,
        mode: "lines",
        name: country,
        x: year_list,
        y: unpack(data, country, 1),
        line: {
          color: color,
          width: 7
        }
      }
      return trace
    }
    var df = []
    for(var i=0; i<country_list.length; i++){
      df[i] = def_country(country_list[i], color(country_list[i]));
    }
    
    var layout = {
      title: 'Arrival and Departure dataset from 1995 to 2016 for All Countries with Rangeslider',
      xaxis: {
        autorange: true,
        range: ['1995', '2016'],
        rangeslider: {range: ['1995', '2016']},
        type: 'year'
      },
      yaxis: {
        autorange: true,
        range: [86.8700008333, 138.870004167],
        type: 'linear'
      }
    };
    Plotly.newPlot('myDiv', df, layout);
  })
}

window.onload = init();