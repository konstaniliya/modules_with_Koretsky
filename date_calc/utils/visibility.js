const buttonDateCalc = document.getElementById("dateCalcBtn");
const buttonTimer = document.getElementById("timerBtn");
const dateBlock = document.getElementById("dateCalcBlock");
const timerBlock = document.getElementById("timerBlock");

buttonDateCalc.onclick = () => {
    buttonDateCalc.classList.add("isSelected");
    buttonTimer.classList.remove("isSelected");
    dateBlock.classList.add("show");
    timerBlock.classList.remove("show");

}

buttonTimer.onclick = () => {
    buttonTimer.classList.add("isSelected");
    buttonDateCalc.classList.remove("isSelected");
    timerBlock.classList.add("show");
    dateBlock.classList.remove("show");
}