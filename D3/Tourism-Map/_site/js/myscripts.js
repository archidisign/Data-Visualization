  
var width, height, projection, path, graticule, svg, attributeArray = [], currentAttribute = 0, playing = false;
var width = 1500, height = 500;

var defColor, deffile;

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    var part1 = "<strong>"+d.properties.admin+":</strong> <span style='color:white'>"
    return  part1 + d.properties[attributeArray[currentAttribute]].toLocaleString('en', {useGrouping:true}) + "</span>";
  })

function ld1(){
  deffile = "/data/arrivals_R.csv"
  defColor = '#000033'
  setMap();
}
function ld2(){
  deffile = "/data/departures_R.csv"
  defColor = '#e59400'
  setMap();
}

function init() {
  ld1();
}

function setMap() {

  width = 960, height = 580;

  projection = d3.geo.eckert5()   
    .scale(170)
    .translate([width / 2, height / 2])
    .precision(.1);

  path = d3.geo.path()  
    .projection(projection);  

  graticule = d3.geo.graticule(); 
  d3.select("svg").remove()
  svg = d3.select("#map").append("svg")   
      .attr("width", width)
      .attr("height", height)

  svg.call(tip);

  svg.append("defs").append("path")   
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

  svg.append("use")   
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

  svg.append("path")    
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  loadData();  
}

function loadData() {
  queue()   
    .defer(d3.json, "/data geo/world-topo.json")  
    .defer(d3.csv, deffile)  
    .await(processData);   
                           
}

function processData(error,world,countryData) {
  
  

  var countries = world.objects.countries.geometries;  
  for (var i in countries) {    
    for (var j in countryData) {  
      if(countries[i].properties.id == countryData[j].id) {   
        for(var k in countryData[j]) {   
          if(k != 'id' && k != 'name') {  
            if(attributeArray.indexOf(k) == -1) { 
               attributeArray.push(k);  
            }
            countries[i].properties[k] = Number(countryData[j][k])
            parseFloat(Math.round(countries[i].properties[k] * 10000) / 10000).toFixed(4)
          }
        }
        break;  
      }
    }
  }
  drawMap(world);  
}

function drawMap(world) {

    svg.selectAll(".country")   
      .data(topojson.feature(world, world.objects.countries).features)  
      .enter().append("path") 
      .attr("class", "country") 
      .attr("id", function(d) { return "code_" + d.properties.id; }, true)  
      .attr("admin", function(d) { return d.properties.admin; }, true)  
      .attr("d", path) 
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    var dataRange = getDataRange(); 
    d3.selectAll('.country')  
    .attr('fill', function(d) {
        
        return getColor(d.properties[attributeArray[currentAttribute]], dataRange);  
    });

}

function getColor(valueIn, valuesIn) {
  var max_val = Math.max(1, valuesIn[0]);
  var color = d3.scale.sqrt() 
    .domain([max_val, valuesIn[1]])  
    .range([d3.rgb("#FFFFFF"), d3.rgb(defColor)]);

  if(typeof(valueIn) !== 'undefined'){
    return color(valueIn);
  }
  else{
    return "#d3d3d3";
  }
}

function getDataRange() {
  
  

  var min = Infinity, max = -Infinity;  
  d3.selectAll('.country')
    .each(function(d,i) {
      var currentValue = d.properties[attributeArray[currentAttribute]];
      if(currentValue <= min && currentValue != -99 && currentValue != 'undefined') {
        min = currentValue;
      }
      if(currentValue >= max && currentValue != -99 && currentValue != 'undefined') {
        max = currentValue;
      }
  });
  return [min,max];  
}


(function() {
    
    var output = d3.select("#output");

    
    d3.select('#sequence')
        .on('input', function(d) { 
            output.html(+this.value)  
            attributeArray[currentAttribute]=this.value;
            loadData(); 
        });
})();

window.onload = init();  