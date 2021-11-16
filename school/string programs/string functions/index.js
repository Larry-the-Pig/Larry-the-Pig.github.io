function wordCount(str) {
    return str.split(" ").length;
}

function arrayToString(array) {
    return array.join('');
}

function mostOccuring(str) {
    const chars = str.split('');

    let stat = {};

    for (let i = 0; i < chars.length; i++) {
        if (stat.hasOwnProperty(chars[i])) {
            stat[chars[i]]++;
        } else {
            stat[chars[i]] = 1;
        }
    }

    return Object.keys(stat)[indexOfMax(Object.values(stat))];
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function replaceSubstring(str1, str2, str3) {
    const reg = new RegExp(str2, 'g');
    return str1.replace(reg, str3);
}