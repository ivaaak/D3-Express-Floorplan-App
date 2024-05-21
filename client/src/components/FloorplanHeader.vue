<template>
    <div class="projects-section-header">
        <p>Office: Software Company Inc.
            <button v-if="this.canEditOfficeName" @click="openDialog()"> ✎ </button>
        </p>
        <p class="time">Todays Date: {{ currentTime }}</p>
    </div>
    <div class="projects-section-line">
        <div class="projects-status">
            <div class="item-status">
                <span class="status-type">Reserved</span>
                <span class="status-number">21</span>
            </div>
            <div class="item-status">
                <span class="status-type">Free</span>
                <span class="status-number">11</span>
            </div>
            <div class="item-status">
                <span class="status-type">Total Desks</span>
                <span class="status-number" v-if="desksCount">{{ desksCount.polygons.length }}</span>
            </div>
            <div class="item-status">
                <span class="status-type">Calendar Chosen Date:</span>
                <span class="status-number">32</span>
            </div>
        </div>
        <div class="projects-status">
            <div class="item-status">
                <span class="status-type">Date Selected:</span>
                <span class="status-number">{{ formatDate(datePicked) }}</span>
            </div>
        </div>
    </div>
    <ModalDialog :show="showModal" :title="modalTitle" :message="modalMessage" @close="closeModal" />
</template>

<script>
import ModalDialog from './ModalDialog.vue';
import moment from 'moment';
import axios from 'axios';

export default {
    components: {
        ModalDialog,
    },
    data() {
        return {
            showModal: false,
            canEditOfficeName: true,
            currentDate: '',
            modalTitle: '',
            modalMessage: '',
        };
    },
    props: {
        datePicked: {
            type: Date,
            required: false,
        },
        desksCount: {
            type: Object,
            required: false,
        },
    },
    methods: {
        openDialog() {
            this.modalTitle = 'Dialog';
            this.modalMessage = "Edit the office:";
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        formatDate(date) {
            if (date) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const hour = date.getHours();
                const minute = date.getMinutes();
                return `${day} / ${month} / ${year} ${hour}:${minute}`;
            } else {
                return this.currentDate;
            }
        }
    },
    computed: {
        currentTime() {
            this.currentDate = moment().format('YYYY-MM-DD');
            return this.currentDate;
        }
    }
}
</script>

<style>
.projects-section-line {
    width: 90%;
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    /* border-bottom: 1px solid black; */
}

.projects-section-header {
    width: 80%;
    margin-left: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    margin-top: 12px;
    color: white;
}

.projects-section-header p {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    opacity: 0.9;
    margin: 0;
    color: white;
}

.projects-section-header .time {
    font-size: 20px;
}

.projects-status {
    display: flex;
}

.item-status {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    color: white;
}

.item-status:not(:last-child) .status-type:after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translatey(-50%);
    width: 6px;
    height: 6px;
    border-radius: 12px;
    border: 1px solid var(--secondary-color);
}

.status-number {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: white;
}

.status-type {
    position: relative;
    padding-right: 24px;
    color: white;
}
</style>