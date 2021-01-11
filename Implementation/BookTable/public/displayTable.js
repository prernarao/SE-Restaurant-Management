var table = firebase.database().ref('Table');

// function availTable(){

table.on("value", function(snapshot){

	snapshot.forEach(function(childSnapshot) {

		var key = childSnapshot.key;
		var avail = childSnapshot.val().Availability;
		

		if(avail == "Yes"){
			var tid = document.getElementById(key);
			tid.style.opacity = 1;
			

			var sp = document.getElementById("s"+key);
			sp.innerHTML = "Available";

		}
		else if(avail == "No"){
			var tid = document.getElementById(key);
			tid.style.opacity = 0.25;

			var sp = document.getElementById("s"+key);
			sp.innerHTML = "Busy";
		}

	});

});
