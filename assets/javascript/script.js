// initialize Firebase
var config = {
  apiKey: "AIzaSyAq3mlCTUsep5WyHAhBaDVpjsBXqcFKKZQ",
  authDomain: "trainschedules-3901b.firebaseapp.com",
  databaseURL: "https://trainschedules-3901b.firebaseio.com",
  projectId: "trainschedules-3901b",
  storageBucket: "trainschedules-3901b.appspot.com",
  messagingSenderId: "784696473453"
};
firebase.initializeApp(config);

// assign the reference to the database to a variable named 'database'
// just for simplicity in referencing it
var database = firebase.database();

$("#add-train").on("click", function(event) {
  event.preventDefault();
  // input values
  var train = $("#train-input").val().trim();
  var destination = $("#dest-input").val().trim();
  var startTime = $("#time-input").val().trim();
  var frequency = $("#freq-input").val().trim();

  // add train record to Firebase db
  database.ref().push({
      train: train,
      destination: destination,
      startTime: startTime,
      frequency: frequency,
  });

  // clear input fields
  $("#train-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  // move to variables
  var trnName = childSnapshot.val().train;
  var trnDest = childSnapshot.val().destination;
  var trntime = childSnapshot.val().startTime;
  var trnFreq = childSnapshot.val().frequency;

  // some momentjs time magic
  var tFrequency = trnFreq;
  // var firstTime = trntime;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trntime, "hh:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm")

  // build table rows
  $("tbody").append("<tr><td>"+trnName+"</td><td>"+trnDest+"</td><td>"+trnFreq+"</td><td>" + nextTrain + "</td><td id=\"nextTrn\">" + tMinutesTillTrain + "</td></tr>");

  if (tMinutesTillTrain < 6) {
    $("#nextTrn").attr("class", "imminent");
  };

  if (tMinutesTillTrain === 1) {
    $("#nextTrn").attr("class", "arriving");
  };

  // handle Firebase errors
}, function(errorObject) {
  console.log("Errors handled" + errorObject.code);
});
