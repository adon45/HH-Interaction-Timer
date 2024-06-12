let startBtn = document.getElementById('start'); 
let resetBtn = document.getElementById('reset'); 
let submitBtn = document.getElementById('submit');
let resultsDiv = document.getElementById('results'); 
let average = document.getElementById('average'); 
let total = document.getElementById('total');
let longest = document.getElementById('longest');
let shortest = document.getElementById('shortest');
let table = document.getElementById('table');
let resetAll = document.getElementById('reset-all');

let minute = 0; 
let second = 0; 
let count = 0; 
let timer = false;

const times = [];
let interactionsHTML = ""

startBtn.addEventListener('click', function () { 
    timer = !timer; 
    stopWatch(); 
}); 

resetBtn.addEventListener('click', function () { 
    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00";
}); 

function stopWatch() { 
    if (timer) { 
        count++; 

        if (count == 100) { 
            second++; 
            count = 0; 
        } 

        if (second == 60) { 
            minute++; 
            second = 0; 
        } 

        let minString = minute; 
        let secString = second; 
        let countString = count;

        if (minute < 10) { 
            minString = "0" + minString; 
        } 

        if (second < 10) { 
            secString = "0" + secString; 
        } 

        if (count < 10) { 
            countString = "0" + countString; 
        } 

        document.getElementById('min').innerHTML = minString; 
        document.getElementById('sec').innerHTML = secString; 
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10); 
    } 
}

submitBtn.addEventListener("click", function () {
    let minToSec = parseInt(document.getElementById('min').innerText);
    let smallTime = `${document.getElementById('sec').innerText}.${document.getElementById('count').innerText}`;
    let input = parseFloat(smallTime) + minToSec;
  
    times.push(input);
    console.log(smallTime)
    console.log(times)

    let finalAverage = Math.ceil(100 * findAverage(times)) / 100;
    let interactionsCount = times.length;
    let highest = Math.max(...times);
    let smallest = Math.min(...times);

    // Update HTML
    average.innerHTML = `<p>Average: ${finalAverage}</p>`;
    total.innerHTML = `<p>Total Interactions: ${interactionsCount}</p>`;
    longest.innerHTML = `<p>Longest Interaction: ${highest}</p>`;
    shortest.innerHTML = `<p>Shortest Interaction: ${smallest}</p>`;

    // Display interactions
    
    times.forEach((time, index) => {
        interactionsHTML = `<tr><td class="index">${index + 1}</td><td class="time">${time}</td></tr>`;
    });
    table.innerHTML += interactionsHTML;

    // Resetting the timer and variables after calculations
    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00";
});

const findAverage = (arr) => {
    return  arr.reduce((a, b) => a + b) / arr.length;
};

resetAll.addEventListener('click', function() {
    if(confirm('Are you sure you want to clear all data?')) {
    table.innerHTML = '<tr id="columns"> <td class="top">Car #</td><br><td class="top">Interaction Time</td></tr>';
    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00";

    average.innerHTML = '';
    total.innerHTML = ``;
    longest.innerHTML = ``;
    shortest.innerHTML = ``;
    }
})