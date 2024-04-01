<template>
    <div>
        <div>Selected Date: Today</div>
        <div>Selected Desk: {{ selectedDesk.name }}</div>
        <div>With Coordinates: {{ selectedDesk.coordinates }}</div>
    </div>

    <button id="pickDesk" class="narrowButton" @click="pickDesk()">
        {{ !selectionActive ? "Select A Desk To Reserve" : "Change Selected Desk" }}
    </button>
    <button class="narrowButton" @click="reserveDesk()">
        Confirm and Reserve
    </button>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectionActive: false,
            selectedDate: "2023-04-01T09:00:00.000Z",
            selectedDesk: {
                name: "",
                coordinates: {}
            },
            // Example polygon data
            polygon: {
                id: "",
                name: "",
                points: null,
            },
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
            var normalizeCoordinates = (polygonValues) => { // leetcode 101
                // Step 1: Split the string into an array of substrings on 'M' and 'L'
                const coordinatesArray = polygonValues.split(/M|L/);

                // Step 2: Handle the last coordinate pair
                if (coordinatesArray[coordinatesArray.length - 1].endsWith('Z')) {
                    // Remove the 'Z' character and process the last coordinate pair
                    const lastCoordinate = coordinatesArray.pop().slice(0, -1); // Remove the 'Z' character
                    coordinatesArray.push(lastCoordinate); // Add the processed last coordinate pair
                }

                // Step 3: Split each coordinate pair and convert to numbers
                const normalizedCoordinates = coordinatesArray.map(coordinate => {
                    // Trim leading and trailing whitespace
                    const trimmedCoordinate = coordinate.trim();
                    const [x, y] = trimmedCoordinate.split(',').map(Number); // Convert to numbers
                    return { x, y }; // Return as an object
                });

                // Step 4: Remove the first item from the array
                normalizedCoordinates.shift();

                console.log(normalizedCoordinates);
                return normalizedCoordinates;
            }
            var handlePolygonClick = function () {
                // Check if the clicked element is a polygon
                var target = d3.event.target;
                var titleElement = target.querySelector('title');

                if (target.tagName.toLowerCase() === 'path' && target.classList.contains('polygon')) {
                    // Log the ID and values of the clicked polygon
                    console.log("Clicked polygon target:", target);
                    console.log("Clicked polygon values:",);
                    var normalizedPolygon = normalizeCoordinates(target.getAttribute("d"));
                    console.log("handlePolygonClick", normalizedPolygon);
                    if (titleElement) {
                        updateDesk(titleElement.textContent, normalizedPolygon);
                    } else {
                        console.log("No title found for the clicked polygon.");
                    }
                }
            };

            // Attach the handlePolygonClick function to the SVG click event
            d3.select("#floorplanSvgContainer svg").on("click", handlePolygonClick);
        },
        async reserveDesk() {
            console.log("reserveDesk selectedDesk", this.selectedDesk);
            this.polygon = {
                id: this.selectedDesk.name,
                name: this.selectedDesk.name,
                points: this.selectedDesk.coordinates,
            };
            console.log("reserveDesk polygon.points", this.polygon.points);
            console.log("reserveDesk this.selectedDesk.coordinates", this.selectedDesk.coordinates);

            console.log("this.polygon.points ===== coordinates", this.polygon.points == this.selectedDesk.coordinates);

            try {
                const response = await axios.post('/api/reservations/addPolygon', {
                    selectedDate: this.selectedDate,
                    polygon: this.polygon,
                });
                console.log('Polygon added successfully:', response.data);
            } catch (error) {
                console.error('Error adding polygon:', error);
            }
        },
    }
}
</script>
