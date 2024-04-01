<template>
  <div>
    <!-- Button to toggle edit mode -->
    <button @click="toggleEditMode" class="wideButton">
      {{ isEditing ? '✎ Switch to Create Mode ✎' : '✎ Switch to Edit Mode ✎' }}
    </button>
    <form @submit.prevent="submitForm">
      <input v-model="desk.name" placeholder="Desk Name" />
      <button v-if="!isEditing && !selectionCompleted"
       @click="selectDeskCoordinates()" class="wideButton">
        Select 4 Points To Create A Desk
      </button>
      <div v-if="!isEditing && selectionCompleted"> Points selected: {{ pointsSelected }}</div>
      <button v-if="!isEditing" class="wideButton" v-bind:disabled="!selectionCompleted">
        Create Desk
      </button>
      <button v-if="isEditing" class="wideButton">
        Update Desk
      </button>
    </form>
    <ul>
      <li v-for="desk in desks" :key="desk._id">
        {{ desk.name }}
        <button @click="editDesk(desk)" class="narrowButton">Edit</button>
        <button @click="deleteDesk(desk._id)" class="narrowButton">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      desks: [],
      desk: {
        name: '',
      },
      isEditing: false,
      selectionCompleted: false, // New property to track selection completion
      pointsSelected: []
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    async fetchDesks() {
      try {
        const response = await axios.get('/api/desks');
        this.desks = response.data;
      } catch (error) {
        console.error('Error fetching desks:', error);
      }
    },
    async createDesk() {
      try {
        const response = await axios.post('/api/desks', this.desk);
        this.desks.push(response.data);
        this.desk.name = '';
      } catch (error) {
        console.error('Error creating desk:', error);
      }
    },
    async updateDesk(id) {
      try {
        const response = await axios.put(`/api/desks/${id}`, this.desk);
        const index = this.desks.findIndex(desk => desk._id === id);
        if (index !== -1) {
          this.desks[index] = response.data;
        }
        this.desk.name = '';
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating desk:', error);
      }
    },
    async deleteDesk(id) {
      try {
        await axios.delete(`/api/desks/${id}`);
        this.desks = this.desks.filter(desk => desk._id !== id);
      } catch (error) {
        console.error('Error deleting desk:', error);
      }
    },
    editDesk(desk) {
      this.desk = { ...desk };
      this.isEditing = true;
    },
    submitForm() {
      if (this.isEditing) {
        this.updateDesk(this.desk._id);
      } else {
        this.createDesk();
      }
    },
    selectDeskCoordinates() {
      var completeSelection = (selectedPoints) => { // Use an arrow function here
        this.selectionCompleted = true;
        this.pointsSelected = selectedPoints
      }
      // Function to start point selection
      var startPointSelection = function () {
        var selectedPoints = [];
        var maxPoints = 4;
        var svg = d3.select("#demo svg"); // Select the SVG

        // Function to draw a circle at a given point
        var drawCircle = function (point) {
          svg.append("circle")
            .attr("cx", point[0])
            .attr("cy", point[1])
            .attr("r", 5) // Radius of the circle
            .attr("fill", "red"); // Color of the circle
        };

        // Function to draw a line between two points
        var drawLine = function (point1, point2) {
          svg.append("line")
            .attr("x1", point1[0])
            .attr("y1", point1[1])
            .attr("x2", point2[0])
            .attr("y2", point2[1])
            .attr("stroke", "red") // Color of the line
            .attr("stroke-width", 2); // Width of the line
        };

        d3.select("#demo svg").on("click", function () {
          if (selectedPoints.length < maxPoints) {
            // Calculate the point's coordinates on the image
            var imagePointX = d3.event.pageX //- d3.event.offsetX;

            var imagePointY = d3.event.pageY //- d3.event.offsetY;
            var point = [imagePointX, imagePointY];
            selectedPoints.push(point);
            console.log("Selected point on image:", point);

            // Draw a red dot at the selected point
            drawCircle(point);

            // If there are at least two points, draw a line connecting the last two points
            if (selectedPoints.length >= 2) {
              var lastPoint = selectedPoints[selectedPoints.length - 1];
              var secondLastPoint = selectedPoints[selectedPoints.length - 2];
              drawLine(secondLastPoint, lastPoint);
            }

            if (selectedPoints.length === maxPoints) {
              console.log("All points selected:", selectedPoints);
              // Stop listening for clicks after 4 points have been selected
              d3.select(this).on("click", null);
              completeSelection(selectedPoints);
            }
          }
        });
      };

      // Attach the startPointSelection function to the button click event
      //d3.select("#startSelection").on("click", startPointSelection);
      d3.select("#demo svg").on("click", startPointSelection);
    }
  },
  created() {
    this.fetchDesks();
  },
};
</script>