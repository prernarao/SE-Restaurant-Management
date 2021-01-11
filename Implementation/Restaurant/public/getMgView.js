// Manager's View

var order = firebase.database().ref('Order');

var tab = document.getElementById("dp");
var heading = document.getElementById('heading');

order.on('value', function(snapshot) {
    dp.innerHTML='';
    heading.style.visibility="visible";
    snapshot.forEach(function(childSnapshot) {

    var key = childSnapshot.key;

    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("td");
    var col5 = document.createElement("td");

    col1.innerHTML = key;
    col2.innerHTML = childSnapshot.val().Table;
    col3.innerHTML = childSnapshot.val().Status;
    if (childSnapshot.val().Chef!=null){
        col4.innerHTML = childSnapshot.val().Chef;
    }

    if (childSnapshot.val().Waiter!=null){
        col5.innerHTML = childSnapshot.val().Waiter;
    }

    tab.append(row);
    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);

    });

});