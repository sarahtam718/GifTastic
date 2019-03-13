$(document).ready(function () {
  // starting array
  var topic = ["unicorn", "dolphins", "lemurs", "llamas"];
  console.log("my array: ", topic);

  //   grabs user input
  //   var animal = $("#animal-input")
  //     .val()
  //     .trim();
  //   var animal = "bear";

  function consoleAnimalName() {
    var animal = $(this).attr("data-name");
    console.log("what is the animal?", animal);

    //   add user's desired animal
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&limit=10&api_key=NsbejyNo6tEoJV62w6VBgCbzL1YTGJBS";
    console.log("the url: ", queryURL);

    // // call to the API to request the info
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("this is what i got ", response);

      //   // Creating a div to hold the new animal
      var animalDiv = $("<div class='animal'>");
      //   for (i in response.data) {
      // variable to hold what the gif is rated
      var ratingData = response.data[0].rating;
      console.log("rated: ", response.data[0].rating);

      // Creating an element to have the rating displayed
      var newP = $("<p>").text("Rating: " + ratingData);

      // Now display the rating
      animalDiv.append(newP);

      // Retrieving the link for the gif
      var imgLink = response.data[0].images.fixed_height_still.url;
      //   }
      // Creating an element to hold the image...make this the still image?
      var newImage = $("<img>").attr("src", imgLink);

      // Appending the image
      animalDiv.append(newImage);

      // make gif / animated version...append but don't display ? if else?

      //   // elements above are added after other gifs
      $("#gifs-container").prepend(animalDiv);
    });
  }

  //   consoleAnimalName();

  function makeButton() {
    // ditch the old animal buttons & just reload most recent array
    $("#buttons-container").empty();

    // Looping through the array of movies
    for (var i = 0; i < topic.length; i++) {
      // console.log(topic[i]);
      // Dynamically make buttons for each animal in the array
      var newButton = $("<button>");

      // Adding a class of animal to our button
      newButton.addClass("animal-btn");
      // Add a data-attribute
      newButton.attr("data-name", topic[i]);
      // Show the starting button text
      newButton.text(topic[i]);
      // Add the button to the html page
      $("#buttons-container").append(newButton);
    }
  }

  //   submit button
  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    console.log("i've been clicked");
    // grab user input
    var animal = $("#animal-input")
      .val()
      .trim();
    console.log(animal);
    // push user choice to topic array
    topic.push(animal);
    // remake all the buttons
    makeButton();
  });

  //   don't forget the starting buttons!
  $(document).on("click", ".animal-btn", consoleAnimalName);
  makeButton();
});


// still vs gif
/* <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
  <img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">
  <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); */
