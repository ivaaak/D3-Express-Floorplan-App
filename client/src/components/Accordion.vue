<template>
    <section class="accordion" id="sidepanel">
        <div class="tab-header">
            <h1> Reserve: </h1>
        </div>
        <div class="tab">
            <ColorLegend></ColorLegend>
            <VueDatePicker v-model="date" :format="formatDate"></VueDatePicker>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-2" id="cb2">
            <label for="cb2" class="tab__label">Reserve a Desk</label>
            <div class="tab__content">
                <DeskPicker :datePicked="datePicked" @reservation-completed="handleReservationCompleted"></DeskPicker>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-3" id="cb3">
            <label for="cb3" class="tab__label"> Reservations for {{ formatDate(date) }}</label>
            <div class="tab__content">
                <Reservations :datePicked="datePicked" v-bind="$attrs">
                </Reservations>
            </div>
        </div>
        <div class="tab-header">
            <h1> Manage: </h1>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-4" id="cb4"> <!-- checked to default open-->
            <label for="cb4" class="tab__label">Manage Employees</label>
            <div class="tab__content">
                <ManageEmployees></ManageEmployees>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-5" id="cb5">
            <label for="cb5" class="tab__label">Manage Offices</label>
            <div class="tab__content">
                <ManageOffices></ManageOffices>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-6" id="cb6">
            <label for="cb6" class="tab__label">Adjust Desk Locations</label>
            <div class="tab__content">
                <ManageFloorplans @toggle-desks-editable="handleToggleDesksEditable"></ManageFloorplans>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-7" id="cb7">
            <label for="cb7" class="tab__label">Upload Floorplan</label>
            <div class="tab__content">
                <form action="upload" method="POST">
                    <p>
                        Drag your files here or click in this area.
                        <input id="uploadWindow" type="file" multiple>
                    </p>
                    <button id="uploadButton" class="wideButton" type="submit">Upload</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import ManageEmployees from './ManageEmployees.vue';
import ManageOffices from './ManageOffices.vue';
import HeaderMenu from './HeaderMenu.vue';
import FloorplanHeader from './FloorplanHeader.vue';
import ManageFloorplans from './ManageFloorplans.vue';
import DeskPicker from './DeskPicker.vue';
import Reservations from './Reservations.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import ColorLegend from './ColorLegend.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

export default {
    components: {
        ManageEmployees,
        ManageOffices,
        HeaderMenu,
        FloorplanHeader,
        ManageFloorplans,
        DeskPicker,
        VueDatePicker,
        Reservations,
        ColorLegend
    },
    data() {
        return {
            date: ref(new Date()),
            datePicked: null,
        };
    },
    methods: {
        handleToggleDesksEditable(isEditable) {
            this.$emit('toggle-desks-editable', isEditable);
        },
        handleReservationCompleted(isCompleted) {
            this.$emit('reservation-completed', isCompleted);
        },
        formatDate(date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day} / ${month} / ${year}`;
        },
    },
    watch: {
        date(newDate) {
            this.datePicked = newDate;
            this.$emit('date-changed', newDate);
        }
    },
    mounted() {
        if (!this.datePicked) {
            this.datePicked = this.date;
        }
    }
}
</script>



<style>
:root {
    --primary: #227093;
    --secondary: #ff5252;
    --background: #eee;
    --highlight: #ffda79;
    /* Theme color */
    --theme: var(--primary);
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Core styles/functionality */
.tab {
    width: 24vw;
    margin: 4px;
}

.tab-header {
    width: 25vw;
    text-align: center;
    background: var(--theme);

    h1 {
        color: white;
    }
}

.tab .transparentInput {
    position: absolute;
    opacity: 0;
    z-index: 10;
    border: 2px solid red;
}

.tab__content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s;
}

.tab .transparentInput:checked~.tab__content {
    max-height: 40rem;
}

/* Visual styles */
.accordion {
    color: var(--theme);
    border: 2px solid;
    border-radius: 12px;
    overflow: hidden;
}

.tab__label,
.tab__close {
    display: flex;
    color: var(--theme);
    background: white;
    cursor: pointer;
    font-size: 20px;
}

.tab__label {
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid var(--theme)
}

.tab__label::after {
    content: "\276F";
    width: 1em;
    height: 1em;
    text-align: center;
    transform: rotate(90deg);
    transition: all 0.35s;
}

.tab .transparentInput:checked+.tab__label::after {
    transform: rotate(270deg);
}

.tab__content p {
    margin: 0;
}

.tab__close {
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
}

.accordion--radio {
    --theme: var(--secondary);
}


/* Upload */
form {
    padding: 1rem;
}

form p {
    margin: 1rem;
    text-align: center;
    line-height: 100px;
    color: black;
    font-family: Arial;
    border: 4px dashed black;
}

#uploadWindow {
    position: absolute;
    transform: translatex(-84%);
    opacity: 0;
    z-index: 10;
    /* border: 2px solid red; */
    width: 22%;
    height: 16%;
}
</style>
