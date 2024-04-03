<template>
    <section class="accordion" id="sidepanel">
        <div class="tab-header">
            <h1> Reserve: </h1>
        </div>
        <div class="tab">
            <VueDatePicker v-model="date"></VueDatePicker>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-2" id="cb2">
            <label for="cb2" class="tab__label">Pick a Desk</label>
            <div class="tab__content">
                <DeskPicker></DeskPicker>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-3" id="cb3">
            <label for="cb3" class="tab__label">Check Reservations</label>
            <div class="tab__content">
                Reservations List Here:
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
            <label for="cb5" class="tab__label">Manage Desks</label>
            <div class="tab__content">
                <ManageDesks></ManageDesks>
            </div>
        </div>
        <div class="tab">
            <input class="transparentInput" type="checkbox" name="accordion-6" id="cb6">
            <label for="cb6" class="tab__label">Manage Floorplans</label>
            <div class="tab__content">
                <ManageFloorplans></ManageFloorplans>
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
import ManageDesks from './ManageDesks.vue';
import HeaderMenu from './HeaderMenu.vue';
import FloorplanHeader from './FloorplanHeader.vue';
import ManageFloorplans from './ManageFloorplans.vue';
import DeskPicker from './DeskPicker.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';

export default {
    components: {
        ManageEmployees,
        ManageDesks,
        HeaderMenu,
        FloorplanHeader,
        ManageFloorplans,
        DeskPicker,
        VueDatePicker
    },
    data() {
        return {
            date: this.getTodaysDate(),
        };
    },
    methods: {
        formatDate(date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are 0-based, so we add 1
            const year = date.getFullYear();
            return `${day} / ${month} / ${year}`;
        },
        getTodaysDate() {
            return moment().format('DD MM YYYY HH:mm');
        }
    },
    watch: {
        date(newDate) {
            this.$emit('date-changed', newDate);
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
    max-height: 25rem;
}

/* Visual styles */
.accordion {
    color: var(--theme);
    border: 2px solid;
    border-radius: 0.5rem;
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
