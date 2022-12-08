"use strict"

const container = document.querySelector('.container');
const calendarDays = document.querySelector('.calendar_days');
const date = new Date();

class Calendar {
    date = new Date();
    constructor(date) {
        this.date = date;
    }

    createCalendarHTML() {
        const html =
            `
        <div class="calendar_wrap">
            <button class="btn btn--prev"></button>
            <span>${this.date}</span>
            <span></span>
            <button class="btn btn--next"></button>
        </div>
        `
    }

}

const arrayOfMonths = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
const arrayWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс',]

const dateOfMonth = date.getMonth();
const dateOfYear = date.getFullYear()

function createCalendarWeekDaysHtml() {
    const html = document.createElement('LI');

    html.innerHTML = `privet`
    calendarDays.insertAdjacentHTML("beforeend", html)
}

function addWeekDays() {
    arrayWeekDays.forEach(day => {
        createCalendarWeekDaysHtml(day);
    })
}

function getDateInformation(month, year) {
    return new Date(year, month, 0).getDate();
}

function createCalendarHtml() {

    const html =
        `
        <div class="calendar_wrap">
            <div class="calendar_top">
                <button class="btn btn--prev">Prev month</button>
                <span>${arrayOfMonths.find((el => el.indexOf(dateOfMonth)))}</span>
                <span>${dateOfYear}</span>
                <button class="btn btn--next">Next month</button>
            </div>
            <div id="calendar">
                <ul class="calendar_days"></ul>
                <ul id="calendar_list" class="calendar_list">

                </ul>
            </div>
        </div>
        `
    container.insertAdjacentHTML('beforeend', html)
}
createCalendarHtml()
addWeekDays()





