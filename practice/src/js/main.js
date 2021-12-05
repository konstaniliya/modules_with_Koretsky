import "/src/style.scss";
import path_item1 from "../media/images/1.jpg";
import path_item2 from "../media/images/2.jpg";
import path_item3 from "../media/images/3.jpg";
import path_item4 from "../media/images/4.gif";
import path_item5 from "/src/media/video/1.mp4";
import path_item6 from "/src/media/video/2.mp4";
import path_item7 from "/src/media/audio/1.mp3";
import path_item8 from "/src/media/audio/2.mp3";
import path_item9 from "/src/media/audio/3.mp3";

let items = [
    {
        header: "Мельница у реки",
        path: path_item1
        
    },
    {
        header: "Горы осенью",
        path: path_item2
        
    },
    {
        header: "Деревня летом",
        path: path_item3
        
    },
    {
        header: "Анимированный котик",
        path: path_item4
        
    },
    {
        header: "Птички летом",
        path: path_item5
        
    },
    {
        header: "Ручеёк в ущелье",
        path: path_item6
        
    },
    {
        header: "Закат в лесу",
        path: path_item7
        
    },
    {
        header: "Never gonna give you up",
        path: path_item8
        
    },
    {
        header: "Морской прибой",
        path: path_item9
        
    },
 
]

document.getElementById("i1").innerHTML =  `<img src="${items[0].path}" alt="example">
<h2>${items[0].header}</h2>`;
document.getElementById("i2").innerHTML = `<img src="${items[1].path}" alt="example">
<h2>${items[1].header}</h2>`;
document.getElementById("i3").innerHTML = `<img src="${items[2].path}" alt="example">
<h2>${items[2].header}</h2>`;
document.getElementById("i4").innerHTML = `<img src="${items[3].path}" alt="example">
<h2>${items[3].header}</h2>`;

document.getElementById("i5").innerHTML = `<audio controls> <source src="${items[6].path}"> </audio>
<h2>${items[4].header}</h2>`;
document.getElementById("i6").innerHTML = `<audio controls> <source src="${items[7].path}"> </audio>
<h2>${items[5].header}</h2>`;
document.getElementById("i7").innerHTML = `<audio controls> <source src="${items[8].path}"> </audio>
<h2>${items[6].header}</h2>`;

document.getElementById("i8").innerHTML = `<video controls width="250"> <source src="${items[4].path}"></video>
<h2>${items[7].header}</h2>`;
document.getElementById("i9").innerHTML = `<video controls width="250"> <source src="${items[5].path}"></video>
<h2>${items[8].header}</h2>`;


