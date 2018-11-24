$(document).ready(function () {
    var topics = ["The Grinch Who Stole Christmas", "Home Alone", "Gremlins", "A Christmas Story", "Christmas Vacation", "Rudolph the Red Nose Reindeer"];


    function showGifs(movies) {


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movies + "&api_key=WHPbjD6d9ErGX1a7afOw7khTs4tdlBnW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                var results = response.data;
                
                // var still = results[i].images.fixed_height_still.url;

                for (var i = 0; i < results.length; i++) {
                    

                    var moviesDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var moviesImage = $("<img>");
                    moviesImage.addClass("movies-image")
                    moviesImage.attr("src", results[i].images.fixed_height.url);
                    moviesDiv.append(p);
                    moviesDiv.append(moviesImage);
                    $("#gifs").prepend(moviesDiv);
                }
            });

    };

    function displayButtons() {
        $("#movies").empty();

        for (var i = 0; i < topics.length; i++) {

            var moviesButton = $("<button>");
            moviesButton.addClass("movies-btn");
            moviesButton.attr("data-name", topics[i]);
            moviesButton.text(topics[i]);
            $("#movies").append(moviesButton);
        }
    };

    displayButtons();

    $(document).on("click", ".movies-btn", function () {
        var movies = $(this).attr("data-name");
        console.log(movies)
        showGifs(movies);
    });

    // $(document).on("click", ".movies-image", function() {
    //     var image= $(this).attr("data-state");
    //     if (image === still) {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //       } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //       }
    // });

    

    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#movie-input").val().trim();
        topics.push(newMovie);
        displayButtons();
    });
    displayButtons();















});