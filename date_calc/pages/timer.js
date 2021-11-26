import "../utils/visibility.js";
import { printErrorTimer,printTimer } from '../utils/print.js';
import "../libs/howler.js"


const form = document.getElementById("timer");

form.onsubmit = (event) => {
    event.preventDefault();
    document.getElementById("startBtn").disabled = true;
    const formData = new FormData(form);

    let hours = formData.get("hours");
    let minutes = formData.get("minutes");
    let seconds = formData.get("seconds");
    if (!hours || !minutes || !seconds || minutes>=60 || seconds >= 60 || hours<0 || minutes<0 || seconds<0) {
    printErrorTimer("Ошибка, некорректное значение времени");
    return
    }   
    let timer = setInterval(()=>{
        seconds--;
        if(seconds==-1 & minutes!=0) {
            minutes--;
            seconds = 59;
        }
        if(seconds==0 & minutes==0) {
            hours--;
            seconds = 59;
            minutes = 59;
        }
        document.getElementById("stopBtn").onclick = ()=>{
            clearInterval(timer);
        document.getElementById("startBtn").disabled = false;
        }
        
        printTimer({hours,minutes,seconds});

    },1000);

    var sound = new Howl({
        src: ['/pages/sound.mp3']
      });
      
      sound.play();
}