// calendar.js contains code for displaying calendar when the clock
// on the front page is clicked.

// When new tab is opened it starts with current month (month = 0)
// For changing months we are using global_calendar_counter variable

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// GENERATE CALENDAR based on n number;
function generateCalendar(n) {
    today = new Date();
    current_month = today.getMonth();
    current_day = today.getDate();

    current_month += n;
    current_year = today.getFullYear();

    // handling years is checking if we are already in current year + 1 or
    // current year - 1. Transitioning between years (januar 2016, december 2015),
    // is possible because of it.
    handling_years = Math.floor(current_month / 12);
    current_year += handling_years;

    // handling current_year - 1
    if (current_month < 0) {
        current_month = 12 * (-handling_years) + n + today.getMonth();
    }
    // handling current_year + 1
    if (current_month > 11) {
        current_month = n + today.getMonth() - 12 * (handling_years);
    }


    document.getElementsByClassName('cal-month-name')[0].innerHTML = monthNames[current_month] + ', ' + current_year;

    days_current_month = new Date(current_year, current_month + 1, 0).getDate();

    // first day in current month [note current_month-1 to get correct date]
    // getDay returns day in the week (starting with sunday -> see days variable above)
    first_day = new Date(current_year, current_month, 1).getDay();
    // possible to change to Sunday or whatever day you want
    week_starting_with = 'Monday';

    // how many days of the previous month to show in calendar before number 1 (current month)
    starting_day = days.indexOf(week_starting_with);
    fill_with_previous_month = first_day - starting_day;

    // if first_day == 0 (sunday) -> sunday is the last day
    if (fill_with_previous_month < 0) {
        fill_with_previous_month = 7 - starting_day;
    }

    first_row = createFirstRow(current_month, current_year, fill_with_previous_month);
    current_month_left_days = days_current_month - (7 - fill_with_previous_month);

    start_day = 7 - fill_with_previous_month;
    // currently using 5 as number of rows -> to keep height of calendar consistent
    // (6 weeks)
    //number_of_rows = Math.round(current_month_left_days / 7);
    other_rows = create_other_rows(5, start_day, days_current_month);

    cal_weeks = document.getElementsByClassName('cal-weeks')[0];
    final_html_string = first_row + other_rows;

    cal_weeks.innerHTML = final_html_string;


    // if clicked on next-month or prev-month day
    // show next or previous month
    next_month_elements = document.getElementsByClassName('next-month');
    prev_month_elements = document.getElementsByClassName('prev-month');

    // increase calendar year
    function increaseCalendarCounter() {
        return function () {
            global_calendar_counter++;
            //n++;
            generateCalendar(global_calendar_counter);
        };
    }

    // decreases calendar year
    function decreaseCalendarCounter() {
        return function () {
            global_calendar_counter--;
            //n--
            generateCalendar(global_calendar_counter);
        };
    }


    for (let i = 0; i < next_month_elements.length; i++) {
        elem = next_month_elements[i];
        elem.onclick = increaseCalendarCounter();
    }

    for (let i = 0; i < prev_month_elements.length; i++) {
        elem = prev_month_elements[i];
        elem.onclick = decreaseCalendarCounter();
    }
}

// create all other rows
function create_other_rows(number_of_rows, starting_day, days_in_month) {
    starting_day = starting_day + 1;
    ending_day = starting_day + 7;
    row = '';
    for (i = 0; i < number_of_rows; i++) {
        // for each row do:
        row += '<div class="cal-week">';
        // add days in each week
        for (j = starting_day; j < ending_day; j++) {
            if (j > days_in_month) {
                d = j;
                d = d - days_in_month;
                row += '<div class="day next-month">' + d + '</div>';
            } else {
                if (j == current_day && global_calendar_counter === 0) {
                    row += '<div class="day today">' + j + '</div>';
                } else {
                    row += '<div class="day">' + j + '</div>';
                }

            }
        }
        row += '</div>';

        starting_day += 7;
        ending_day = starting_day + 7;
    }
    return row;
}


// create first row of the function
function createFirstRow(current_month, current_year, amount_of_days) {
    // previous month = current_month since we don't specify current_month - 1 in getDate()
    previous_month = current_month;

    // check if previous month < 0 => remove 1 from current_year
    days_in_prev_month = new Date(current_year, previous_month, 0).getDate();
    // starting day (number) of the previous month
    starting = days_in_prev_month - amount_of_days + 1;

    // add days from previous month
    row = '<div class="cal-week">';
    for (i = starting; i <= days_in_prev_month; i++) {
        row += '<div class="day prev-month">' + i + '</div>';
    }

    // how much days from current month we have to add in row
    add_from_current_month = 7 - amount_of_days;
    for (i = 1; i <= add_from_current_month; i++) {
        if (i == current_day && global_calendar_counter === 0) {
            row += '<div class="day today">' + i + '</div>';
        } else {
            row += '<div class="day">' + i + '</div>';
        }
    }
    row += '</div>';

    return row;
}



var calendar = document.getElementsByClassName('calendar-modal')[0];
var cal_next = document.getElementsByClassName('cal-next')[0];
var cal_prev = document.getElementsByClassName('cal-prev')[0];
var overlay = document.getElementsByClassName('overlay')[0];
var global_calendar_counter = 0;

// calendar next, prev buttons
// on click generate next or previous month
cal_next.addEventListener('click', function () {
    global_calendar_counter++;
    generateCalendar(global_calendar_counter);
});

cal_prev.addEventListener('click', function () {
    global_calendar_counter--;
    generateCalendar(global_calendar_counter);
});

// hides calendar and overlay
function hideCalendar() {
    calendar.classList.remove('visible');
    overlay.classList.remove('visible');
}

// CLOSE CALENDAR
// close calendar on overlay click
overlay.addEventListener('click', function () {
    hideCalendar();
});

// close calendar on X click
var calendarClose = document.getElementById('close-calendar');
calendarClose.addEventListener('click', function () {
    hideCalendar();
});


// when escape is pressed and calendar is visible, close calendar and overlay
document.addEventListener('keypress', function (e) {
    if (e.key === "Escape") {
        if (calendar.classList.contains('visible')) {
            hideCalendar();
        }
    }
});