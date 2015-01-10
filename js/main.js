/****** GLOBAL VARIABLES *******/
var mapWidth = 960, mapHeight = 460; //map frame dimension


/*---*******---END OF GLOBAL VARIABLES---*******---*/
//--------------------------------------------------/

window.onload = initialize();

function initialize(){
	setMap();
};

function setMap(){

	var width = 960, height = 460;

	var projection = d3.geo.albers()
	   .center([0, 43.0736])
	   .rotate([89.3988])
	   .parallels([50, 60])
   	   .scale(1800000)
 	   .translate([width / 2, height / 2])

	var path = d3.geo.path()
		.projection(projection);

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)

	queue()
		.defer(d3.json, "data/madison.json")
		.defer(d3.json, "data/sandwichshops.topojson")
		.await(ready);

	function ready(error, mad, shops){
		svg.append("path")
			.datum(topojson.feature(mad, mad.objects.MadisonBuildings))
			.attr("class", "buildings")
			.attr("d", path);

		svg.append("path")
			.datum(topojson.feature(mad, mad.objects.MadisonWater))
			.attr("class", "water")
			.attr("d", path);		

		console.log(shops)

		for (var i=0; i<shops.objects.collection.geometries.length; i++){
			svg.insert("path", ".madshops")
			.datum(topojson.feature(shops, shops.objects.collection.geometries[i]))
			.attr("class", "shops")
			.attr("d", path.pointRadius([2]))
			.append("g");
		};


		// svg.append("circle")
		// 	.data(shops.features)
		// 	.enter()
		// 	.append("circle")
		// 	.attr("class", "shops")
		// 	.attr("d", path.pointRadius([100]))
		};

		// GenerateVonoroi(shops)
	};

function GenerateVonoroi(shops){
};

// Utilities, working thoughts

//Shows that this code can indeed reprojcet these points...
//=====================================================
		// for (var i=0; i<shops.features.length; i++){
		// 	console.log(projection(shops.features[i].geometry.coordinates))
		// }

// Voronoi Code that works fine on its own.
//=========================================================


// d3.selectAll(".shops").each(function(d, i){
//     console.log( d3.select(this).attr("x"))
//   });


// 	var paths, points, clips;

// 	clips = map.append("svg:g").attr("id", "point-clips");
// 	points = map.append("svg:g").attr("id", "points");
// 	paths = map.append("svg:g").attr("id", "point-paths");		


// //-------------------------------------------

// 	clips.selectAll("clipPath")
// 		.data(vertices)
// 		.enter()
// 		.append("svg:clipPath")
// 		.attr("id", function(d, i){return "clip-"+i;})
// 		.append("svg:circle")
// 		.attr('cx', function(d){return d[0];})
// 		.attr('cy', function(d){return d[1];})
// 		.attr('r', 700);

//   paths.selectAll("path")
//       .data(d3.geom.voronoi(vertices))
//     .enter().append("svg:path")
//       .attr("d", function(d) { return "M" + d.join(",") + "Z"; })
//       .attr("id", function(d,i) { 
//         return "path-"+i; })
//       .attr("clip-path", function(d,i) { return "url(#clip-"+i+")"; })
//       .style("fill", d3.rgb(230, 230, 230))
//       .style('fill-opacity', 0.4)
//       .style("stroke", d3.rgb(200,200,200));

//   paths.selectAll("path")
//     .on("mouseover", function(d, i) {
//       d3.select(this)
//         .style('fill', d3.rgb(31, 120, 180));
//       svg.select('circle#point-'+i)
//         .style('fill', d3.rgb(31, 120, 180))
//     })
//     .on("mouseout", function(d, i) {
//       d3.select(this)
//         .style("fill", d3.rgb(230, 230, 230));
//       svg.select('circle#point-'+i)
//         .style('fill', 'black')
//     });