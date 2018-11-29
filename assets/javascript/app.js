$(document).ready(function () {
    var topics = ["The Grinch Who Stole Christmas", "Home Alone", "Gremlins", "A Christmas Story", "Christmas Vacation", "Rudolph the Red Nose Reindeer"];


    function showGifs(movies) {


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movies + "&api_key=WHPbjD6d9ErGX1a7afOw7khTs4tdlBnW&limit=9";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                var results = response.data;
                $("#gifs").empty();
                for (var i = 0; i < results.length; i++) {
                    var gif = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var moviesDiv = $("<div>");
                    moviesDiv.addClass("movies-image-container")
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var moviesImage = $("<img>");
                    moviesImage.attr("data-gif", gif);
                    moviesImage.attr("data-still", still);
                    moviesImage.attr("data-state", "still");
                    moviesImage.addClass("movies-image");
                    moviesImage.attr("src", results[i].images.fixed_height_still.url);
                    moviesDiv.append(moviesImage);
                    moviesDiv.append(p);
                    $("#gifs").prepend(moviesDiv);
                }
            });

    };

    function displayButtons() {
        $("#movies").empty();

        for (var i = 0; i < topics.length; i++) {

            var moviesButton = $("<div>");
            moviesButton.addClass("movies-btn");
            moviesButton.addClass("btn");
            moviesButton.addClass("btn-danger");
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
        $("#movie-input").val("");
    });

    $(document).on("click", ".movies-image", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-gif"));
            $(this).attr("data-state", "gif");
            console.log("still clicked");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("animate clicked");
          }
    });
    
    

    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#movie-input").val().trim();
        topics.push(newMovie);
        displayButtons();
    });
    displayButtons();

















});