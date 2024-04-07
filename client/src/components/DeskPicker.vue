<template>
    <div>
        <div>Selected Desk: {{ selectedDesk.name }}</div>
        <div>With Coordinates: {{ selectedDesk.coordinates }}</div>
    </div>

    <button id="pickDesk" class="narrowButton" v-if="!selectionActive" @click="pickDesk()">
        Select A Desk To Reserve
    </button>
    <button id="pickDesk" class="narrowButton" v-if="selectionActive" @click="cancelDeskSelection()">
        Cancel Selection
    </button>
    <button class="narrowButton" @click="reserveDesk()">
        Confirm and Reserve
    </button>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    emits: {
        'reservation-completed': Boolean
    },
    data() {
        return {
            selectionActive: false,
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
            isCompleted: true,
        };
    },
    props: {
        datePicked: {
            type: Date,
            required: false,
        },
    },
    methods: {
        pickDesk() {
            this.selectionActive = true;

            var updateDesk = (name, coordinates) => {
                this.selectedDesk.name = name;
                this.selectedDesk.coordinates = coordinates;
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
                        colorDeskByTitle.call(this, titleElement.textContent, "#0f640f", "#227093");
                        updateDesk.call(this, titleElement.textContent, normalizedPolygon);
                    } else {
                        console.log("No title found for the clicked polygon.");
                    }
                }
            }

            d3.select("#floorplanSvgContainer svg").on("click", handlePolygonClick);
        },
        async reserveDesk() {
            const employeeId = "660e7d95229f221d65c4767c"; // Replace this with the actual employee ID
            try {
                const response = await axios.put('/api/reservations/add-desk', {
                    date: moment(this.datePicked).format('YYYY-MM-DD'),
                    deskId: this.selectedDesk.name,
                    employeeId: employeeId,
                });
                // refresh SVG
                this.isCompleted = true;
                this.$emit('reservation-completed', this.isCompleted);
            } catch (error) {
                console.error('Error adding reservation:', error);
            }
        },
        cancelDeskSelection() {
            this.selectionActive = false;

            // remove color
            var pathElements = document.querySelectorAll('path');
            pathElements.forEach((path) => {
                var title = path.querySelector('title');
                if (title && title.textContent === this.selectedDesk.name) {
                    path.style.fill = "#227093";
                }
            });

            this.selectedDesk = { name: "", coordinates: {} }
            // remove event handler
            d3.select("#floorplanSvgContainer svg").on("click", null);
        },
    }
}
</script>
