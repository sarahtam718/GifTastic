$(document).ready(function () {
    // starting array with random animals
    let animals = ["unicorn", "dolphin", "lemur", "llama"];
    // console.log("my array: ", animals);

    // function to make buttons and add to page
    function makeButtons(arrayToUse, classToAdd, areaToAddTo) {
        // first, empty out the buttons 
        $(areaToAddTo).empty();

        // make a button array
        for (var i = 0; i < arrayToUse.length; i++) {
            // make a new button
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            // add text for button to array
            a.text(arrayToUse[i]);
            // add the button to the button container
            $(areaToAddTo).append(a);
        }
    }
    // when you click a button...
    $(document).on("click", ".animal-button", function () {
        // clear the gifs from before
        $("#animals").empty();
        // make sure we only see the "still" images
        $(".animal-button").removeClass("active");
        // so when we click on them later, the active class is activated...
        $(this).addClass("active");

        // whatever is on the button is going to be searched!
        var type = $(this).attr("data-type");
        // here's the formula we use to search for what the user wants from the API
        var queryURL =
            "http://api.giphy.com/v1/gifs/search?q=" +
            type +
            "&limit=10&api_key=NsbejyNo6tEoJV62w6VBgCbzL1YTGJBS";
        // calling the API...
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // we want what is specifically inside the data object...
            var results = response.data;
            // loop through the API to get what we need (rating & images/gifs)
            for (var i = 0; i < results.length; i++) {
                // making a div to put the rating & gif/image for each gif
                var animalDiv = $('<div class="animal-item">');
                // find the rating when we loop through
                var rating = results[i].rating;
                // show the rating in a p element...
                var p = $("<p>").text("Rating: " + rating);
                // variables representing two states of the gif (moving or not)
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                // animated v. still - sticking both animated & still on the image so that we can flip back and forth
                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                // put the elements in the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // put animalDiv on page
                $("#animals").append(animalDiv);
            }
        });
    });
    // when clicking on the image/gif...
    $(document).on("click", ".animal-image", function () {
        var state = $(this).attr("data-state");
        // flip flop between two links by changing the "active" attribute (still or animated)
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // upon clicking the submit button...
    $("#add-animal").on("click", function (event) {
        // solved my weird  console issue...
        event.preventDefault();
        console.log("i've been clicked")
        // take user input and make it a variable
        var newAnimal = $("input")
            .eq(0)
            .val();
        console.log("this is the user input modified: ", newAnimal)
        // usually, only pull one gif from api, but we want to pull the limit (10)
        if (newAnimal.length > 2) {
            animals.push(newAnimal);
            // check to see if new animal was actually pushed into array...
            console.log("new array: ", animals)
        }
        // now, run the function to make all the buttons in the array!
        makeButtons(animals, "animal-button", ".animal-buttons");
    });
    // have starting buttons from array on start page when first loaded
    makeButtons(animals, "animal-button", ".animal-buttons");
});