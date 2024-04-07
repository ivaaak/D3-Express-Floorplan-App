<template>
  <div>
    <button @click="openModalForCreation()" class="wideButton"> Create Office </button>

    <ul>
      <li v-for="office in offices" :key="office._id">
        {{ office.name }}
        <button @click="openModalForEditing(office)" class="narrowButton">Edit</button>
        <button @click="deleteOffice(office._id)" class="narrowButton">Delete</button>
      </li>
    </ul>
    <OfficeModal :show="showModal" :title="modalTitle" :is-editing="isEditing" :data="officeToEdit"
      :message="modalMessage" @close="closeModal" />
  </div>
</template>

<script>
import OfficeModal from './OfficeModal.vue';
import axios from 'axios';

export default {
  components: {
    OfficeModal
  },
  data() {
    return {
      offices: [],
      desk: {
        name: '',
      },
      isEditing: false,
      selectionCompleted: false,
      pointsSelected: [],
      modalTitle: 'Add an employee',
      modalMessage: 'Message here',
      showModal: false,
      officeToEdit: undefined,
    };
  },
  methods: {
    openModalForCreation() {
      this.showModal = true;
      this.modalTitle = 'Create New Office';
      this.isEditing = false;
      this.officeToEdit = null;
    },
    openModalForEditing(office) {
      this.showModal = true;
      this.modalTitle = 'Edit Office';
      this.isEditing = true;
      this.officeToEdit = office;
    },
    closeModal() {
      this.showModal = false;
      this.modalTitle = '';
      this.isEditing = false;
      this.officeToEdit = null;
      this.fetchOffices(); // refetch on action
    },
    async fetchOffices() {
      try {
        const response = await axios.get('/api/offices'); //TODO
        this.offices = response.data;
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    },
    async updateDeskPositions() {
      try {
        const response = await axios.post('/api/offices/update-overlays', this.desk);
        this.offices.push(response.data);
        this.desk.name = '';
      } catch (error) {
        console.error('Error creating desk:', error);
      }
    },
    async updateDesk(id) {
      try {
        const response = await axios.put(`/api/offices/update-overlays`, this.desk);
        const index = this.offices.findIndex(desk => desk._id === id);
        if (index !== -1) {
          this.offices[index] = response.data;
        }
        this.desk.name = '';
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating desk:', error);
      }
    },
    async deleteOffice(officeId) {
      // Confirmation dialog
      const confirmation = confirm('Are you sure you want to delete this office?');
      if (confirmation) {
        try {
          await axios.delete(`/api/offices/${officeId}`);
          this.offices = this.offices.filter(desk => desk._id !== officeId);
        } catch (error) {
          console.error('Error deleting desk:', error);
        }
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
        this.updateDeskPositions();
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
        var svg = d3.select("#floorplanSvgContainer svg"); // Select the SVG

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

        d3.select("#floorplanSvgContainer svg").on("click", function () {
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
      d3.select("#floorplanSvgContainer svg").on("click", startPointSelection);
    }
  },
  created() {
    this.fetchOffices();
  },
};
</script>