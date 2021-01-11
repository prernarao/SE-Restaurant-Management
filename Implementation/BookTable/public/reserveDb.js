var resQueue = firebase.database().ref('ResQueue');


var countRef = firebase.database().ref('Count');
var queue = countRef.child('queueCount');
// var table = firebase.database().ref('Table');

var q;
queue.once("value").then(function(snapshot) {
    q = snapshot.val();    
});


q = parseInt(q);


//check if tables are available
function book(){
    var r = confirm("Click OK to confirm");
    if(r == true){              //Proceed only if r is true       
        //Get values
        var name = document.getElementById('name').value;
        var time = document.getElementById('time').value;
        var message = document.getElementById('msg').value;
        var size;
         
        // Assign None of no requirements are entered by the user
        if(message.length == 0){
            message = "None";
        }
        var phone = document.getElementById('phone').value;        
        var ele = document.getElementsByName('size');     
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked){
                size = ele[i].value;
            }                
        } 
        
                    
        

        resQueue.once("value").then(function(snapshot){
            var booked = 0;
            snapshot.forEach(function(childSnapshot) {
                if(phone == childSnapshot.val().Mobile){
                    alert("Your booking for "+childSnapshot.val().Time+ " already exists!!\n"+ "See you there.");
                    booked = 1;
                }
            });

        
            if(booked == 0 ){
                q = q + 1;
                var ref = resQueue.child(q);
                ref.set({
                    Message:message,
                    Name: name,
                    Size:size,
                    Time: time,
                    Mobile: phone
                 });

                countRef.update({"queueCount": q});
                alert("Your booking is successful. Check SMS for reservation ID");
            }
            // else if(booked == 0 && available == 0){
            //     alert("Sorry! Currently, no tables are available. Contact us at 886578943");
            // }
            
        });
       
    }
}

function cancel(){
    var r = confirm("Click OK to cancel your booking");
    if(r == true){    
        var phone = document.getElementById('canPhone').value;

        resQueue.once("value").then(function(snapshot){
            var exists = 0
            snapshot.forEach(function(childSnapshot) {
                if(phone == childSnapshot.val().Mobile){
                   var ref = resQueue.child(childSnapshot.key);
                   ref.remove();
                   q = q-1;
                   // alert(q);
                   countRef.update({"queueCount": q});
                   exists = 1;
                   alert("Your booking is successfully cancelled!");
                }                           
            });
            if(exists == 0){
                alert("Your booking doesn't exist!");
            }
        });

    }//end of r==true
}


function changeTime(){
    var r = confirm("Click OK to proceed");

    if(r == true){    
        var phone = document.getElementById('chPhone').value;
        var time = document.getElementById('changeTime').value;
        
        resQueue.once("value").then(function(snapshot){
            var exists = 0;
            snapshot.forEach(function(childSnapshot) {
                if(phone == childSnapshot.val().Mobile){                   
                   resQueue.child(childSnapshot.key).update({"Time": time});
                   exists = 1;
                   alert("Your booking is successfully scheduled to "+time);
                }                           
            });
            if(exists == 0){
                alert("Your booking doesn't exist!");
            }
        });

    }//end of r==true
}





