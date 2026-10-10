document.getElementById("travelSearchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const travelStyle = document.getElementById("travelStyle").value;

    const params = new URLSearchParams({
        destination: destination,
        style: travelStyle
    });

    window.location.href = `destinations.html?${params.toString()}`;
});