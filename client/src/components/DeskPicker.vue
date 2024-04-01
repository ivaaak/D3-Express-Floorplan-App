<template>
    <div>
        <div>Selected Date: Today</div>
        <div>Selected Desk: {{ selectedDesk.name }}</div>
        <div>With Coordinates: {{ selectedDesk.coordinates }}</div>
    </div>

    <button  id="pickDesk" class="narrowButton" @click="pickDesk()">
        {{ !selectionActive ? "Select A Desk To Reserve" : "Change Selected Desk" }}
    </button>
    <button  class="narrowButton" @click="reserveDesk()">
        Confirm and Reserve
    </button>
</template>

<script>
export default {
    data() {
        return {
            selectionActive: false,
            selectedDesk: {
                name: "",
                coordinates: {}
            }
        };
    },
    methods: {
        pickDesk() {
            this.selectionActive = true;
            // Function to handle polygon click
            var updateDesk = (name, coordinates) => { // Use an arrow function here
                this.selectedDesk.name = name;
                this.selectedDesk.coordinates = coordinates;
                this.selectionActive = !this.selectionActive;
            }
            var handlePolygonClick = function () {
                // Check if the clicked element is a polygon
                var target = d3.event.target;
                var titleElement = target.querySelector('title');

                if (target.tagName.toLowerCase() === 'path' && target.classList.contains('polygon')) {
                    // Log the ID and values of the clicked polygon
                    console.log("Clicked polygon target:", target);
                    console.log("Clicked polygon values:", target.getAttribute("d"));
                    if (titleElement) {
                        updateDesk(titleElement.textContent, target.getAttribute("d"));
                    } else {
                        console.log("No title found for the clicked polygon.");
                    }
                }
            };

            // Attach the handlePolygonClick function to the SVG click event
            d3.select("#floorplanSvgContainer svg").on("click", handlePolygonClick);
        }
    }
}
</script>
