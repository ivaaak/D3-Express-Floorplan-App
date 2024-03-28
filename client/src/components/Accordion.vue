<template>
    <section class="accordion" id="sidepanel">
        <div class="tab-header">
            <h1> Accordion Title</h1>
        </div>
        <div class="tab">
            <input type="checkbox" name="accordion-1" id="cb1" checked>
            <label for="cb1" class="tab__label">Manage Employees</label>
            <div class="tab__content">
                <AddEmployee></AddEmployee>
            </div>
        </div>
        <div class="tab">
            <input type="checkbox" name="accordion-2" id="cb2" checked>
            <label for="cb2" class="tab__label">Manage Desks</label>
            <div class="tab__content">
                <ManageDesks></ManageDesks>
            </div>
        </div>
        <div class="tab">
            <input type="checkbox" name="accordion-3" id="cb3" checked>
            <label for="cb3" class="tab__label">Calendar</label>
            <div class="tab__content">
                <Calendar></Calendar>
            </div>
        </div>
        <div class="tab">
            <input type="checkbox" name="accordion-4" id="cb4" checked>
            <label for="cb4" class="tab__label">Upload Floorplan</label>
            <div class="tab__content">
                <form action="upload" method="POST">
                    <input type="file" multiple>
                    <p>Drag your files here or click in this area.</p>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    </section>
</template>

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
.tab-header {
    background: var(--theme);
    h1 {
        color: white;
    }
}
.tab input {
    position: absolute;
    opacity: 0;
    z-index: -1;
}

.tab__content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s;
}

.tab input:checked~.tab__content {
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

.tab input:checked+.tab__label::after {
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

/* Arrow animation */
.tab input:not(:checked)+.tab__label:hover::after {
    animation: bounce .5s infinite;
}

@keyframes bounce {
    25% {
        transform: rotate(90deg) translate(.25rem);
    }

    75% {
        transform: rotate(90deg) translate(-.25rem);
    }
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

form input {
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
}

form button {
    color: #fff;
    background: #16a085;
    border: none;
    width: 508px;
    height: 35px;
    margin-top: -20px;
    margin-left: -4px;
    border-radius: 4px;
    border-bottom: 4px solid #117A60;
    transition: all .2s ease;
    outline: none;
    margin: 1rem;
}

form button:hover {
    background: #149174;
    color: #0C5645;
}

form button:active {
    border: 0;
}
</style>

<script>
import AddEmployee from './AddEmployee.vue';
import ManageDesks from './ManageDesks.vue';
import Calendar from './Calendar.vue';
import HeaderMenu from './HeaderMenu.vue';
import FloorplanHeader from './FloorplanHeader.vue';

export default {
    components: {
        AddEmployee,
        ManageDesks,
        Calendar,
        HeaderMenu,
        FloorplanHeader
    }
}
</script>