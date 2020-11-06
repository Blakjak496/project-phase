const formatDate = (today) => {
    let day = today.getDay();
    let month = today.getMonth();
    let monthDay = today.getUTCDate();

    switch(day) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day= 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
      default:
        break;
    }

    switch(month) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month= 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        break;
    }


    switch(true) {
      case monthDay < 5:
        if (monthDay === 1) monthDay = `${monthDay}st`;
        if (monthDay === 2) monthDay = `${monthDay}nd`;
        if (monthDay === 3) monthDay = `${monthDay}rd`;
        break;
      case monthDay > 20:
        const lastNum = parseInt(monthDay.toString().split('').pop());
        if (lastNum === 1) monthDay = `${monthDay}st`;
        if (lastNum === 2) monthDay = `${monthDay}nd`;
        if (lastNum === 3) monthDay = `${monthDay}rd`;
        break;
      default:
        monthDay = `${monthDay}th`;
        break;
    }

    return `${day} ${monthDay} ${month}`;
  
}

const setGreeting = (today) => {
    let newGreeting;
        switch(true) {
            case today.getUTCHours() < 12:
                newGreeting = 'Good Morning!';
                break;
            case today.getUTCHours() < 18:
                newGreeting = 'Good Afternoon!';
                break;
            default:
                newGreeting = 'Good Evening!';
                break;
        }
    return newGreeting;
}

module.exports = {formatDate, setGreeting}