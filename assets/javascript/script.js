// Initialize Firebase
var config = {
  apiKey: "AIzaSyB53ehUUkyjlWCBM0nvLiRmPAPt0vz61ZY",
  authDomain: "test-project-a41bb.firebaseapp.com",
  databaseURL: "https://test-project-a41bb.firebaseio.com",
  projectId: "test-project-a41bb",
  storageBucket: "test-project-a41bb.appspot.com",
  messagingSenderId: "216203482760"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// just for simplicity in referencing it
var database = firebase.database();

$("#add-user").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var role = $("#role-input").val().trim();
    var date = $("#date-input").val().trim();
    var rate = $("#rate-input").val().trim();

    console.log(name);
    console.log(role);
    console.log(date);
    console.log(rate);



    database.ref().push({
        employee: name,
        role: role,
        date: date,
        rate: rate,
    });

    $("#name-input").val("");
    v$("#role-input").val("");
    $("#date-input").val("");
    $("#rate-input").val("");

})

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().employee);
  console.log(childSnapshot.val().role);
  console.log(childSnapshot.val().date);
  console.log(childSnapshot.val().rate);

  var empName = childSnapshot.val().employee;
  var empRole = childSnapshot.val().role;
  var empDate = childSnapshot.val().date;
  var empRate = childSnapshot.val().rate;

  var months = moment().diff(moment.unix(empDate, "X"), "months");

$("#tableHeader").append("<tr><td>"+empName+"</td><td>"+empRole+"</td><td>"+empDate+"</td><td>"+months+"</td><td>"+empRate+"</td><td></td></tr>");

}, function(errorObject) {
  console.log("Errors handled" + errorObject.code);
});
