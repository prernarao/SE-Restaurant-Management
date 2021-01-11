// Fetch Bill

var tnum;

function enableBtn(){
    var tablenum = document.getElementById("tablenum");
    tnum = parseInt(tablenum.value);
    
    if(tnum > 0 && tnum <= 15) {        //depend on number of table
        modal.style.display = "none";
        document.getElementById("tnum").innerHTML = "Table Number : "+tnum;
        var myStorage = window.localStorage;
        myStorage.setItem('tnum', tnum);
    } 
    else{
        var err = document.getElementById("error")
        err.innerHTML = "Invalid Table Number";
        err.style.color ="#C22200";

    }      

}


var bill = firebase.database().ref('Bill');
var dp = document.getElementById('dp');


function getBill(){

    
}

function reqBill(){
    bill.on("value", function(snapshot) {
        var exists = 0;
        snapshot.forEach(function(childSnapshot) {

            if(childSnapshot.val().Table == tnum){
                dp.innerHTML = "Total Bill : Rs "+childSnapshot.val().Total;
                exists = 1;
            }
        });
        if(exists == 0){
            dp.innerHTML = "Order Something!";
        }
    });
  
}
