<template>
  <div class="wrap">
    <div class="calendar">
      <div class="calendar__header">
        <a href="javascript:;" class="arrow-btn btn-prevmonth" @click.prevent="changeMonth(false)">Prev</a>
        <div class="calendar__title" @click.prevent="backToToday()">
          <span class="caption-month"> month {{ convertTwoDigits }}</span>
          <span class="caption-year"> year {{ current.year }}</span>
        </div>
        <a href="javascript:;" class="arrow-btn btn-nextmonth" @click.prevent="changeMonth(true)">Next</a>
      </div>
      <div class="calendar__body">
        <ul class="calendar__heading">
          <li v-for="item in heading" :key="item">
            <div class="calendar__item">{{ item }}</div>
          </li>
        </ul>
        <ul class="calendar__content">
          <li v-for="item in buildCalendar" :key="item.number">
            <a href="javascript:;" class="calendar__item"
              :class="{ 'is-today': item.today === true, 'current': item.current === true }"
              @click.prevent="getDateData(item)">{{ item.number }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      current: {
        year: 0,
        month: 0,
        date: 0
      },
      today: {
        year: 0,
        month: 0,
        date: 0
      },
      heading: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    };
  },
  methods: {
    changeMonth(isNext) {
      let month = this.current.month;
      isNext === true ? (month = month + 1) : (month = month - 1);
      if (month <= 0) {
        month = 12;
        this.current.year = this.current.year - 1;
      }
      if (month > 12) {
        month = 1;
        this.current.year = this.current.year + 1;
      }
      this.current.month = month;
      this.current.date = 1;
    },
    getDateData(data) {
      if (data.none === true) {
        return false;
      } else {
        if (
          data.years === this.current.year &&
          data.month === this.current.month &&
          data.date === this.current.date
        ) {
          return false;
        } else {
          this.current.year = data.years;
          this.current.month = data.month;
          this.current.date = data.date;
        }
      }
    },
    backToToday() {
      this.current.year = this.today.year;
      this.current.month = this.today.month;
      this.current.date = this.today.date;
    },
    getToday() {
      this.today.year = moment().year();
      this.today.month = moment().month() + 1;
      this.today.date = moment().date();
    }
  },
  computed: {
    buildCalendar() {
      let myYears = this.current.year;
      let myMonth = this.current.month;
      let myDate = this.current.date;

      let monthText = "";
      myMonth < 10
        ? (monthText = `0${myMonth}`)
        : (monthText = myMonth.toString());

      let dateArray = [];
      let patchNum = 0;
      let totalDate = moment(`${myYears}-${monthText}`).daysInMonth();
      let week = moment(`${myYears}-${monthText}`).format("d");

      for (let i = 0; i < totalDate; i++) {
        let dateNum = i + 1;
        let isToday = false;
        let isCurrent = false;
        let dateText = "";

        if (
          myYears === this.today.year &&
          myMonth === this.today.month &&
          dateNum === this.today.date
        ) {
          isToday = true;
        }

        if (dateNum === myDate) {
          isCurrent = true;
        }

        dateNum < 10
          ? (dateText = `0${dateNum}`)
          : (dateText = dateNum.toString());

        let obj = {
          years: myYears,
          month: myMonth,
          date: dateNum,
          number: dateText,
          today: isToday,
          current: isCurrent
        };
        dateArray.push(obj);
      }

      for (let i = 0; i < week; i++) {
        let obj = {
          number: "",
          none: true
        };
        dateArray.splice(i, 0, obj);
      }

      dateArray.length % 7 === 0
        ? (patchNum = 0)
        : (patchNum = 7 - dateArray.length % 7);

      for (let i = 0; i < patchNum; i++) {
        let obj = {
          number: "",
          none: true
        };
        dateArray.splice(dateArray.length, 0, obj);
      }
      return dateArray;
    },
    convertTwoDigits() {
      let text = "";
      this.current.month < 10
        ? (text = `0${this.current.month}`)
        : (text = this.current.month);
      return text;
    }
  },
  created() {
    this.getToday();
    this.backToToday();
  }
};
</script>

<style lang="scss">
$color-black: #4A4A4A;
$color-white: #FFFFFF;
$color-gray: #F2F2F2;
$color-gray-default: #E5E5E5;
$color-gray-dark: #929292;

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

p {
  margin-bottom: 1em;
}

* {
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif !important;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2em;
  margin: 1rem 0px;
  color: $color-black;
  text-align: center;
}
/* Calendar */
.calendar {
  margin: 1rem 0px;
  overflow: hidden;
  border-radius: 7px;
}

.calendar__heading,
.calendar__content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  >li {
    width: 14.285%;
  }
}

.calendar__item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0px;
  border-radius: 3px;
  transition: all 0.3s;
  color: $color-black;

  &.current {
    background-color: $color-gray-default;
  }

  &.is-today {
    background-color: $color-black;
    color: $color-white;
  }
}

.calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  background-color: $color-gray-default;

  .arrow-btn {
    display: flex;
    font-size: 0rem;

    &::before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
    }

    &.btn-prevmonth::before {
      border-width: 10px 13px 10px 0;
      border-color: transparent $color-black transparent transparent;
    }

    &.btn-nextmonth::before {
      border-width: 10px 0 10px 13px;
      border-color: transparent transparent transparent $color-black;
    }
  }
}

.calendar__title {
  text-align: center;
  font-size: 1.3rem;
  cursor: pointer;
}

.calendar__heading {
  padding: 0px 5px;
  background-color: $color-gray;

  .calendar__item {
    color: $color-black;
  }
}

.calendar__content {
  padding: 5px;
  position: relative;
  background-color: $color-white;

  .calendar__item {
    font-size: 1.3rem;
    cursor: pointer;
  }
}

/* Todolist */
.todolist {
  margin: 1rem 0px;
  overflow: hidden;
  border-radius: 7px;
  background-color: $color-white;
}

.todolist__header {
  font-size: 1.5rem;
  padding: 10px 15px;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>