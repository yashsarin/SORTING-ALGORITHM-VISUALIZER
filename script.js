const canvas = document.getElementById('sortingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let n = 80;
let arr = Array.from({length: n}, () => Math.floor(Math.random() * 350));
let sorted = false;
let speed = 50;

function drawArray(index) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < n; i++) {
        ctx.fillStyle = sorted || i === index ? '#76c7c0' : '#f8d71e';
        ctx.fillRect(i * (canvas.width / n), canvas.height - arr[i], (canvas.width / n) - 2, arr[i]);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateSpeed() {
    const speedInput = document.getElementById('speed');
    speed = 101 - speedInput.value;
}

async function insertionSort() {
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            drawArray(j + 1);
            await sleep(speed);
        }
        arr[j + 1] = key;
    }
    sorted = true;
    drawArray(-1);
}

async function bubbleSort() {
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            drawArray(j);
            await sleep(speed);
        }
    }
    sorted = true;
    drawArray(-1);
}

async function selectionSort() {
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
            drawArray(j);
            await sleep(speed);
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    sorted = true;
    drawArray(-1);
}

function startInsertionSort() {
    sorted = false;
    arr = Array.from({length: n}, () => Math.floor(Math.random() * 350));
    insertionSort();
}

function startBubbleSort() {
    sorted = false;
    arr = Array.from({length: n}, () => Math.floor(Math.random() * 350));
    bubbleSort();
}

function startSelectionSort() {
    sorted = false;
    arr = Array.from({length: n}, () => Math.floor(Math.random() * 350));
    selectionSort();
}

drawArray(-1);

