
$(function () {

    // HOME PAGE - TRAVEL SEARCH
    $("#travelSearchForm").on("submit", function (event) {
        event.preventDefault();

        let destination = $("#destination").val();
        let style = $("#travelStyle").val();

        window.location.href =
            "pages/destination.html?destination=" +
            encodeURIComponent(destination) +
            "&style=" +
            encodeURIComponent(style);
    });


    // DESTINATION PAGE - HOMEPAGE SEARCH RESULTS
    let params = new URLSearchParams(window.location.search);

    let destination = params.get("destination");
    let style = params.get("style");

    if (destination) {

        $(".destination-item").each(function () {

            let location = $(this).attr("data-location");
            let styles = $(this).attr("data-style") || "";

            let locationMatch = location === destination;
            let styleMatch = !style || styles.split(" ").includes(style);

            $(this).toggle(locationMatch && styleMatch);

        });

    }


    // DESTINATION PAGE - CATEGORY BUTTONS
    $(".filter-btn").on("click", function () {

        let category = $(this).attr("data-filter");

        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        $(".destination-item").each(function () {

            let categories = $(this).attr("data-category") || "";

            $(this).toggle(
                category === "all" ||
                categories.split(" ").includes(category)
            );

        });

    });

});
