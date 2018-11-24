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

                for (var i = 0; i < results.length; i++) {
                    var gif = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var moviesDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var moviesImage = $("<img>");
                    moviesImage.attr("data-gif", gif);
                    moviesImage.attr("data-still", still);
                    moviesImage.attr("data-state", "gif");
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

    $(document).on("click", ".movies-image", function() {
        var state = $(this).attr("data-state");
        if (state === still) {
            $(this).attr("src", $(this).attr("data-gif"));
            $(this).attr("data-state", "gif");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });
    displayButtons();
    

    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#movie-input").val().trim();
        topics.push(newMovie);
        displayButtons();
    });
    displayButtons();















});