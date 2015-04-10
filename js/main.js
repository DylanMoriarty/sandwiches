/****** GLOBAL VARIABLES *******/
var width = 840, height = 460;

/*---*******---END OF GLOBAL VARIABLES---*******---*/
//--------------------------------------------------/

window.onload = initialize();

function initialize(){
	setMap();
};

function setMap(){

	var projection = d3.geo.albers()
		.center([0, 43.0736])
		.rotate([89.3965])
		.parallels([50, 60])
	    .scale(1800000)
	    .translate([width / 2, height / 2])

	var path = d3.geo.path()
		.projection(projection);

	// var voronoi = d3.geom.voronoi()
	//     .x(function(d) { return d.x; })
	//     .y(function(d) { return d.y; })
	//     .clipExtent([[0, 0], [width, height]]);

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)

	queue()
		.defer(d3.json, "data/voronoi.json")
		.defer(d3.json, "data/madison.json")
		.defer(d3.csv, "data/sandwiches.csv")
		.await(ready);

	function ready(error, voronoi, mad, shops){
		var positions = [];

        shops = shops.filter(function(d){
        	if (d.count = shops.length){
		        d[0] = +d.longitude;
		        d[1] = +d.latitude;
		        var position = projection(d);
		        d.x = position[0];
		        d.y = position[1];
		        return true;
        	}
        })

        for (var i=0; i<shops.length; i++){
        // console.log(shops[i])
        	};

        console.log(voronoi)

    	// voronoi(shops)
     //   		 .forEach(function(d) { d.point.cell = d; });

		svg.append("path")
			.datum(topojson.feature(mad, mad.objects.MadisonBuildings))
			.attr("class", "buildings")
			.attr("d", path);

		svg.append("path")
			.datum(topojson.feature(mad, mad.objects.MadisonWater))
			.attr("class", "water")
			.attr("d", path);		

     	svg.append("path")
			.datum(topojson.feature(voronoi, voronoi.objects.voronoi4))
			.attr("class", "lines")
			.attr("d", path)
			.on("mouseover", highlight)
			.on("mouseout", dehighlight)			; 	

 		var shops = svg.append("g")
       	 .attr("class", "shops")
       	 .selectAll("g")
         .data(shops)
         .enter()
         .append("g")
         .attr("class", "shops")



 	   // shops.append("path")
	    //     .attr("class", "cell")
	    //     .attr("d", function(d) { return d.cell.length ? "M" + d.cell.join("L") + "Z" : null; });

        shops.append("circle")
        	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
	        .attr("r", 2.5);

	};

		// GenerateVonoroi(shops)
};

function GenerateVoronoi(shops){

	console.log("aaaaahhhhhhh")

};

// Utilities, working thoughts

//For use with a Geojson point data...

		// for (var i=0; i<shops.objects.collection.geometries.length; i++){
		// 	svg.insert("path", ".madshops")
		// 	.datum(topojson.feature(shops, shops.objects.collection.geometries[i]))
		// 	.attr("class", "shops")
		// 	.attr("d", path.pointRadius([2.5]))
		// 	.append("g");

		// 	vertices[i] = shops.objects.collection.geometries[i].coordinates;
		// };

//Shows that this code can indeed reprojcet these points if given a csv of same data...
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