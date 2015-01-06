//global variables
  var w = 960,
      h = 460;

//Points used
  var vertices = [[300,100],[400, 400],[260,260]];

//create svg
  var svg = d3.select("#chart")
    .append("svg:svg")
      .attr("width", w)
      .attr("height", h);

//Set Variables for clips, points, paths
  var paths, points, clips;

  clips = svg.append("svg:g").attr("id", "point-clips");
  points = svg.append("svg:g").attr("id", "points");
  paths = svg.append("svg:g").attr("id", "point-paths");
 
//Creates(...and clips?) Radius
  clips.selectAll("clipPath")
      .data(vertices)
    .enter().append("svg:clipPath")
      .attr("id", function(d, i) { return "clip-"+i;})
    .append("svg:circle")
      .attr('cx', function(d) { return d[0]; })
      .attr('cy', function(d) { return d[1]; })
      .attr('r', 1000);

//Create Voronoi?
  paths.selectAll("path")
      .data(d3.geom.voronoi(vertices))
    .enter().append("svg:path")
      .attr("d", function(d) { return "M" + d.join(",") + "Z"; })
      .attr("id", function(d,i) { 
        return "path-"+i; })
      .attr("clip-path", function(d,i) { return "url(#clip-"+i+")"; })
      .style("fill", d3.rgb(230, 230, 230))
      .style('fill-opacity', 0.4)
      .style("stroke", d3.rgb(200,200,200));

//Interaction
  paths.selectAll("path")
    .on("mouseover", function(d, i) {
      d3.select(this)
        .style('fill', d3.rgb(31, 120, 180));
      svg.select('circle#point-'+i)
        .style('fill', d3.rgb(31, 120, 180))
    })
    .on("mouseout", function(d, i) {
      d3.select(this)
        .style("fill", d3.rgb(230, 230, 230));
      svg.select('circle#point-'+i)
        .style('fill', 'black')
    });

//Creates points?
  points.selectAll("circle")
      .data(vertices)
    .enter().append("svg:circle")
      .attr("id", function(d, i) { 
        return "point-"+i; })
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      .attr("r", 2)
      .attr('stroke', 'none');
