<template>
    <div class="color-legend-container">
        <div class="color-legend-item" v-for="(item, index) in legendItems" :key="index">
            <div class="color-square" :style="{ backgroundColor: item.color }"></div>
            <span>{{ item.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorLegend',
    data() {
        return {
            legendItems: [
                { color: '#FF0000', text: 'Reserved Desk' },
                { color: '#227093', text: 'Free Desk' },
                { color: '#90EE90', text: 'Selected Desk' },
            ],
        };
    },
};
</script>

<style scoped>
.color-legend-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 0px 10px 0px 10px;
}

.color-legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.color-square {
    width: 20px;
    height: 20px;
    border: 1px solid #000;
    opacity: 0.6;
}
</style>