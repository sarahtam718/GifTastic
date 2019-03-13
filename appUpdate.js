$(document).ready(function () {
    // starting array with random animals
    let animals = ["unicorn", "dolphin", "lemur", "llama"];
    // console.log("my array: ", animals);

    // function to make buttons and add to page
    function makeButtons(arrayToUse, classToAdd, areaToAddTo) {
        // first, empty out 
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".animal-button", function () {
        $("#animals").empty();
        $(".animal-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL =
            "http://api.giphy.com/v1/gifs/search?q=" +
            type +
            "&limit=10&api_key=NsbejyNo6tEoJV62w6VBgCbzL1YTGJBS";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div class="animal-item">');

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                // animated v. still
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

    $(document).on("click", ".animal-image", function () {
        var state = $(this).attr("data-state");

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

    makeButtons(animals, "animal-button", ".animal-buttons");
});