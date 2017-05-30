// Variables
	var current = {};
	var locobj = [
			[0,0,0], 		// 0 - verge
			[-1,0,0],		// 1 - trackwest1
			[-2,0,0],		// 2 - trackwest2
			[-3,0,0],		// 3 - waterfallcliff
			[-3,1,-1]		// 4 - cliff1
			];
	var tempindex = 0;
	var player = {
		currentloc : [0,0,0],
		inventory : []
	};
	var move = "";
// World
	var world = [
		{name: "verge",
		location: [0,0,0],
			visited: false,
			description: "You find yourself at the edge, at a crossroads. Dappled sunlight filters through the trees on the verge of a great forest as their terminal boughs stretch over patchy grass. The sound of pollinating insects and birds fill the air and the smell of warm grass wafts towards you from the south on the occasional breeze. Just beside you are the remains of a faded signpost. Beneath your feet is the crossing of two roads. One is a footpath that travels approximately south and north, the other a track that winds in and out of shadow as it follows the edge of the forest. The northern path winds away into the forest and is quickly lost amongst the trees. To the east the track heads off towards a massive windmill just visible above the trees. The southern path appears to lead across rolling golden plains forever. In the middle distance a thin line of smoke rises as if from a cookfire. From the west you can faintly hear the sound of running water. ",
			revisit: "You are back at the crossroads at the verge of the forest. ",
			directions: ["N","E","S","W"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}]
		},
		{name: "trackwest1",
		location : [-1,0,0],
			visited: false,
			description: "A breeze barely stirs the branches above your head. The track lies mainly in the tall, sunny grass, but occasionally leads you into the park-like interface of shade and sun. Water rushes somewhere nearby. The ground here is covered in thick duff. ",
			revisit: "You are on a path in woods. To the east through the trees you can just make out a worn signpost. From the west you hear the rumble of water. ",
			directions: ["E","W"],
			item: [
				{name: "Stick", idesc: "There is a sturdy-looking stick on the ground."}
				],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}]
		},
		{name: "trackwest2",
		location : [-2,0,0],
			visited: false,
			description: "Verdant life closes around you. The path leads you further into the forest, which is thicker and more green. An uneven wind blows gently around the trunks of the trees and the air feels different on your skin. The rumble of a waterfall can be heard to your west. To the east you can just make out the edge of the forest as a spot of summer light in an otherwise emerald glade. ",
			revisit: "You are on a path in the forest. To the west you can make out the rumble of a waterfall. To the east the path leads towards the edge of the forest. ",
			directions: ["E", "W"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}]
		},
		{name: "waterfallcliff",
		location : [-3,0,0],
			visited: false,
			description: "The plant life here is thick and lush, but the trees themselves give way as you near the edge of a cliff. The rocks are slick and the ground carpeted with deep green moss. The thundering of a waterfall is all you can hear, and the cold mist settles on you as it's blasted past on a gale wrought from falling water. The trees around you wave eternally on the wind. To the east the path retreats into the forest. A narrow path descends down the cliff face and north towards the waterfall. ",
			revisit: "You are on a clifftop path which leads east back into the forest, and north down towards the waterfall. ",
			directions: ["N", "E"],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"N": "down"}]
		},
		{name: "cliff1",
		location : [-3,1,-1],
			visited: false,
			description: "You are halfway down a tall and slick cliff. The ravine is narrow and abrupt and climbs just as quickly on the opposite side of the river. Through the mist to your north you can just make out the torrent of water. A buffeting wind whips the mist into a horizontal storm, blasting south. The narrow path you are on slopes down towards the north and the base of the falls. It travels up and south towards the edge of the ravine.",
			revisit: "",
			directions: [],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"N":"down"}]
		},
		//New Location Template//
		{name: "",
			location : [0,0,0],
			visited: false,
			description: "",
			revisit: "",
			directions: [],
			item: [{name: "", idesc: ""}],
			action: [{item:"", adesc: ""}],
			elev: [{"":""}]
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
		$(".textarea").animate({scrollTop: 600}, 3000);
	};
	function atlocation(){
		console.log("Player location is " + player.currentloc + ".")
		console.log(current);
		$(".db")
			.prop('disabled', true)
			.addClass("disabled");
		for(i = 0; i < current.directions.length; i++){
			var dirvar = current.directions[i];
			$("#" + dirvar)
				.prop('disabled', false)
				.removeClass("disabled");
		}
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
	function updown(){
		debugger;
		var tempelev = current.elev[0];

		if(tempelev[move] === "down"){
			player.currentloc[2]--;
		}
		if(tempelev[move] === "up"){
			player.currentloc[2]++;
		}
	}
// Button Functions
	function north(){
		debugger;
		move = "N"
		player.currentloc[1]++;
		checklocation();
		atlocation();
		updown();
	};
	function east(){
		move = "E"
		player.currentloc[0]++;
		checklocation();
		atlocation();
		// updown();
	};
	function south(){
		move = "S"
		player.currentloc[1]--;
		checklocation();
		atlocation();
		// updown();
	};
	function west(){
		move = "W"
		player.currentloc[0]--;
		checklocation();
		atlocation();
		// updown();
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
	function disabled(){
		var newtext = $("<p style=display:none>")
		newtext
			.text("You cannot go that way.")
			.appendTo(".textarea")

	};
// Event Handlers
	$(document).ready(function(){
		current = world[0];
		atlocation();
	});
	$(document).on("click", ".disabled", disabled)
	$(document).on("click", "#N", north);
	$(document).on("click", "#E", east);
	$(document).on("click", "#S", south);
	$(document).on("click", "#W", west);
	$(document).on("click", "#look", look);
	$(document).on("click", "#grab-use", grab);