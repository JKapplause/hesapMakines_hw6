

let simdikiToplam = 0;
let numara = "0";

let oncekiOperator = null;

const calcScreen = document.querySelector(".Hesap-numaraları");

document.querySelector('.hesapMakinesiTuslari').addEventListener("click",function(event){

    buttonClick(event.target.innerHTML);
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}

function handleSymbol(value){
    switch (value){
        case "C":
            numara = "0";
            simdikiToplam = 0;
            oncekiOperator = null;
            break;
        case "=":
            if(oncekiOperator === null){
                return;
            }
            flushOperation(parseInt(numara));
            numara = "" + simdikiToplam;
            oncekiOperator = null;
            simdikiToplam = 0;
            break;
        case "←":
            if(numara.length === 1){
                numara = "0";
            }
            else{
                numara = numara.substring(0,numara.length-1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleNumber(value){
    if(numara === "0"){
        numara = value;
    }else{
        numara += value;
    }
}

function handleMath(value){
    const internalBuffer = parseInt(numara);

    if (simdikiToplam === 0){
        simdikiToplam = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }

    oncekiOperator = value;

    numara = "0";
}

function flushOperation(internalBuffer){
    if(oncekiOperator === "+"){
        simdikiToplam += internalBuffer;
    }else if(oncekiOperator === "-"){
        simdikiToplam -= internalBuffer;
    }else if(oncekiOperator === "x"){
        simdikiToplam *= internalBuffer;
    }else{
        simdikiToplam /= internalBuffer;
    }
}

function rerenderScreen(){
    calcScreen.value = numara;
}