//for menu.html
var tnum = localStorage.getItem('tnum');

document.getElementById("tnum1").innerHTML = "Table Number : "+tnum;


var order = firebase.database().ref('Order');
var countRef = firebase.database().ref('Count')
var count = countRef.child("orderCount");
var bill = firebase.database().ref('Bill');
var billCount = countRef.child("billCount");

var numBill = 0;
billCount.on("value", function(snapshot){
	numBill = snapshot.val();
});

var start;
count.on("value", function(snapshot) {
    start = snapshot.val();
    startCount = start;
    // snapshot.val() = 12;
});
start = parseInt(start);

var finalBill = 0;
var totalp = 0;
function placeOrder(){ 
	confirm("Click ok to confirm");
    var items=document.querySelectorAll('input[type="checkbox"]:checked');
    
    var counter = items.length;
	var selectedItems="";
		totalp = 0;
		for(var i=0; i<counter; i++){			
			start = start + 1;

			// alert(start);
			var idnum = items[i].id;
			idnum = idnum.slice(1);

			var price = document.getElementById("p"+idnum).innerHTML;
			price = price.slice(3);
			price = parseInt(price);


			var quant = document.getElementById("q"+idnum).value;				
			if(quant == ""){
				quant = 1;
			}
			quant = parseInt(quant);

			totalp = totalp + (quant*price);			

			var ordernum = order.child(start);
			ordernum.set({
				Food: items[i].value,
	        	Quantity: quant,
	        	Status: "Progress",
	        	Table: tnum
			});
			

		}


		countRef.update({"orderCount" : start});


		//read previous bill amount 
		var prevBill;
		bill.once("value").then(function(snapshot) {
			var exists = 0;
			snapshot.forEach(function(childSnapshot) {
  
  				var key = childSnapshot.key;


  				if(childSnapshot.val().Table == tnum){
  					prevBill = childSnapshot.val().Total;  					
  					finalBill = parseInt(prevBill) + parseInt(totalp);  					
  					exists = 1;
  					var billId = bill.child(key);
  					billId.set({
  						Total : finalBill,
						Table : tnum
  					});	
  				}



  			});

			if(exists == 0){
				numBill = numBill + 1;
				var billId = bill.child(numBill);
				// alert(totalp);
				billId.set({	
					Table : tnum,
					Total : totalp
				});
			}
			countRef.update({"billCount" : numBill});


  		});
		
		
}



