/***********************************************************************
* Function ManipulateDOM()
* This function will create an element when called, displaying additional
* information to the user upon request. To do this, it will create a new
* p element, will load a text in the node, and then append the child 
* element with the text. It will also remove the old content as it is not
* relevant to the page flow.
* ***********************************************************************/

function manipulateDOM(){
    // Content to be loaded into node. 
    var text = "Compound interest (or compounding interest) is interest calculated on the initial principal and also on the accumulated interest of previous periods of a deposit or loan. Thought to have originated in 17th century Italy, compound interest can be thought of as “interest on interest,” and will make a sum grow at a faster rate than simple interest, which is calculated only on the principal amount. The rate at which compound interest accrues depends on the frequency of compounding such that the higher the number of compounding periods, the greater the compound interest. Thus, the amount of compound interest accrued on $100 compounded at 10% annually will be lower than that on $100 compounded at 5% semi-annually over the same time period.";
    // New element to be displayed
    var newP = document.createElement("p");
    // "loads" text into node
    var node = document.createTextNode(text);
    //New element is compleated when node is appended. 
    newP.appendChild(node);
    // Element to be replaced is called
    var element = document.getElementById("information");
    //new element is inserted
    element.appendChild(newP);
    //old element is removed
    removeElement();
}

/***********************************************************************
* Function RemoveElement()
* This function will be called by ManipulateDOM in order to remove the
* old element as it will not longer be needed, 
* ***********************************************************************/
function removeElement(){
    var elem = document.getElementById("explanation");
    elem.style.display = "none";
    
    
}

//Fluency Topic included in this function # 1 - Functions/Variables/Parameters   
function getInput(){
    var principal= parseFloat(document.getElementById("currPrincipal").value);
    var PMT = parseFloat(document.getElementById("monthlyAddition").value);
    var t = parseFloat(document.getElementById("yearsGrow").value);
    var r =parseFloat(document.getElementById("interestRate").value);
    var n= parseFloat(document.getElementById("compoundTerms").value);
    calculateFutureValue(principal, PMT, t, r, n )
}
    
// Decided to increase modularization (is that a word?) in program
// in order to make it easier to manipulate and read.
function calculateFutureValue(principal, PMT, t, r, n ){ 
    /**********************************************************
    * Future value formula:
    * Compound interest for principal:
    * P(1+r/n)(nt)
    * FV = p * ((i+1)^t) + d *( (((1+i)^t)-1)/i) * (1 +i)
    * Where:
    * A = the future value of the investment/loan, including   
    * interest
    * P = the principal investment amount (the initial deposit 
    * or loan amount)
    * PMT = the monthly payment
    * r = the annual interest rate (decimal)
    * n = the number of compounds per period 
    * t = the number of periods (months, years, etc) 
    * 
    **********************************************************/
    // I decided it was easier to break the problem into
    // smaller calculations.
    var i = (r/100)/n;
    var tn = t * n;
    var base = i + 1;
    //FV = p * ((i+1)^t) + d *( (((1+i)^t)-1)/i) * (1 +i)
    var futureValue = (principal * (Math.pow(base,tn))) + PMT *( ((Math.pow(base,tn))-1)/i) * (base);
    
    // Display result
    document.getElementById("futureMoneyResult").innerHTML = "$" + futureValue.toFixed(2);
    
    //Information needed for function draw
    var totalPMT = (PMT * n) * t;
    var totalInvested = totalPMT + principal;
    var totalInterest = futureValue - totalInvested;
   
    // draw function called
    draw(principal, totalPMT , totalInterest, futureValue);
    
    // Display function called
    displayAnalysis(principal, totalPMT , totalInterest, futureValue);
    
    //this function automatically save state when user hits calculate
    autoSaveState(principal, PMT, t, r, n);
} 

// Class creation
class BarGraph {
    constructor(xV, yV, wV, hV)
    {
        this._x = xV;
        this._y = yV;
        this._w = wV;
        this._h = hV;
    }         
}

function draw(principal, totalPMT , totalInterest, futureValue){ 
    //ctx.fillRect(x, y, width, height);
    // principal Bar Graph
    var h1 = 200 * (principal/futureValue); 
    var x1 = (200 - h1) + 20;   
    const pGraph = new BarGraph(25,x1,50,h1);
    
    //Addition Bar Graph 
    var h2 =  200 * (totalPMT/futureValue);
    var x2 = (200 - h2) + 20;
    const aGraph = new BarGraph(100,x2,50,h2);
     
    //Intertest Bar Graph 
    var h3 =  200 * (totalInterest/futureValue);
    var x3 = (200 - h3) + 20;      
    const iGraph = new BarGraph(175,x3,50,h3);
     
     
    //Total Bar Graph - Always at 100%
    const tGraph = new BarGraph(250,20,50,200);
     
    // Size of Canvas 
    var canvas = document.getElementById("canvasId");
    var width = canvas.width = 325;
    var height = canvas.height = 240;
    
    //Canvas rendering method (2d)
    var ctx = canvas.getContext('2d');       
    // color of the bars
    ctx.fillStyle = '#1565C0'
        
    /******************************************
    * Each of this represent each bar at 100%
    * ctx.fillRect(25,20,50,200);
    * ctx.fillRect(100,20,50,200);
    * ctx.fillRect(175,20,50,200);
    * ctx.fillRect(250,20,50,200);
    *******************************************/
    //Principal Bar
    ctx.fillRect(pGraph._x,pGraph._y,pGraph._w,pGraph._h);
    
    //Addition Bar
    ctx.fillRect(aGraph._x,aGraph._y,aGraph._w,aGraph._h);
         
    //Addition Bar
    ctx.fillRect(iGraph._x,iGraph._y,iGraph._w,iGraph._h);
     
    //Total Bar
    ctx.fillRect(tGraph._x,tGraph._y,tGraph._w,tGraph._h);
    

    //Text for graphics
    //fillText(text, x, y [, maxWidth]);
    var display = ["Initial","Addition","Interest","Total"];
    var position = [33, 100,177,260];
    var i = 0;
    
    // While loop
    do {
        ctx.fillStyle = 'black';
        ctx.font = '13px georgia';
        ctx.fillText(display[i],position[i], 235);
        i++;
    }  while (i < 4); 


}

   
function displayAnalysis(principal, totalPMT , totalInterest, futureValue){
    var message = "";
    
    //associative array
    var response = {a:" your <strong> monthly deposits!</strong> Try to leave it longer.", b: " your <strong> interest earning!!!</strong> Congratulations!", c:" <strong> your principal.</strong> Try to increase your contributions."}
    
    if (totalPMT >= totalInterest && totalPMT >= principal)
    {
        message = response.a ;
    }
    else if (totalInterest >= totalPMT && totalInterest >= principal)
    {
        message = response.b ;
    }
    else {
        message =  response.c;
    }
    
    // Message to be displayed
      document.getElementById("analysis").innerHTML = "The graphic shows what portion of your income comes from the initial investment, the monthly deposits and interests. Based on your analisys, most of your income comes from" + message;
}

/************************************************************************ 
* Function: autoSaveState()
* This function will be executed when user clicks on Calculate button
* and will "automatically" saved the current input into local storage
*************************************************************************/
function autoSaveState(principal, PMT, t, r, n){
    //check if local storage is available
    if (typeof(Storage)!=="Undefined"){
        localStorage.setItem("Principal", principal);
        localStorage.setItem("PMT", PMT);
        localStorage.setItem("t", t);
        localStorage.setItem("r", r);
        localStorage.setItem("n", n);
    //Displays message if not available
    }else {    
         alert('Please update your browser!');
    }  
}

/*************************************************************************** 
* Function: saveState()
* This function will create a key under which the JSON object will be saved;
* an associative array which will save the input from user; and the last 
* line will store a Json object using JSON.stringfy
****************************************************************************/
function saveState(){
    //Key created
    var key = 'UserInputArray';
    //obtain input and store it
    var principal = parseFloat(document.getElementById("currPrincipal").value);
    var PMT = parseFloat(document.getElementById("monthlyAddition").value);
    var t = parseFloat(document.getElementById("yearsGrow").value);
    var r =parseFloat(document.getElementById("interestRate").value);
    var n = parseFloat(document.getElementById("compoundTerms").value);
    //associative array. It store user input
    var stateResponse = {Principal: principal, MonthlyDeposit: PMT, Years: t, Interest: r, Terms: n }
    //Stringify in order to store information in local storage
    if (typeof(Storage)!=="Undefined"){
        localStorage.setItem(key, JSON.stringify(stateResponse));
    }else { 
        alert('Please update your browser!');
    }
}

/*************************************************************************** 
* Function: loadState()
* This function will simply retrieve infomration from local storage and will
* display it inside of the input fields on the HTML file
****************************************************************************/
function loadState(){
    if (typeof(Storage)!=="Undefined"){
        document.getElementById('currPrincipal').value = localStorage.getItem("Principal");
        document.getElementById('monthlyAddition').value = localStorage.getItem("PMT");
        document.getElementById('yearsGrow').value = localStorage.getItem("t");
        document.getElementById('interestRate').value = localStorage.getItem("r");
        document.getElementById('compoundTerms').value = localStorage.getItem("n");
    }else {     
        alert('Please update your browser!');
    }
}

/*************************************************************************** 
* Function: loadStateAndResult()
* This function will use JSON.parse to retrieve information from local 
* storage and will create an object to store it. It will them, assign each 
* specific value to be displayed inside of the input fields on the HTML file
* and will execute the calculateFutureValue() function to display result
* and analysis back to user
****************************************************************************/
function loadStateAndResult(){
    
    //Json parse is use to read data from local storage to object
    let item = JSON.parse(localStorage.getItem('UserInputArray'));

    //assign value from object to each input field
    document.getElementById('currPrincipal').value = item.Principal;
    document.getElementById('monthlyAddition').value = item.MonthlyDeposit;
    document.getElementById('yearsGrow').value = item.Years;
    document.getElementById('interestRate').value = item.Interest;
    document.getElementById('compoundTerms').value = item.Terms;
    
    //Calls calculateFutureValue() function and passes objects items as values.
    calculateFutureValue(item.Principal, item.MonthlyDeposit, item.Years, item.Interest, item.Terms);
  
}