
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

    // DESTINATION PAGE - SEARCH

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

    // DESTINATION CATEGORY FILTER

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

    // PACKAGES PAGE FILTER

    $(".package-filter-btn").on("click", function () {

        let filter = $(this).attr("data-filter");

        // Update active button
        $(".package-filter-btn").removeClass("active");
        $(this).addClass("active");

        // Filter package cards
        $(".package-item").each(function () {

            let categories = $(this).attr("data-category") || "";

            $(this).toggle(
                filter === "all" ||
                categories.split(" ").includes(filter)
            );

        });

    });


    // CONTACT PAGE

    // Read package from URL
    let contactParams = new URLSearchParams(window.location.search);
    let selectedPackage = contactParams.get("package");

    if (selectedPackage) {
        $("#interestedPackage").val(selectedPackage);
    }

    // Handle form submission
    $("#tripInquiryForm").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        $("#inquiryStatus")
            .text("Your inquiry is ready! Thank you for your interest in Roamers.")
            .css("color", "#20a7b3");
    });

});
