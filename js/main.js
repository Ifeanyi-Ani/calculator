// setting variables
let calculatorDisplay=document.querySelector('h1');
let inputBtns=document.querySelectorAll('button');
let resetBtn=document.getElementById('clrBtn')

let initialValue=0;
let operator='';
let nextValue=false;

function numberValue(number){
// this block of if-else will replace the display with the new input after pressing the operator
    if (nextValue){
        calculatorDisplay.innerHTML=number  
        nextValue=false;
    }else {
        let calculatorDisplayValue=calculatorDisplay.textContent;
        calculatorDisplay.textContent= calculatorDisplayValue==0 ? number : calculatorDisplayValue + number;    
    }
   
}

function addDecimal(){
    // if there is no decimal we should add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
    }
}
let calculateOperation={
'+':(firstNumbers,secondNumbers) => firstNumbers + secondNumbers,
'-':(firstNumbers,secondNumbers) => firstNumbers - secondNumbers,
'/':(firstNumbers,secondNumbers) => firstNumbers / secondNumbers,
'*':(firstNumbers,secondNumbers) => firstNumbers * secondNumbers,
'%':(firstNumbers,secondNumbers) => firstNumbers % secondNumbers,
'=':(secondNumbers) => secondNumbers
};

function operations(operators){
    let currentValue= Number(calculatorDisplay.textContent);
    if (!initialValue){
        initialValue=currentValue;
    }else {
        let calculateOp=calculateOperation[operator](initialValue, currentValue);
        calculatorDisplay.textContent=calculateOp;
    }
    
    operator=operators;
    nextValue=true;

}

// adding event listentener for each button
inputBtns.forEach((inputBtn)=>{
    if (inputBtn.classList.length===0){
        inputBtn.addEventListener('click', ()=> numberValue(inputBtn.value))
    }else if (inputBtn.classList.contains('operators')){
        inputBtn.addEventListener('click', ()=> operations(inputBtn.value))
    }else if (inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', ()=> addDecimal())
}
})

//resetting the calculator
resetBtn.addEventListener('click', ()=> {
    calculatorDisplay.textContent=0
    initialValue=0;
    operator='';
    nextValue=false;
})
