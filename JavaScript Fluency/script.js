//Fluency Topic included in this function # 1 - Functions/Variables/Parameters   
function calculateFutureValue(){
    var principal= parseFloat(document.getElementById("currPrincipal").value);
    var PMT = parseFloat(document.getElementById("monthlyAddition").value);
    var t = parseFloat(document.getElementById("yearsGrow").value);
    var r =parseFloat((document.getElementById("interestRate").value)/100);
    var n= parseFloat(document.getElementById("compoundTerms").value);
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
    var i = r/n;
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
} 
// Graphic Class created including a constructor 
 //Fluency Topic included in this function # 2 Object Creation functions, Inheritance, Methods,
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