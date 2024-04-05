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
            prevDeskName: null,
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

            var updateDesk = (name, coordinates) => {
                this.selectedDesk.name = name;
                this.selectedDesk.coordinates = coordinates;
                this.selectionActive = !this.selectionActive;
            }

            function colorDeskByTitle(deskTitle, selectedColor, defaultColor) {
                var pathElements = document.querySelectorAll('path');

                // First loop to find and update the previous desk's color
                pathElements.forEach((path) => {
                    var title = path.querySelector('title');
                    if (title && title.textContent === this.prevDeskName) {
                        path.style.fill = defaultColor; // Change the fill color of the previous desk
                    }
                });

                // Second loop to set the current desk's color
                pathElements.forEach((path) => {
                    var title = path.querySelector('title');
                    if (title && title.textContent === deskTitle) {
                        path.style.fill = selectedColor; // Set the selected desk color to red
                        this.prevDeskName = deskTitle; // Update prevDeskName to the current desk's title
                    }
                });
            }

            function normalizeCoordinates(polygonValues) {
                const coordinatesArray = polygonValues.split(/M|L/);
                if (coordinatesArray[coordinatesArray.length - 1].endsWith('Z')) {
                    const lastCoordinate = coordinatesArray.pop().slice(0, -1);
                    coordinatesArray.push(lastCoordinate);
                }
                const normalizedCoordinates = coordinatesArray.map(function (coordinate) {
                    const trimmedCoordinate = coordinate.trim();
                    const [x, y] = trimmedCoordinate.split(',').map(Number);
                    return { x, y };
                });
                normalizedCoordinates.shift();
                return normalizedCoordinates;
            }

            function handlePolygonClick() {
                var target = d3.event.target;
                var titleElement = target.querySelector('title');
                if (target.tagName.toLowerCase() === 'path' && target.classList.contains('polygon')) {
                    var normalizedPolygon = normalizeCoordinates(target.getAttribute("d"));
                    if (titleElement) {
                        // Ensure colorDeskByTitle is called with the correct context
                        colorDeskByTitle.call(this, titleElement.textContent, "#FF0000", "#227093");
                        updateDesk.call(this, titleElement.textContent, normalizedPolygon);
                    } else {
                        console.log("No title found for the clicked polygon.");
                    }
                }
            }

            d3.select("#floorplanSvgContainer svg").on("click", handlePolygonClick);
        },
        async reserveDesk() {
            console.log("reserveDesk selectedDesk", this.selectedDesk);
            this.polygon = {
                id: this.selectedDesk.name,
                name: this.selectedDesk.name,
                points: this.selectedDesk.coordinates,
            };

            try {
                const response = await axios.post('/api/reservations/addPolygon', { //TODO
                    selectedDate: this.selectedDate,
                    polygon: this.polygon,
                });
                console.log('Polygon added successfully:', response.data); // only save array of desk names?
            } catch (error) {
                console.error('Error adding polygon:', error);
            }
        }
    }
}
</script>
