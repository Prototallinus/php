document.getElementById("description").style.display = 'none'; 
let minValue;
let maxValue;
let answerNumber;
let answerNumberToWord;

let stringUnits = '';
let stringDecades = '';
let stringHundreds = '';

let orderNumber = 0;
let gameRun;
let mustRetry = false;
let gameSolved=false;
let index = 0;

function assign(){

    gameRun = true;
    minValue = parseInt(document.getElementById("Min").value);
    maxValue = parseInt(document.getElementById("Max").value);
    
    minValue = (minValue < -999) ? minValue = -999: minValue;
    if (minValue >= 999 || isNaN(minValue) || (typeof(minValue) != "number") || (minValue == ("Infinity"||"-Infinity") ) ) {
        minValue = 0;
    }

    maxValue = (maxValue > 999) ? maxValue = +999: maxValue;
    if ( maxValue <= -999 || maxValue <= minValue || isNaN(maxValue) || (typeof(maxValue) != "number") || (maxValue == ("Infinity"||"-Infinity") ) ) {
        maxValue = (minValue >= 0) ? maxValue = minValue+100: maxValue = 100;
    }

    document.getElementById("divform").style.display ='none';
    document.getElementById("description").style.display ='inline';
    const dispMin = document.getElementById('dispMin');
    dispMin.innerText = minValue;
    const dispMax = document.getElementById('dispMax');
    dispMax.innerText = maxValue;

    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerNumberToWord = toWord(answerNumber);

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumberToWord }?`;

}


document.getElementById('btnRetry').addEventListener('click', function () {
    location.reload();
    const firstInput = document.getElementById("Min");
    firstInput.value = "0";
    const secondInput = document.getElementById("Max");
    secondInput.value = "100";
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || answerNumber  + 1 > maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
            mustRetry = true;
            gameSolved=false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            answerNumberToWord = toWord(answerNumber);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answerNumberToWord }?` :
                (phraseRandom === 1) ?
                `Наверное, это число ${answerNumberToWord }`:
                `Я знаю! Это ${answerNumberToWord }`;
                
            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || answerNumber  - 1 < minValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
            mustRetry = true;
            gameSolved=false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            answerNumberToWord = toWord(answerNumber);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answerNumberToWord }?` :
                (phraseRandom === 1) ?
                `Наверное, это число ${answerNumberToWord }`:
                `Я знаю! Это ${answerNumberToWord }`;
                
            answerField.innerText = answerPhrase;
        }
    }
})

function solution() {
    if (mustRetry==false && orderNumber > 0) {
        gameSolved=true;
        index+=1;
        if (gameSolved){
            const answerPhrase = (index === 1) ?
            `Я всегда угадываю\n\u{1F60E}` :
            (index === 2) ?
            `I'm cool`:
            `Я знал с самого начала!`;
            answerField.innerText = answerPhrase;
            if(index == 4){
                index = 1;
                answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
            }
        }
        gameRun = false;
    }
}

function toWord(answerNumber) {
    stringUnits = '';
    stringDecades = '';
    stringHundreds = '';
    sign = '';
    if (answerNumber < 0) {
        sign = 'минус';
    }
    if (answerNumber == 0) {
        stringUnits = 'ноль';
    }
    if((Math.abs(answerNumber%100) > Math.abs(19) || Math.abs(answerNumber) < Math.abs(10)) && Math.abs(answerNumber%10) != 0 ){
        switch (Math.abs(answerNumber%10)){
            case 1:
                stringUnits = 'один';
                break;
            case 2:
                stringUnits = 'два';
                break;
            case 3:
                stringUnits = 'три';
                break;
            case 4:
                stringUnits = 'четыре';
                break;
            case 5:
                stringUnits = 'пять';
                break;
            case 6:
                stringUnits = 'шесть';
                break;
            case 7:
                stringUnits = 'семь';
                break;
            case 8:
                stringUnits = 'восемь';
                break;
            case 9:
                stringUnits = 'девять';
                break;
        } 
    } else {
        switch (Math.abs(answerNumber%100)){
            case 11:
                stringUnits = 'одиннадцать';
                break;
            case 12:
                stringUnits = 'двенадцать';
                break;
            case 13:
                stringUnits = 'тринаадцать';
                break;
            case 14:
                stringUnits = 'четырнадцать';
                break;
            case 15:
                stringUnits = 'пятнадцать';
                break;
            case 16:
                stringUnits = 'шестнадцать';
                break;
            case 17:
                stringUnits = 'семнадцать';
                break;
            case 18:
                stringUnits = 'восемнадцать';
                break;
            case 19:
                stringUnits = 'девятнадцать';
                break;
        }
    }
    if (Math.abs(answerNumber%100) == 10) {
        stringUnits = 'десять'
    }
    if (Math.floor(Math.abs(answerNumber / 10)-Math.floor(Math.abs(answerNumber / 100))*10) > 1) {
        switch (Math.floor(Math.abs(answerNumber / 10)-Math.floor(Math.abs(answerNumber / 100))*10) * 10){
            case 20:
                stringDecades = 'двадцать';
                break;
            case 30:
                stringDecades = 'тридцать';
                break;
            case 40:
                stringDecades = 'сорок';
                break;
            case 50:
                stringDecades = 'пятьдесят';
                break;
            case 60:
                stringDecades = 'шестьдесят ';
                break;
            case 70:
                stringDecades = 'семьдесят';
                break;
            case 80:
                stringDecades = 'восемьдесят';
                break;
            case 90:
                stringDecades = 'девяносто';
                break;
        } 
    }
    
    if (Math.abs(answerNumber == 100)) {
        stringDecades = 'сто';
    }

    if (Math.floor(Math.abs(answerNumber / 100)) > 1) {
        switch (Math.floor(Math.abs(answerNumber / 100)) * 100){
            case 200:
                stringHundreds = 'двести';
                break;
            case 300:
                stringHundreds = 'триста';
                break;
            case 400:
                stringHundreds = 'четыреста';
                break;
            case 500:
                stringHundreds = 'пятьсот';
                break;
            case 600:
                stringHundreds = 'шестьсот ';
                break;
            case 700:
                stringHundreds = 'семьсот';
                break;
            case 800:
                stringHundreds = 'восемьсот';
                break;
            case 900:
                stringHundreds = 'девятьсот';
                break;
        } 
    }
    
    console.log(answerNumber);
    console.log(sign);
    console.log(stringHundreds);
    console.log(stringDecades);
    console.log(stringUnits);
    finalText = (`${sign} ${stringHundreds} ${stringDecades} ${stringUnits}`);
    if (finalText.length > 19) {
        return answerNumber;
    } else {
        return (`${sign} ${stringHundreds} ${stringDecades} ${stringUnits}`.replace(/\s+/g, ' ').trim());
    }
}