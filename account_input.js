const cal_img = document.querySelector("#cal_img");

cal_img.addEventListener("click", () => {
    const cal_div = document.querySelector(".cal");
    if(cal_div.style.display == "block"){
        cal_div.style.display = "none";
    } else {
        cal_div.style.display = "block";
    }
})

// 가계부 input 숫자 콤마 넣기
function comma(num){
    num = String(num).replace(/[^0-9]/g,'');
 
    return Number(num).toLocaleString();
}

function uncomma(num){
    num = String(num).replace(/,/g,'');

    return num;
}

// 계산기
const cal2 = document.querySelector(".cal2");

const cal_display = document.querySelector("#cal_display");
const cal_result = document.querySelector("#cal_result");

// 숫자 넣기
function cal_Num(num){
   cal_display.value += num;
}

// 하나씩 삭제
function cal_Del(){
    cal_display.value = cal_display.value.slice(0, -1);
}

// 전체 삭제
function cal_DelAll(){
    cal_display.value = "";
    cal_result.value = "";
}

// 계산하기
function cal(){
    try {
        const result = eval(cal_display.value);
        cal_result.value = comma(result);
    } catch (error) {
        alert("다시 계산하세요");
        cal_DelAll();
    }
}

// input 입력하면 콤마 붙이기
function keyUp (e){    
    e.target.value = comma(e.target.value);
}

// 가계부 내용 저장
var param = [];
var arr = [];
var date = document.getElementsByName("date");
var text = document.getElementsByName("text");
var income = document.getElementsByName("income");
var expense = document.getElementsByName("expense");

const account = document.querySelector("#account");

function saveList(){
    if(income.value == "" && expense.value == ""){
        console.log("확인1");
    }else{
        for(var i = 0; i<text.length; i++){
            param.push(date[i].value);
            param.push(text[i].value);
            param.push(uncomma(income[i].value));
            param.push(uncomma(expense[i].value));
        }
    
        for(var i = 0; i< account.rows.length-2; i++){
            arr[i] = param.splice(0,4);
            window.localStorage.setItem('account'+[i+1], arr[i]);
        }

        param = [];
    }
}

// 수입, 지출, 잔액 계산
const income_output = document.querySelector("#income_output");
const expense_output = document.querySelector("#expense_output");
const balance_output = document.querySelector("#balance_output");
var income_num = 0;
var expense_num = 0;
var balace_num = 0;

function num_cal(){
    saveList();

    for(var i = 0; i<window.localStorage.length; i++){
        var ac = window.localStorage.getItem("account"+[i+1]);
        var word = ac.split(',');

        var num_output = parseInt(word[2]);            
        income_num += num_output;

        num_output = 0;

        var num_output = parseInt(word[3]);            
        expense_num += num_output;
        
        num_output = 0;
    }

    console.log(income_num);
    console.log(expense_num);

    income_output.value = comma(income_num);        
    expense_output.value = comma(expense_num);
    balace_num = income_num - expense_num;
    balance_output.value = comma(balace_num);
    income_num = 0;
    expense_num = 0;
    balace_num = 0;
}


// 가계부 저장된 거 불러오기 
(function reset(){
    if(window.localStorage.length != 0){
        for(var i = 0; i<window.localStorage.length;i++){
            var ac = window.localStorage.getItem("account"+[i+1]);
            var word = ac.split(',');

            const newRow = account.insertRow();

            const Row1 = newRow.insertCell(0);
            Row1.innerHTML = '<input type="date" value="'+ word[0] +'" class="date_input" name="date"></input>';
            const Row2 = newRow.insertCell(1);
            Row2.innerHTML = '<input type="text" value="'+ word[1] +'" class = "text_input" name="text">';
            const Row3 = newRow.insertCell(2);
            Row3.innerHTML = '<input type="text" value="'+ comma(word[2]) +'" class="income_input" name="income" onchange="num_cal()" onkeyup="keyUp(event)" />';
            const Row4 = newRow.insertCell(3);
            Row4.innerHTML = '<input type="text" value="'+ comma(word[3]) +'" class="expense_input" name="expense" onchange="num_cal()" onkeyup="keyUp(event)">';
        }     
        num_cal();

    } else {
        const newRow = account.insertRow();

        const Row1 = newRow.insertCell(0);
        Row1.innerHTML = '<input type="date" value="" class="date_input" name="date"></input>';
        const Row2 = newRow.insertCell(1);
        Row2.innerHTML = '<input type="text" value="" class = "text_input" name="text">';
        const Row3 = newRow.insertCell(2);
        Row3.innerHTML = '<input type="text" value="0" class="income_input" name="income" onchange="num_cal()" onkeyup="keyUp(event)" />';
        const Row4 = newRow.insertCell(3);
        Row4.innerHTML = '<input type="text" value="0" class="expense_input" name="expense" onchange="num_cal()" onkeyup="keyUp(event)">';

        income_output.value = 0;
        expense_output.value = 0;
        balance_output.value = 0;
    }
})();

// 가계부 늘리기
const rowPlus = document.querySelector("#bt_plus");

rowPlus.addEventListener("click", () => {
    const newRow = account.insertRow();

    const Row1 = newRow.insertCell(0);
    Row1.innerHTML = '<input type="date" value="" class="date_input" name="date"></input>';
    const Row2 = newRow.insertCell(1);
    Row2.innerHTML = '<input type="text" class = "text_input" name="text">';
    const Row3 = newRow.insertCell(2);
    Row3.innerHTML = '<input type="text" value="0" class="income_input" name="income" onchange="num_cal()" onkeyup="keyUp(event)" />';
    const Row4 = newRow.insertCell(3);
    Row4.innerHTML = '<input type="text" value="0" class="expense_input" name="expense" onchange="num_cal()" onkeyup="keyUp(event)">';
})







