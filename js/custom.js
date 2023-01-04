"use strict"

const calendarContainer = document.querySelector('.container .calendar__body');

class Calendar {
    arrayOfMonths = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    arrayWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    lastMonth = 11;
    firstMonth = 0;
    date = new Date();
    dateOfMonth = this.date.getMonth();
    dateOfYear = this.date.getFullYear();
    currentDay = this.date.getDate();
    firstDayOfMonth = null;
    calendarWeekdays;
    calendarDays;
    calendarMonthName;
    calendarYearName;


    constructor() {
        this._createCalendarHTML();
        this._createWeekdays();
        this._createForm();
        this._addDaysToCalendar(this._getCountOfDaysInMonth(this.dateOfYear,this.dateOfMonth + 1));
        document.querySelector("#search_day").addEventListener("keyup", this._takeSearchDate.bind(this))
        document.querySelector("#search_day").addEventListener("keydown", this._clearMessageOutput.bind(this))
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
                    <div id="calendar__body">
                        <ul class="calendar_weekdays"></ul>
                        <ul id="calendar_days" class="calendar_days"></ul>
                    </div>
                </div>
            `

        calendarContainer.insertAdjacentHTML('afterbegin', html);
        calendarContainer.querySelectorAll(".btn").forEach(btn => {
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

            if(calendarDaysNumberHtml.innerHTML === `${this.currentDay}` && this.dateOfMonth === this.date.getMonth() && this.dateOfYear === this.date.getFullYear()) {
                calendarDaysNumberHtml.classList.add("current-day")
            }

            this.calendarDays.append(calendarDaysNumberHtml)
        }
    }

    _changeYear(btnClass) {
        this.calendarMonthName = document.querySelector("#calendar_month_name");
        this.calendarYearName = document.querySelector("#calendar_year_number");

        if(btnClass === "btn--prev") {
            --this.dateOfYear;
        } else {
            ++this.dateOfYear;
        }

        this.dateOfMonth = (btnClass === "btn--prev") ? this.lastMonth : this.firstMonth;
        this.calendarMonthName.innerHTML = this.arrayOfMonths[this.dateOfMonth];
        this.calendarYearName.innerHTML = this.dateOfYear;
    }

    _changeMonth(btn, btnClass) {
        this.calendarMonthName = document.querySelector("#calendar_month_name");


        if(btnClass === "btn--prev") {
            --this.dateOfMonth;
        } else {
            ++this.dateOfMonth;
        }

        this.calendarMonthName.innerHTML = this.arrayOfMonths[this.dateOfMonth];

        if(btn.classList.contains("btn--prev") && this.dateOfMonth < this.firstMonth) {
            this._changeYear("btn--prev")
        }

        if(btn.classList.contains("btn--next") && this.dateOfMonth > this.lastMonth) {
            this._changeYear("btn--next")
        }

    }

    _switchMonthOnClick(e) {
        let target = e.target;

        if (target.classList.contains("btn--prev")) {
            this._changeMonth(target, "btn--prev")
        }

        if (target.classList.contains("btn--next")) {
            this._changeMonth(target, "btn--next")
        }

        this._updateDatesOfMonth(this.dateOfYear, this.dateOfMonth)
    }

    _clearListOfDays() {
        this.calendarDays.innerHTML = ``;
    }

    _getCountOfDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    _updateDatesOfMonth(year, month) {
        this._clearListOfDays();
        this._addDaysToCalendar(this._getCountOfDaysInMonth(year,month + 1))
    }

    _createForm() {
        const html =
            `
                <div class="calendar__search_wrap"> 
                    <span class="calendar__search_title">Введіть дату, яку потрібно шукати</span>
                    <input id="search_day" class="calendar__search" type="text" placeholder="ДД.ММ.РРРР">
                    <span class="message"></span>
                </div>
                
            `

        calendarContainer.insertAdjacentHTML('afterbegin', html);
    }

    _dateOutput(day, month, year) {
        let calendarMonthName = document.querySelector("#calendar_month_name");
        let calendarYearName = document.querySelector("#calendar_year_number");
        let validateCountOfDate = this._getCountOfDaysInMonth(year, month);

        if(!isNaN(day) && !isNaN(month) && !isNaN(year) && Number(day) <= validateCountOfDate) {

            let searchDay = day.replace(/^0{1}/gm, "");
            this.dateOfMonth = Number(month);
            this.dateOfYear = Number(year);
            this.firstDayOfMonth = new Date(this.dateOfYear, --this.dateOfMonth, 0).getDay();

            calendarMonthName.innerHTML = this.arrayOfMonths[this.dateOfMonth];
            calendarYearName.innerHTML = this.dateOfYear;

            this._clearListOfDays();
            this._addDaysToCalendar(validateCountOfDate);
            this._messageOutput("correct", "Ваша дата відображена у календарі");

            document.querySelectorAll("#calendar_days li").forEach(d => {
                d.classList.remove("search-day")

                if(d.innerHTML === `${searchDay}`) {
                    d.classList.add("search-day")
                }

            })
        } else {
            this._messageOutput("error", "Цієї дати не існує, перевірте правильність введених даних")
        }
    }

    _takeSearchDate(e) {
        let searchDateInput = document.querySelector('#search_day');
        let regex = /^(3[01]|[12][0-9]|0[1-9])[\-\/\.](0[1-9]|1[012])[\-\/\.](19[3-9][0-9]|20[0-9][0-9])$/gm;

        if(e.key === 'Enter' || e.keyCode === 13) {
            if(regex.test(searchDateInput.value)) {
                let correctDateString = (searchDateInput.value.trim()).split(" ").join("");
                let dateCharactersRegex = /[./-]+/;
                let [day,month,year] = correctDateString.split(dateCharactersRegex);

                searchDateInput.value = '';

                this._dateOutput(day, month, year)

            } else {
                this._messageOutput("error", "Некоректні дані, спробуйте перевірити дату або спробуйте ввести у форматі дд/мм/рррр")
            }
        }
    }

    _messageOutput(type, textOfMessage) {
        let message = document.querySelector(".message");

        if(!message.classList.contains(`${type}`)) {
            message.classList.add("show", `${type}`);
            message.innerHTML = `${textOfMessage}`;
        }
    }

    _clearMessageOutput() {
        let message = document.querySelector(".message");

        message.className = "message";
        message.innerHTML = '';
    }

}

let calendar = new Calendar();









