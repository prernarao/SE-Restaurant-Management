


//Get elements
const btnLogout = document.getElementById('btnLogout');

//Sign out 
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href = "index.html";    //redirect to login page
});

var email;
//Realtime listener
//Not really needed as admin is redirected to login page on signing out
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser); 
        // alert(firebaseUser.email); 
        var txt = document.getElementById("hello");
        var str = "Hello, ";

        email = firebaseUser.email;
        email = email.split("@")[0];
        email = email.slice(6);
        str = str + email + ". Please deliver food on the following tables";

        txt.innerHTML = str;
        
    }else{
        console.log('Not logged in');
        window.location.href = "index.html";            //redirect to login page
    }
});






// Waiter's View

var order = firebase.database().ref('Order');

var tab = document.getElementById("dp");
var heading = document.getElementById('heading');

order.on('value', function(snapshot) {
    dp.innerHTML='';
    heading.style.visibility="visible";
    snapshot.forEach(function(childSnapshot) {
  
  		var key = childSnapshot.key;
  		// console.log(key); //key value 1,2,3,4..

  		if(childSnapshot.val().Status != "Progress" && childSnapshot.val().Status != "Delivered"){

	  		var row = document.createElement("tr");
			var col1 = document.createElement("td");
			var col2 = document.createElement("td");
			var col3 = document.createElement("td");
			var col4 = document.createElement("td");
			var col5 = document.createElement("td");		

			var compBtn=document.createElement("input");
			
			compBtn.setAttribute("type","button");
	        compBtn.setAttribute("class", "compBtn w3-red w3-opacity w3-hover-opacity-off");
			compBtn.setAttribute("id","comp"+key);
			compBtn.setAttribute("value","Delivered");
			compBtn.setAttribute("onclick","changeStatus(this.id)");
		
			col1.innerHTML = childSnapshot.val().Table;
			col2.innerHTML = childSnapshot.val().Food;
			col3.innerHTML = childSnapshot.val().Quantity;
			col4.innerHTML = childSnapshot.val().Status;
			
			tab.append(row);
			row.append(col1);
			row.append(col2);
			row.append(col3);
			row.append(col4);
			if(col4.innerHTML == "Completed"){
				col5.append(compBtn);				
			}		
			row.append(col5);
		}

    });
    
});




function changeStatus(id){

	var num = id.slice(4);	

	order.child(num).update({"Status":"Delivered"});
	order.child(num).update({"Waiter": email});

	// alert(email);

	var btn = document.getElementById(id);
	btn.parentNode.removeChild(btn);
	
}


