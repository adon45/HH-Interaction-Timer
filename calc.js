let startBtn = document.getElementById('start'); 
let resetBtn = document.getElementById('reset'); 
let submitBtn = document.getElementById('submit');
let average = document.getElementById('average'); 
let total = document.getElementById('total');
let longest = document.getElementById('longest');
let shortest = document.getElementById('shortest');
let table = document.getElementById('table');
let resetAll = document.getElementById('reset-all');
let result = document.getElementById('results');
let boxes = document.getElementById('number-boxes');
let totalBoxes = document.getElementById('total-boxes');
let timePerBox = document.getElementById('time-per-box');

let startTime;
let timer;
let times = [];

function Interaction(time, boxes) {
    this.timeCount = time;
    this.boxNumber = boxes
}

startBtn.addEventListener('click', function () { 
    if (!timer) { 
        startTime = Date.now() - (times.reduce((a, b) => a + b.timeCount, 0) || 0);
        timer = setInterval(updateTime, 10); // Update every 10 milliseconds
    } else {
        clearInterval(timer);
        timer = null;
    }
});

resetBtn.addEventListener('click', function () { 
    clearInterval(timer);
    timer = null; 
    updateDisplay(0);
}); 

function updateTime() {
    let elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
}

function updateDisplay(elapsedTime) {
    let milliseconds = Math.floor(elapsedTime % 1000);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    document.getElementById('min').innerHTML = formatTime(minutes);
    document.getElementById('sec').innerHTML = formatTime(seconds);
    document.getElementById('count').innerHTML = formatCount(milliseconds);
}


function formatTime (time) {
    return time < 10 ? `0${time}` : `${time}`;
}

function formatCount (time) {
    if (time < 10) {
        return `0${time}`;
    } else if (time < 100) {
        return `${time}`;
    } else {
        return `${time}`.slice(0, 2);
    }
}


submitBtn.addEventListener("click", function () {
    if(!boxes.value) {
        alert('Please input the amount of boxes');
        return
    };
    let minToSec = parseInt(document.getElementById('min').innerText);
    let smallTime = `${document.getElementById('sec').innerText}.${document.getElementById('count').innerText}`;
    let input = parseFloat(smallTime) + minToSec;

    // Retrieve the value from the "boxes"
    let inputValue = boxes.value;

    let interaction = new Interaction(input, inputValue);

    times.push(interaction);


    let finalAverage = Math.ceil(100 * findAverage(times.map(interaction => interaction.timeCount))) / 100;
    let interactionsCount = times.length;
    let highest = Math.max(...times.map(interaction => interaction.timeCount));
    let smallest = Math.min(...times.map(interaction => interaction.timeCount));

    // Update HTML
    result.style.display = 'block';
    average.innerHTML = `<p>Average: ${finalAverage}</p>`;
    total.innerHTML = `<p>Total Interactions: ${interactionsCount}</p>`;
    longest.innerHTML = `<p>Longest Interaction: ${highest}</p>`;
    shortest.innerHTML = `<p>Shortest Interaction: ${smallest}</p>`;
    totalBoxes.innerHTML = `<p>Total Boxes: ${calculateTotalBoxes()}</p>`;
    timePerBox.innerHTML = `<p>Time Per Box: ${averagePerBox()}</p>`

    // Display interactions
    let interactionsHTML = "";
    times.forEach((interaction, index) => {
        interactionsHTML = `<tr><td class="index">${index + 1}</td><td class="time">${interaction.timeCount}</td><td class="input-value">${interaction.boxNumber}</td></tr>`;
    });
    table.innerHTML += interactionsHTML;

    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00";
    boxes.value = null;
});

const findAverage = (arr) => {
    return  arr.reduce((a, b) => a + b) / arr.length;
};

function calculateTotalBoxes() {
    let totalBoxes = 0;
    times.forEach(interaction => {
        totalBoxes += parseInt(interaction.boxNumber);
    });
    return totalBoxes;
};

function calculateTotalTime() {
    let totalTime = 0;
    times.forEach(interaction => {
        totalTime += parseFloat(interaction.timeCount);
    });
    return totalTime
}

function averagePerBox() {
    let boxes = calculateTotalBoxes ();
    let time = calculateTotalTime();
    return  (time / boxes).toFixed(2)
}

resetAll.addEventListener('click', function() {
    if(confirm('Are you sure you want to clear all data?')) {
        table.innerHTML = '<tr id="columns"> <td class="top">Car #</td><br><td class="top">Interaction Time</td></tr>';
        times = [];
        updateDisplay(0);
        average.innerHTML = '';
        total.innerHTML = '';
        longest.innerHTML = '';
        shortest.innerHTML = '';
        totalBoxes.innerHTML = '';
        timePerBox.innerHTML = ''
        result.style.display = 'none'
    }
});
