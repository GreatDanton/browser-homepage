// creates countdown under calendar for given final date, when the finalDate is
// passed returns desired message:
//
// input: finalDate, finalMessage
// finalDate ==> {'y': year, 'm': month, 'd': day}
// finalMessage ==> "message"
function countDown(finalDate, finalMessage) {
    var today = Date.now();
    finalDay = finalDate.d;
    finalMonth = finalDate.m - 1;
    finalYear = finalDate.y;

    var final_date = new Date(finalYear, finalMonth, finalDay).getTime();
    var time_left = final_date - today;
    var element = document.getElementsByClassName('time-left')[0];

    if (time_left < 0) {
        element.innerHTML = finalMessage;
    } else {
        var in_days = Math.round(time_left / (1000 * 60 * 24 * 60));
        var in_weeks = Math.floor(in_days / 7);

        var weeks_left_str = ' weeks left';
        if (in_weeks <= 1) {
            weeks_left_str = ' week left';
        }
        element.innerHTML = in_days + ' days left | ' + in_weeks + weeks_left_str;
    }
}