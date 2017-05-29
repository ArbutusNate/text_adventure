// Variables
	var current = {};
	var locobj = [ [0,0,0] , [-1,0,0] , [0,-1,0] ];
	var tempindex = 0;
	var player = {
		currentloc : [0,0,0],
		inventory : []
	};
	var world = [
		{name: "verge",
			location: [0,0,0],
			visited: false,
			description: "You find yourself at the edge, at a crossroads. Dappled sunlight filters through the trees on the verge of a great forest as their terminal boughs stretch over patchy grass. The sound of pollinating insects and birds fill the air and the smell of warm grass wafts towards you from the south on the occasional breeze. Just beside you are the remains of a faded signpost. Beneath your feet is the crossing of two roads. One is a footpath that travels approximately south and north, the other a track that winds in and out of shadow as it follows the edge of the forest. The northern path winds away into the forest and is quickly lost amongst the trees. To the east the track heads off towards a massive windmill just visible above the trees. The southern path appears to lead across rolling golden plains forever. In the middle distance a thin line of smoke rises as if from a cookfire. From the west you can faintly hear the sound of running water. ",
			revisit: "You are back at the crossroads at the verge of the forest. ",
			directions: ["N","E","S","W"],
			item: [{name: "", idesc: ""}]
		},
		{name: "trackwest",
			location : [-1,0,0],
			visited: false,
			description: "A breeze barely stirs the branches above your head. The track lies mainly in the tall, sunny grass, but occasionally leads you into the park-like interface of shade and sun. Water rushes somewhere nearby. The ground here is covered in thick duff. ",
			revisit: "You are on a path in woods. To the east through the trees you can just make out a worn signpost. From the west you hear the rumble of water. ",
			directions: ["E","W"],
			item: [
				{name: "Stick", idesc: "There is a sturdy-looking stick on the ground."}
				]
		},
		{name: "pathsouth",
			location : [0,-1,0],
			visited: false,
			description: "",
			look: "",
			revisit: "",
			directions: [],
			item: [{name: "", idesc: ""}]
		},

		//New Location Template//
		{name: "",
			location : [0,0,0],
			visited: false,
			description: "",
			look: "",
			revisit: "",
			directions: [],
			item: [{name: "", idesc: ""}]
		},
		//New Location Template//
	];
// Navigation Functions
	function atlocationprint(t){
		var newtext = $("<p style=display:none>")
		newtext
			.text(current[t] + current.item[0].idesc)
			.appendTo(".textarea")
			.fadeIn(3000)
		$(".textarea").animate({scrollTop: 600}, 3000);;
	};
	function atlocation(){
		console.log("Player location is " + player.currentloc + ".")
		console.log(current);
		var button = $("<button>")
		if(current.visited === false){
			world[tempindex].visited = true;
			atlocationprint("description");
		} else {
			atlocationprint("revisit")
		};
	};
	function checklocation(){
		var hash = {};
		var val = player.currentloc;
		for(var i = 0 ; i < locobj.length; i += 1) {
		    hash[locobj[i]] = i;
		}
		if(hash.hasOwnProperty(val)) {
			current = world[hash[val]];
			tempindex = hash[val];
		    console.log(hash[val]);
		}
	};
	function hidebuttons(){
		if 
	}
// Button Functions
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
	};
	function grab(){
		if(current.item[0].name !== ""){
			var itemswitch = current.item[0].name;
			world[tempindex].item = [{name: "", idesc: ""}];
			player.inventory.push(itemswitch);
		}
		var itemdiv = $("<div class=inventoryitem>")
		itemdiv
			.text(itemswitch)
			.appendTo(".inventory")
			.fadeIn(3000);
	};
	function look(){
		atlocationprint("description");
	}; 
//Event Handlers
	$(document).ready(function(){
		// $(".textarea").text(world[0].description);
		current = world[0];
		atlocation();
	});
	$(document).on("click", "#north", north);
	$(document).on("click", "#east", east);
	$(document).on("click", "#south", south);
	$(document).on("click", "#west", west);
	$(document).on("click", "#look", look);
	$(document).on("click", "#grab-use", grab);