var current = {};
var locobj = [[0,0,0],[-1,0,0]];
var cdesc = "";
var world = [
	{name: "verge",
	location: [0,0,0],
	visited: true,
	description: "You find yourself at the edge, at a crossroads. Dappled sunlight filters through the trees on the verge of a great forest as their terminal boughs stretch over patchy grass. The sound of pollinating insects and birds fill the air and the smell of warm grass wafts towards you from the south on the occasional breeze. Beneath your feet is the crossing of two roads. One is a footpath that travels approximately south and north, the other a track that winds in and out of shadow as it follows the edge of the forest.",
	look: "The northern path winds away into the forest and is quickly lost amongst the trees. To the east the track heads off towards a massive windmill just visible above the trees. The southern path appears to lead across rolling golden plains forever. In the middle distance a thin line of smoke rises as if from a cookfire. From the west you can faintly hear the sound of running water.",
	return: "You are back at the crossroads at the verge of the forest."
	},
	{name: "trackwest",
	location : [-1,0,0],
	visited: false,
	description: "The breeze barely moves the branches above your head. The track lies mainly in the tall, sunny grass, but occasionally leads you into the park-like interface of shade and grass. The ground here is littered with downed boughs.",
	look: "",
	return: ""
	},
	{name: "pathsouth",
	location : [0,-1,0],
	visited: false,
	description: "",
	look: "",
	return: ""
	},

	//New Location Template//
	{name: "",
	location : [],
	visited: false,
	description: "",
	look: "",
	return: ""
	},
	//New Location Template//
];
var tempindex = 0;
var player = {
	currentloc : [0,0,0],
	inventory : []
};

// Location Comparer
function checklocation(){
var hash = {};
	for(var i = 0 ; i < locobj.length; i += 1) {
	    hash[locobj[i]] = i;
	}
var val = player.currentloc;
	if(hash.hasOwnProperty(val)) {
		current = world[hash[val]];
		tempindex = hash[val];
	    console.log(hash[val]);
	}
};
//Location Comparer

//Functions
function north(){
	player.currentloc[1]++;
	checklocation();
	atlocation();
};
function east(){
	player.currentloc[0]++;
	checklocation();
	atlocation();
};
function south(){
	player.currentloc[1]--;
	checklocation();
	atlocation();
};
function west(){
	player.currentloc[0]--;
	checklocation();
	atlocation();
};
function up(){
	player.currentloc[3]--;
	checklocation();
	atlocation();
}
function look(){

};

function atlocation(){
	// cdesc = world[tempindex].descritption;
	$(".textarea").text(current.description);
	console.log(current);
	console.log(player.currentloc)

};

//Event Handlers
$(document).ready(function(){
	$(".textarea").text(world[0].description);
	current = world[0];
});
$(document).on("click", "#north", north);
$(document).on("click", "#east", east);
$(document).on("click", "#south", south);
$(document).on("click", "#west", west);
