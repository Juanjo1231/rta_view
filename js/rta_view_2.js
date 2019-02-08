var jboxes = $(".widgetHeader");
var jsetBtn = $("#setTitle");
var jsetBox = $("#settings");
var mainBox,
    escBox,
    espQBox,
    watchBox,
    agentsBox,
    holdBox;

var limits = [
  "Available", "*available", "st_aval",
  "Inbound", "inbound", "st_inb",
  "Outbound", "outbound", "st_outb",
  "Grocery Outbound", "gOutbound", "st_outb",
  "After", "acw", "st_acw",
  "SYSTEM P", "systemP", "st_unaval",
  "SYSTEM W", "systemW", "st_unaval",
  "BREAK", "break", "st_unaval",
  "LUNCH", "lunch", "st_unaval",
  "Abandoned", "hpa", "st_unaval",
  "Refused", "refused", "st_unaval",
  "Input", "rnmi", "st_unaval",
  "COACHING", "coaching", "st_unaval",
  "SUPPORT", "floorS", "st_unaval",
  "ONLY", "supOnly", "st_unaval",
  "MEETING", "meeting", "st_unaval",
  "NESTING", "nesting", "st_unaval",
  "TRAIN P", "trainP", "st_unaval",
  "TRAIN W", "trainW", "st_unaval",
  "Grocery System P", "gSystemP", "st_unaval",
  "Grocery System W", "gSystemW", "st_unaval",
  "Grocery Train P", "gTrainP", "st_unaval",
  "Grocery Train W", "gTrainW", "st_unaval",
  "Grocery Backoffice", "gBack", "st_unaval",
  "Grocery Coaching", "gCoaching", "st_unaval",
  "Grocery Email", "gEmail", "st_unaval",
  "Grocery Feedback", "gFeed", "st_unaval",
  "Grocery Floor Support", "gFloor", "st_unaval",
  "Grocery Meeting", "gMeeting", "st_unaval",
  "Grocery Nesting", "gNesting", "st_unaval",
  "Grocery Right Now Manual Input", "gRnmi", "st_unaval",
  "*Unavailable", "unavailable*", "st_unaval"
];
var sitesList = {
    "24 7 Escal Denver" : "lcDen",
    "24 7 Escal Grocery" : "lcDen",
    "24 7 Escal Guat" : "lcGua",
    "24 7 Escal Tampa" : "lcTam",
    "24 7 Intouch Denver" : "lcDen",
    "24 7 Intouch Gaut" : "lcGua",
    "24 7 Intouch Grocery" : "lcDen",
    "24 7 Intouch Nesting Team DEN" : "lcDen",
    "24 7 Intouch Nesting Team GUA" : "lcGua",
    "24 7 Intouch Nesting Team TPA" : "lcTam",
    "24 7 Intouch Tampa" : "lcTam",
    "24-7 Guatemala Supervisor" : "lcGua",
    "24-7 Tampa Supervisor" : "lcTam",
    "Walmart Grocery" : "lcDen",
    '24 7 Intouch Guat Spanish'     : 'lcGua'
  }
var mainBoxCont = "<div id='sideNavCont'> <div id='setTitle' class='initialPos'>Time Limits</div> <div id='settings' class='sideNav initialPos'> <div class='setRow'> <label for='available'>Available</label> <input id='available' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='inbound'>Inbound</label> <input id='inbound' type='text' class='setInpt' placeholder='00:07:00' value='00:07:00'> </div> <div class='setRow'> <label for='outbound'>Outbound</label> <input id='outbound' type='text' class='setInpt' placeholder='00:07:00' value='00:07:00'> </div> <div class='setRow gro'> <label for='gOutbound'>G. Outbound</label> <input id='gOutbound' type='text' class='setInpt' placeholder='00:07:00' value='00:07:00'> </div> <div class='setRow'> <label for='unavailable'>Unavailable</label> <input id='unavailable' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='acw'>After Call Work</label> <input id='acw' type='text' class='setInpt' placeholder='00:00:20' value='00:00:20'> </div> <div class='setRow'> <label for='systemP'>System P</label> <input id='systemP' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='systemW'>System W</label> <input id='systemW' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='break'>Break</label> <input id='break' type='text' class='setInpt' placeholder='00:15:00' value='00:15:00'> </div> <div class='setRow'> <label for='lunch'>Lunch</label> <input id='lunch' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow'> <label for='hpa'>Held Party Abandoned</label> <input id='hpa' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='refused'>Refused</label> <input id='refused' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='rnmi'>RN Manual Input</label> <input id='rnmi' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow gro'> <label for='gSystemP'>G. System P</label> <input id='gSystemP' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow gro'> <label for='gSystemW'>G. System W</label> <input id='gSystemW' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow gro'> <label for='gRnmi'>G. RN Manual Input</label> <input id='gRnmi' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='coaching'>Coaching</label> <input id='coaching' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow'> <label for='floorS'>Floor Support</label> <input id='floorS' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow'> <label for='supOnly'>Supervisor Only</label> <input id='supOnly' type='text' class='setInpt' placeholder='00:00:01' value='00:00:01'> </div> <div class='setRow'> <label for='meeting'>Meeting</label> <input id='meeting' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow'> <label for='nesting'>Nesting</label> <input id='nesting' type='text' class='setInpt' placeholder='00:02:00' value='00:02:00'> </div> <div class='setRow'> <label for='trainP'>Train P</label> <input id='trainP' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow'> <label for='trainW'>Train W</label> <input id='trainW' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gTrainP'>G. Train P</label> <input id='gTrainP' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gTrainW'>G. Train W</label> <input id='gTrainW' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gBack'>G. Backoffice</label> <input id='gBack' type='text' class='setInpt' placeholder='00:00:00' value='00:00:00'> </div> <div class='setRow gro'> <label for='gCoaching'>G. Coaching</label> <input id='gCoaching' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gEmail'>G. Email</label> <input id='gEmail' type='text' class='setInpt' placeholder='00:00:00' value='00:00:00'> </div> <div class='setRow gro'> <label for='gFeed'>G. Feedback</label> <input id='gFeed' type='text' class='setInpt' placeholder='00:00:00' value='00:00:00'> </div> <div class='setRow gro'> <label for='gFloor'>G. Floor Support</label> <input id='gFloor' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gMeeting'>G. Meeting</label> <input id='gMeeting' type='text' class='setInpt' placeholder='00:30:00' value='00:30:00'> </div> <div class='setRow gro'> <label for='gNesting'>G. Nesting</label> <input id='gNesting' type='text' class='setInpt' placeholder='00:02:00' value='00:02:00'> </div> </div> </div> <div id='rtaViewCont'></div> <style> #settings{ display: inline-block; position: absolute; top: 34px; background-color: #9e9e9e; padding: 0.5em; color: white; transition: 0.3s; transform: translateX(0); display: grid; grid-template-columns: 1fr 1fr; } #settings.initialPos{ transform: translateX(-100%); transition: 0.3s; } #settings.showNav{ left: 6px; transition: 0.3s; } #setTitle{ display: inline-block; border: 1px solid; position: absolute; width: 12.8em; padding: 0.3em; background-color: #9e9e9e; color: white; font-size: 1.2em; transition: 0.3s; transform-origin: 0 100%; cursor: pointer; } #setTitle.initialPos{ transform: rotate(90deg); transition: 0.3s; width: 48.8em; } #setTitle.showTitle{ transition: 0.3s; } .setInpt{ width: 6em !important; text-align: center; border: none; font-size: 12px !important; } div.setRow{ text-align: right; padding: 0.2em; } .rtaTable{ margin: 0.3em; } #rtaViewCont{ margin: 2.4em 4em; display: inline-block; padding: 0.5em; } .rtaTable{ display: inline-block; vertical-align: top; } .rtaTable th, .rtaTable td{ border: 1px solid black; padding: 0.3em; font-size: 0.9em; } .st_aval{ background-color: green; text-align: center; } .st_unaval{ background-color: red; text-align: center; } .st_inb{ background-color: #9C27B0; color: #e4e4e4; text-align: center; } .st_outb{ background-color: yellow; text-align: center; } .st_acw{ background-color: orange; text-align: center; } .hold{ background-color: #9e9e9e; } </style>";

var rtaViewTxt = "<table id='lcGua' class='rtaTable'> <tr> <th colspan='3'>Guatemala</th> </tr> <tr> <th>Agent Name</th> <th>Time</th> <th>Hold</th> </tr> <tr id='Guainbound' hidden><th colspan='3'>Long Inbound</th></tr> <tr id='Guaoutbound' hidden><th colspan='3'>Long Outbound</th></tr> <tr id='Guaacw' hidden><th colspan='3'>Long ACW</th></tr> <tr id='GuasystemP' hidden><th colspan='3'>System P</th></tr> <tr id='GuasystemW' hidden><th colspan='3'>System W</th></tr> <tr id='Guabreak' hidden><th colspan='3'>Break</th></tr> <tr id='Gualunch' hidden><th colspan='3'>Lunch</th></tr> <tr id='Guahpa' hidden><th colspan='3'>Held Party Abandoned</th></tr> <tr id='Guarefused' hidden><th colspan='3'>Refused</th></tr> <tr id='Guarnmi' hidden><th colspan='3'>Right Now Manual Input</th></tr> <tr id='Guacoaching' hidden><th colspan='3'>Coaching</th></tr> <tr id='GuafloorS' hidden><th colspan='3'>Floor Support</th></tr> <tr id='GuasupOnly' hidden><th colspan='3'>Supervisor Only</th></tr> <tr id='Guameeting' hidden><th colspan='3'>Meeting</th></tr> <tr id='Guanesting' hidden><th colspan='3'>Nesting</th></tr> <tr id='GuatrainP' hidden><th colspan='3'>Train P</th></tr> <tr id='GuatrainW' hidden><th colspan='3'>Train W</th></tr> <tr id='Guaunavailable' hidden><th colspan='3'>Unavailable</th></tr> <tr id='Guahold' hidden><th colspan='3'>Hold</th></tr></table><table id='lcTam' class='rtaTable'> <tr> <th colspan='3'>Tampa</th> </tr> <tr> <th>Agent Name</th> <th>Time</th> <th>Hold</th> </tr> <tr id='Taminbound' hidden><th colspan='3'>Long Inbound</th></tr> <tr id='Tamoutbound' hidden><th colspan='3'>Long Outbound</th></tr> <tr id='Tamacw' hidden><th colspan='3'>Long ACW</th></tr> <tr id='TamsystemP' hidden><th colspan='3'>System P</th></tr> <tr id='TamsystemW' hidden><th colspan='3'>System W</th></tr> <tr id='Tambreak' hidden><th colspan='3'>Break</th></tr> <tr id='Tamlunch' hidden><th colspan='3'>Lunch</th></tr> <tr id='Tamhpa' hidden><th colspan='3'>Held Party Abandoned</th></tr> <tr id='Tamrefused' hidden><th colspan='3'>Refused</th></tr> <tr id='Tamrnmi' hidden><th colspan='3'>Right Now Manual Input</th></tr> <tr id='Tamcoaching' hidden><th colspan='3'>Coaching</th></tr> <tr id='TamfloorS' hidden><th colspan='3'>Floor Support</th></tr> <tr id='TamsupOnly' hidden><th colspan='3'>Supervisor Only</th></tr> <tr id='Tammeeting' hidden><th colspan='3'>Meeting</th></tr> <tr id='Tamnesting' hidden><th colspan='3'>Nesting</th></tr> <tr id='TamtrainP' hidden><th colspan='3'>Train P</th></tr> <tr id='TamtrainW' hidden><th colspan='3'>Train W</th></tr> <tr id='Tamunavailable' hidden><th colspan='3'>Unavailable</th></tr> <tr id='Tamhold' hidden><th colspan='3'>Hold</th></tr></table><table id='lcDen' class='rtaTable'> <tr> <th colspan='3'>Grocery</th> </tr> <tr> <th>Agent Name</th> <th>Time</th> <th>Hold</th> </tr> <tr id='Deninbound' hidden><th colspan='3'>Long Inbound</th></tr> <tr id='Denoutbound' hidden><th colspan='3'>Long Outbound</th></tr> <tr id='Denacw' hidden><th colspan='3'>Long ACW</th></tr> <tr id='DengOnbound' hidden><th colspan='3'>Grocery Outbound</th></tr> <tr id='DengSystemP' hidden><th colspan='3'>Grocery System P</th></tr> <tr id='DengSystemW' hidden><th colspan='3'>Grocery System W</th></tr> <tr id='DengTrainP' hidden><th colspan='3'>Grocery Train P</th></tr> <tr id='DengTrainW' hidden><th colspan='3'>Grocery Train W</th></tr> <tr id='DengBack' hidden><th colspan='3'>Grocery Backoffice</th></tr> <tr id='DengCoaching' hidden><th colspan='3'>Grocery Coaching</th></tr> <tr id='DengEmail' hidden><th colspan='3'>Grocery Email</th></tr> <tr id='DengFeed' hidden><th colspan='3'>Grocery Feedback</th></tr> <tr id='DengFloor' hidden><th colspan='3'>Grocery Floor Support</th></tr> <tr id='DengMeeting' hidden><th colspan='3'>Grocery Meeting</th></tr> <tr id='DengNesting' hidden><th colspan='3'>Grocery Nesting</th></tr> <tr id='DengRnmi' hidden><th colspan='3'>Grocery RN Manual Imput</th></tr> <tr id='Denunavailable' hidden><th colspan='3'>Unavailable</th></tr> <tr id='Denhold' hidden><th colspan='3'>Hold</th></tr></table>";

//COMPLEMENTAL FUNCTIONS
function strToMilli(str){
  var col1 = str.indexOf(":", 0);
  var col2 = str.indexOf(":", col1 + 1);
  var hrs,
      min,
      sec,
      mil;
  if(col1 != -1 && col2 != -1){
    hrs = Number(str.substr(0, col1)) * 3600000;
    min = Number(str.substr(col1 + 1, col2 - col1 - 1)) * 60000;
    sec = Number(str.substr(col2 + 1, 2)) * 1000;
    mil = hrs + min + sec;
  }
  else if(col1 != -1 && col2 == -1){
    min = Number(str.substr(0, col1)) * 60000;
    sec = Number(str.substr(col1 + 1, 2)) * 1000;
    mil = min + sec;
  }
  return mil;
}
function showSettings(obj){
  var is = false;
  var jsetBtn = $("#setTitle");
  var jsetBox = $("#settings");

  if(obj.className.includes("initialPos")){
    obj.className = obj.className.replace("initialPos", "showTitle");
    jsetBox[0].className = jsetBox[0].className.replace("initialPos", "showNav");
    is = true;
  }
  if(obj.className.includes("showTitle") && is === false){
    obj.className = obj.className.replace("showTitle", "initialPos");
    jsetBox[0].className = jsetBox[0].className.replace("showNav", "initialPos");
  }
}
//APPLICATION CODE
function setBoxes(){
  for(i = 0; i < jboxes.length; i++){
    
    if(jboxes[i].textContent.includes("RTA-Main")){
      mainBox = jboxes[i].parentElement;
    }
    if(jboxes[i].textContent.includes("RTA-EscList")){
      escBox = jboxes[i].parentElement;
    }
    if(jboxes[i].textContent.includes("RTA-SpanishQ")){
      espQBox = jboxes[i].parentElement;
    }
    if(jboxes[i].textContent.includes("RTA-Watcher")){
      watchBox = jboxes[i].parentElement;
    }
    if(jboxes[i].textContent.includes("RTA-AgentsList")){
      agentsBox = jboxes[i].parentElement;
    }
    if(jboxes[i].textContent.includes("RTA-CallsList")){
      holdBox = jboxes[i].parentElement;
    }
  }
}
function setEnviroment(){
  setBoxes();
  mainBox.children[1].children[1].innerHTML = mainBoxCont;

  let title = mainBox.querySelector("#setTitle")
  title.onclick = showSettings.bind(null, title);

  runApp()
  setInterval(runApp, 5000);
}

function runApp(){
  var rtaView = document.getElementById("rtaViewCont");
  rtaView.innerHTML = rtaViewTxt;
  scoutAgentList();
  checkHold();
}
function scoutAgentList(){
  var agentsList = agentsBox.children[4].children[1].children[4].children[0].children;
  
  for(i = 0; i < agentsList.length; i++){
    var agentName = agentsList[i].children[0].textContent;
    var state = agentsList[i].children[1].textContent;
    var time = agentsList[i].children[2].textContent;
    var team = agentsList[i].children[3].textContent;
    var siteId, siteTable;
    var timeMilli = strToMilli(time);
    
    var validPause = validatePause(state, timeMilli);
    
    if(state === " Unavailable"){
      siteId = "#" + sitesList[team];
      siteTable = $(siteId);
      validPause = validatePause("*Unavailable", timeMilli);
    }
    if(validPause.isValid && validPause.auxType == "aux"){
      siteId = "#" + sitesList[team];
      siteTable = $(siteId);
      appendNewRow(siteTable, agentName, state, time, validPause.styl, validPause.titleId);
    }
  }
}
function validatePause(state, statTime, agentName){
  var outOf = {
          isValid : false,
          styl : "none",
          auxType : "aux"
        };
  for(e = 0; e < limits.length - 1; e++){
    var pausa = limits[e];
    var inptId = limits[e+1];
    var auxStyl = limits[e+2];
    var aux = auxStyl == "st_aval" ? "available" : "aux";
    var tst = inptId.indexOf("*") != -1  ? inptId.replace("*", "") : inptId; 
    var jid = "#" + tst;
    var limitBox = $(jid);

    if( state.includes(pausa) ){
      var limitMilli = strToMilli(limitBox.val())
      if(statTime >= limitMilli && limitMilli > 0){
        outOf = {
          isValid : true,
          styl : auxStyl,
          auxType : aux,
          titleId : inptId
        };
      }
    }
  }
  return outOf;
}
function appendNewRow(tabla, nombre, pausa, tiempo, estilo, titulo){
  var newTr = document.createElement("tr");
  var td_name_o = document.createElement("td");
  var td_time_o = document.createElement("td");
  var titleId, titleObj;
  
  if(tabla[0].id.includes("Gua")){
    titleId = "#Gua" + titulo;
  }
  if(tabla[0].id.includes("Tam")){
    titleId = "#Tam" + titulo;
  }
  if(tabla[0].id.includes("Den")){
    titleId = "#Den" + titulo;
  }
  
  titleObj = $(titleId);
  titleObj.removeAttr("hidden");
 
  td_name_o.textContent = nombre;
  td_time_o.textContent = tiempo;
  td_time_o.setAttribute("class", estilo);
  
  newTr.appendChild(td_name_o);
  newTr.appendChild(td_time_o);
  newTr.setAttribute("id", nombre);
  
  titleObj.after(newTr);
}

function checkHold(){
  var rows = holdBox.children[4].children[1].children[4].children[0].children;
  for(var i = 0; i < rows.length; i++){
    var state = rows[i].children[0].textContent;
    var agent = rows[i].children[1].textContent;
    var time  = rows[i].children[2].textContent;

 //VALIDATE PAUSE
     if(state.includes("Hold") && agent !== " "){
      var agentRow = document.getElementById(agent);
      appendHold(agentRow, state, agent);
    }
  }
}
function appendHold(obj, time_str, agent){
  var time = time_str.substr(10, 5);
  time = time[0] === "0" ? time.substr(1, time.length -1) : time;
  
  if(obj){
    var newTd = document.createElement("td");
    newTd.setAttribute("class", "hold");
    newTd.textContent = time;
    obj.appendChild(newTd);
  }
  else{
    
    var tableId = getTableId(agent);
    var tabla, titleId, titleTd;
    
    if(tableId.includes("Gua")){
    titleId = "#Gua" + "hold";
    }
    if(tableId.includes("Tam")){
      titleId = "#Tam" + "hold";
    }
    if(tableId.includes("Den")){
      titleId = "#Den" + "hold";
    }
    
    tabla = document.getElementById(tableId);
    titleTd = $(titleId);
    titleTd.removeAttr("hidden");
    
    var newRow = document.createElement("tr");
    var nameTd = document.createElement("td");
    nameTd.textContent = agent;
    var timeTd = document.createElement("td");
    timeTd.textContent = time;
    timeTd.setAttribute("class", "hold");
    
    newRow.appendChild(nameTd);
    newRow.appendChild(timeTd);
    
    titleTd.after(newRow);
  }
}
function getTableId(agent){
  var agentsList = agentsBox.children[4].children[1].children[4].children[0].children;
  var tableId;
  for(i = 0; i < agentsList.length; i++){
    var agentName = agentsList[i].children[0].textContent;
    if(agentName === agent){
      var team = agentsList[i].children[3].textContent;
      tableId = sitesList[team];
    }
  }
  return tableId;
}
setEnviroment();scoutAgentList();