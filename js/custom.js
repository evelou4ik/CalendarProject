"use strict"

const container = document.querySelector('.container');

class Calendar {
    arrayOfMonths = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    arrayWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    lastMonth = 11;
    firstMonth = 0;
    date = new Date();
    dateOfMonth = this.date.getMonth();
    dateOfYear = this.date.getFullYear();
    calendarWeekdays;
    calendarDays;
    firstDayOfMonth;

    constructor() {
        this._createCalendarHTML();
        this._createWeekdays();
        this._addDaysToCalendar(this._getCountOfDaysInMonth(this.dateOfYear,this.dateOfMonth + 1))
    }

    _createCalendarHTML() {
        const html =
            `
            <div class="calendar_wrap">
                <div class="calendar_top">
                    <button class="btn btn--prev">Попередній місяць</button>
                    <span id="calendar_month_name">${this.arrayOfMonths[this.dateOfMonth]}</span>
                    <span id="calendar_year_number">${this.dateOfYear}</span>
                    <button class="btn btn--next">Наступний місяць</button>
                </div>
                <div id="calendar">
                    <ul class="calendar_weekdays"></ul>
                    <ul id="calendar_days" class="calendar_days"></ul>
                </div>
            </div>
            `

        container.insertAdjacentHTML('afterbegin', html);
        container.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener('click', this._switchMonthOnClick.bind(this))
        })
    }
    _createCalendarElementDayHTML(day = "") {
        const html = document.createElement('LI');

        html.innerText = `${day}`

        return html;
    }
    _createWeekdays() {
        this.calendarWeekdays = document.querySelector('.calendar_weekdays');

        this.arrayWeekDays.forEach(day => {
            const calendarWeekdayHtml = this._createCalendarElementDayHTML(day);

            this.calendarWeekdays.append(calendarWeekdayHtml);
        })
    }
    _getCountOfDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    _addEmptyLi(calendarWrapDays) {
        this.firstDayOfMonth = new Date(this.dateOfYear, this.dateOfMonth, 0).getDay();

        for(let i = 0; i < this.firstDayOfMonth; i++) {
            calendarWrapDays.append(this._createCalendarElementDayHTML());
        }
    }
    _addDaysToCalendar(countOfDays) {
        this.calendarDays = document.querySelector(".calendar_days");

        this._addEmptyLi(this.calendarDays)

        for(let i = 1; i <= countOfDays; i++) {
            const calendarDaysNumberHtml = this._createCalendarElementDayHTML([i])

            this.calendarDays.append(calendarDaysNumberHtml)
        }
    }
    _changeMonth(element, btnClass) {
        if(btnClass === "btn--prev") {
            --this.dateOfMonth;
        } else {
            ++this.dateOfMonth;
        }

        if(element.classList.contains("btn--prev") ? this.dateOfMonth >= this.firstMonth : this.dateOfMonth <= this.lastMonth) {
            document.querySelector("#calendar_month_name").innerHTML = this.arrayOfMonths[this.dateOfMonth];
        } else {
            if(btnClass === "btn--prev") {
                --this.dateOfYear;
            } else {
                ++this.dateOfYear;
            }
            this.dateOfMonth = extremeMonthValue;

            document.querySelector("#calendar_month_name").innerHTML = this.arrayOfMonths[this.dateOfMonth];
            document.querySelector("#calendar_year_number").innerHTML = this.dateOfYear;
        }
    }
    _switchMonthOnClick(e) {
        let target = e.target;

        if (target.classList.contains("btn--prev")) {
            this._changeMonth(target, "btn--prev", this.dateOfMonth, this.dateOfYear, this.lastMonth)
        }

        if (target.classList.contains("btn--next")) {
            this._changeMonth(target, "btn--next", this.dateOfMonth, this.dateOfYear, this.firstMonth)
        }

        this._updateDatesOfMonth(this.dateOfYear, this.dateOfMonth)
    }
    _clearListOfDays() {
        this.calendarDays.innerHTML = ``;
    }
    _updateDatesOfMonth(year, month) {
        this._clearListOfDays();
        this._addDaysToCalendar(this._getCountOfDaysInMonth(year,month + 1))
    }
}

let calendar = new Calendar();






