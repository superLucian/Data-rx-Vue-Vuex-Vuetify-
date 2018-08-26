export function convertDate(v) {
  if (v) {
    let date;
    if (v.startsWith('/Date')) {
      date = new Date(parseInt(v.substring(6, 21)));
    } else if (v.startsWith('Date(')) {
      date = new Date(parseInt(v.substring(5, 20)));
    } else if (v.startsWith('-NaN-Date')) {
      date = new Date(parseInt(v.substring(12)));
    } else {
      date = new Date(v);
    }

    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    const dd = date.getDate().toString();
    return (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]) + '/' + yyyy;
  } else {
    return v;
  }
}

export function convertStringToPickerFormat(v) {
  if (v && typeof v === 'string') {
    let date;
    if (v.startsWith('/Date')) {
      date = new Date(parseInt(v.substring(6, 21)));
    } else if (v.startsWith('-NaN-Date')) {
      date = new Date(parseInt(v.substring(12)));
    } else {
      date = new Date(v);
    }

    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    const dd = date.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
  } else if (typeof v === 'date') {
    return v;
  } else {
    return v;
  }
}

export function convertStringDate(dt) {
  if (dt) {
    const date = new Date(dt)
    return date.toLocaleDateString()
  } else {
    return dt
  }
}

export function stringToDate(_date, _format = "mm/dd/yyyy", _delimiter = "/", mode = 'string') {
  if (_date) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);

    if (mode == 'string') {
      return dateItems[yearIndex] + '-' + (month < 10 ? '0' + month : month) + '-' + dateItems[dayIndex];
    } else {
      month -= 1;
      return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    }
  } else {
    return null
  }
}

export function pickerFormat(_date) {
  if (_date) {
    const date = new Date(_date)
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    const year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
  } else {
    return null
  }
}

export function convertDateTime(v) {
  if (v) {
    let date;
    if (v.startsWith('/Date')) {
      date = new Date(parseInt(v.substring(6, 21)));
    } else if (v.startsWith('-NaN-Date')) {
      date = new Date(parseInt(v.substring(12)));
    } else {
      date = new Date(v);
    }

    return date.toLocaleString()
  } else {
    return v;
  }
}
