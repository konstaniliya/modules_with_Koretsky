const resultParagraph = document.getElementById('output');
const resultParagraphTimer = document.getElementById('outputTimer');

function printError(errorText) {
    resultParagraph.innerHTML =
        `
    <span style="color: red;">
        ${errorText}
    </span>
    `
}

function printErrorTimer(errorTextTimer) {
    resultParagraphTimer.innerHTML =
        `
    <span style="color: red;">
        ${errorTextTimer}
    </span>
    `
}

function printDateDiff({ years, months, days }) {
    resultParagraph.innerHTML = `
    Годы: ${years}
    Месяцы: ${months}
    Дни: ${days}
    `
}

function printTimer({ hours, minutes, seconds }) {
    resultParagraphTimer.innerHTML = `
    Часы: ${hours}
    Минуты: ${minutes}
    Секунды: ${seconds}
    `
}

export { printDateDiff, printError,printErrorTimer, printTimer }