(function() {
/*
* Fossil RTA View
* 
* Version: 0.0.1
* 
* Initial version.
*/
let RTA_GLOBALS = {
  version: 1.8,
  agents: {},
  dashboards: {
    main: '',
    agentList: '',
    contactList: ''
  },
  teams: {

  },
  states: {
    'available': {
      label: 'Available',
      limit: 420000,
      index: 0,
      show: false,
      limitObj: ''
    },
    'inbound': {
      label: 'Long Inbound',
      limit: 420000,
      index: 1,
      show: true
    },
    'outbound': {
      label: 'Long Outbound',
      limit: 420000,
      index: 2,
      show: true
    },
    'hold': {
      label: 'Long Hold',
      limit: 120000,
      index: 3,
      show: true
    },
    'unavailable': {
      label: 'Unavailable',
      limit: 1000,
      index: 4,
      show: true,
      'break': {
        label: 'Long Break',
        limit: 900000,
        index: 4,
        show: true
      },
      'lunch': {
        label: 'Long Lunch',
        limit: 1800000,
        index: 4,
        show: true
      },
      'acw': {
        label: 'Long ACW',
        limit: 5000,
        index: 6,
        show: true
      },
      'coaching': {
        label: 'Long Coaching',
        limit: 1800000,
        index: 7,
        show: true
      },
      'meeting': {
        label: 'Long Meeting',
        limit: 1800000,
        index: 7,
        show: true
      },
      'personal': {
        label: 'Long Personal',
        limit: 600000,
        index: 7,
        show: true
      },
      'it': {
        label: 'IT',
        limit: 1000,
        index: 7,
        show: true
      },
      'facebook/twitter': {
        label: 'Facebook/Twitter',
        limit: 1000,
        index: 7,
        show: true
      },
      'floor walking': {
        label: 'Floor Walking',
        limit: 1000,
        index: 7,
        show: true
      },
      'training': {
        label: 'Training',
        limit: 1000,
        index: 7,
        show: false
      }
    }
  },
  settings: {
    show: '',
    limits: ''
  }
}
/*
* Converts time string to milliseconds.
* 
* @param {String} str Time string in hh:mm:ss format.
* 
* @returns {number} Time in milliseconds.
*/
function strToMilliseconds(str) {
  let format = new RegExp('\\d{0,2}:?\\d{1,2}:\\d{1,2}');
  let time   = str.match(format);
  let times  = time[0].split(':');
  let ss = Number( times[times.length-1] );
  let mm = Number( times[times.length-2] );
  let hh = Number( times[times.length-3] ) || 0;

  ss *= 1000;
  mm *= 60000;
  hh *= 3600000;

  return ss + mm + hh;
}
/*
* Converts milliseconds to time string.
* 
* @param {Number} time Time in seconds.
* 
* @returns {String} Time string in hh:ss format.
*/
function millisecondsToStr(time) {
  let hh  = Math.floor(time / 3600000);
  let hhm = time % 3600000;
  let mm  = Math.floor(hhm / 60000);
  let mmm = hhm % 60000;
  let ss  = Math.floor(mmm / 1000);

  mm = hh > 0 && mm < 10
     ? `0${mm}`
     : mm;

  ss = ss < 10
     ? `0${ss}`
     : ss;

  return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}
/*
* Add a new unavailable state to the global object.
*/
function addUnavailableStateToGlobal(state, nLimit = 0) {
  let title = state.toLowerCase();
  Object.defineProperty(RTA_GLOBALS.states.unavailable, title, {
    value: {
      limit: nLimit,
      label: state,
      show: true,
      index: 15
    },
    writable: true,
    enumerable: true
  });

  if(!RTA_GLOBALS.settings.show.textContent.includes(state)) {
    let new_check = new StatusCheck(state, RTA_GLOBALS.states.unavailable[title], true);
    new_check.createCheck();
    new_check.appendTo(RTA_GLOBALS.settings.show);

    let new_picker = new LimitPicker(state, RTA_GLOBALS.states.unavailable[title], 0, 0);
    new_picker.createPicker();
    new_picker.appendTo(RTA_GLOBALS.settings.limits);
  }
}
/*
* Add new team to the global object.
*/
function addTeamToGlobal(name, site = 'Not set') {
  Object.defineProperty(RTA_GLOBALS.teams, name, {
    value: {
      site: site,
      table: '',
      show: true
    },
    writable: true,
    enumerable: true
  });

  //window.localStorage.setItem("rta_globals", JSON.stringify(RTA_GLOBALS));
}
/*
* @class
* @since 0.1.5
*/
class StatusCheck {
  constructor(label, objRef, checked = true) {
    this.label   = label;
    this.checked = checked;
    this.objRef  = objRef;
  }

  createCheck() {
    this.body = document.createElement("label");
    this.body.classList.add("ip-cb");
    this.body.innerHTML = `
      <input type="checkbox" ${this.checked ? "checked" : ""}/>
      <div class="check-arrow"></div><span class="label">${this.label}</span>
    `;

    this.checkbox = this.body.querySelector("input");
    this.checkbox.onchange = this.toggleCheck.bind(this);
  }

  appendTo(HTMLParent) {
    if(!HTMLParent || !HTMLParent.appendChild){return;}

    HTMLParent.appendChild(this.body);
  }

  toggleCheck() {
    this.objRef.show = !this.objRef.show;
  }
}
/*
* @class
* @since 0.1.5
*/
class LimitPicker {
  constructor(label, objRef, timeLimit = 0, index = 0) {
    this.label   = label;
    this.timeNum = timeLimit;
    this.timeStr = millisecondsToStr(timeLimit);
    this.objRef  = objRef;
  }

  createPicker() {
    this.body = document.createElement("label");
    this.body.classList.add("ip-txt");

    this.body.innerHTML = `
      <span class="label">${this.label}:</span>
      <span class="dots"></span>
      <input type="text" placeholder="mm:ss" value="${this.timeStr}"/>
    `;

    this.timeInp = this.body.querySelector("input");
    this.timeInp.onchange = this.updateLimit.bind(this);
  }

  appendTo(HTMLParent) {
    if(!HTMLParent || !HTMLParent.appendChild){return;}

    HTMLParent.appendChild(this.body);
  }

  updateLimit(e) {
    this.timeStr = e.target.value;
    this.timeNum = strToMilliseconds(e.target.value);

    this.objRef.limit = this.timeNum;
  }
}
/*
* @class
* @since 0.0.1
*/
class Agent {
  constructor(name, state, timeStr, team) {
      this.name    = name;
      this.state   = state;
      this.timeStr = timeStr;
      this.team    = team;
      this.timeNum = strToMilliseconds(timeStr);
      this.holdStr = "";
      this.type    = "unavailable";
  }

  /*
  * Creates the HTML object for this agent.
  * 
  * @return {HTML Object} HTML Object representing an agent row.
  */
  createRow() {
    this.body = document.createElement("li");
    this.body.setAttribute("data-fullname", this.name);

    let iconURL = "https://home-c31.incontact.com/inContact/css/dashboard/images/";
    switch(this.shortSate.state) {
      case "inbound":
        iconURL += "icon_state_purple.png";
        break;
      case "outbound":
        iconURL += "icon_state_yellow.png";
        break;
      case "hold":
        iconURL += "icon_state_gray.png";
        break
      case "available":
        iconURL += "icon_state_green.png";
        break;
      default:
        if(this.shortSate.label === "acw") {
          iconURL += "icon_state_orange.png";
        } else {
          iconURL += "icon_state_red.png";
        }
    }

    this.holdSpan = document.createElement("span");
    this.holdSpan.textContent = this.holdStr;
    this.holdSpan.classList.add("hold-span")

    this.body.innerHTML = `
      <div class="type"><img src="${iconURL}" alt="state icon"/></div>
      <div class="name">${this.name}</div>
      <div class="time">${this.timeStr}</div>
      <div class="hold">${this.holdSpan.outerHTML}</div>
    `;

    return this.body;
  }

  /*
  * Check if the current time in status exceeds the limit.
  *
  *
  */
  validateStatus() {
    let state = this.getShortState();
    let state_obj = RTA_GLOBALS.states[state.state];
    let limit = 0;

    if(state.label === "Unavailable") {
      // State === "Unavailable"
      state_obj = RTA_GLOBALS.states.unavailable;
      limit = state_obj.limit;

    } else if(state_obj && state.state != "unavailable") {
      // Working state: Inbound, Outbound.
      limit = state_obj.limit;
    } else if(state.state == "unavailable" && state.label != "Unavailable") {
      this.holdStr = "";
      // Unavailable status: Break, Lunch, etc.
      if(RTA_GLOBALS.states.unavailable[state.key]) {
        limit = RTA_GLOBALS.states.unavailable[state.key].limit;
        state_obj = RTA_GLOBALS.states.unavailable[state.key];
      } else {
        this.holdStr = "";
        addUnavailableStateToGlobal(state.label);
        limit = 0;
        state_obj = RTA_GLOBALS.states.unavailable[state.key];
      }
    }

    return {
      isValid: this.timeNum < limit,
      props: state_obj,
      key: state.key
    }
  }

  /*
  * Gets tipe of state and the label for it's display.
  * 
  * @return {Object} State and label.
  */
  getShortState() {
    let s = this.state;
    let state = "unavailable";
    let label = "Unavailable";

    if(s.includes("Available")) {
      state = "available";
      label = "available";
    } else if(s.includes("Inbound")) {
      state = "inbound";
      label = "inbound";
    } else if(s.includes("Outbound")) {
      state = "outbound";
      label = "outbound"
    } else if(s.includes("ACW")) {
      state = "unavailable";
      label = "acw";
    } else if(s.includes("Unavailable:")) {
      state = "unavailable";
      label = s.replace("Unavailable:", "").trim();
    }

    this.shortSate = {state, label, key: label.toLowerCase()};
    return this.shortSate;
  }

  /*
  * Removes the agent from it's parent.
  * 
  * @param {Section} section Instance of Section class to remove the agent from.
  */
  remove(section) {
    this.body.parentElement.removeChild(this.body);
    delete section.agents[this.name];
  }

  /*
  * Set a new time for the current agent state, in string and number format.
  * 
  * @param {String} timeStr Time string in mm:ss format.
  */
  setTime(timeStr) {
    if(timeStr.constructor != String) {return;}

    this.timeStr = timeStr;
    this.timeNum = strToMilliseconds(timeStr);
  }

  /*
  * Set new state.
  * 
  * @param {String} state New state for this Agent. 
  */
  setState(state) {
    if(state.constructor != String) {return;}
    this.state = state;
  }
  /**/
  setHold(hold) {
    if(hold.constructor != String) {return;}
    this.holdStr = hold;
    //let span = this.body.querySelector(".hold-span");
    //span.textContent = this.holdStr;
  }
}

/*
* @class
* @since 0.0.1
*/
class Section {
  /*
  * @param {String} title    Title for the section.
  * @param {Number} indx     Index used to sort sections in a table.
  * @param {Object} [agents] List of Agent instances to include in this section.
  */
  constructor(title, indx, agents = {}) {
    this.title  = title;
    this.index  = indx;
    this.agents = agents;
    this.sortedAgents;
  }

  /*
  * Sort agents by it's time in milliseconds.
  * 
  * @param {boolean} desc Whether or not the sort is descendant.
  */
  sort(desc) {
    // Convert Object to Array.
    this.sortedAgents = Object.values(this.agents);
    // Sort Array
    this.sortedAgents.sort((a, b) => {
      if(a.timeNum < b.timeNum) {
        return desc ? -1 : 1;
      }

      if(a.timeNum > b.timeNum) {
        return desc ? 1 : -1;
      }

      return 0;
    });

    this.clear();

    this.sortedAgents.forEach(a => {
      this.agentsContainer.appendChild(a.body);
    });
  }

  /*
  * Creates section HTML object.
  */
  createSection() {
    this.body = document.createElement("div");
    this.body.classList.add("rta-table-section");

    this.agentsContainer = document.createElement("ul");

    this.body.innerHTML = `
      <div class="title">${this.title}</div>
      <ul></ul>
    `;

    this.agentsContainer = this.body.querySelector("ul");
  }

  /*
  * Add agent to this Section.
  * 
  * @param {Agent} agent Instance of the Agent class.
  */
  addAgent(agent) {
    if(agent.constructor != Agent) {
      return new Error("The Agent to add must be and instance of the class Agent.");
    }

    this.agents[agent.name] = agent;
    this.sort();
  }

  /*
  * Clear agents container.
  */
  clear() {
    this.agentsContainer.innerHTML = "";
  }
}

/*
* @class
* @since 0.0.1
*/
class RTATable {
  constructor(title) {
    this.title = title;
    this.sections = {};
  }

  /*
  * Creates HTML object for this table.
  */
  createTable() {
    this.body = document.createElement("div");
    this.body.classList.add("rta-table");

    this.body.innerHTML = `
      <div class="title">${this.title}</div>
      <div class="sections"></div
    `;

    this.sectionsContainer = this.body.querySelector(".sections");
  }

  /*
  * Appends the HTML body to a HTML object.
  * 
  * @param {HTML Object} HTMLParent HTML object to append this object's HTML to.
  */
  appendTo(HTMLParent) {
    if(!HTMLParent || !HTMLParent.appendChild) {return 'No HTML';}
    HTMLParent.appendChild(this.body);
  }

  /*
  * 
  */
  createSections() {
    this.sort();
    this.sectionsContainer.innerHTML = "";

    for(let key in this.sortedSections) {
      let sect = this.sortedSections[key];
      this.sectionsContainer.appendChild(sect.body);
    }
  }

  /*
  * 
  */
  sort(desc) {
    this.sortedSections = Object.values(this.sections);
    this.sortedSections.sort((a, b) => {
      if(a.index < b.index) {
          return desc ? 1 : -1;
        }

        if(a.index > b.index) {
          return desc ? -1 : 1;
        }

        return 0;
    });
  }
}

/*
* @class
* @since 0.0.1
*/
class RTAEnv {
  /*
  * Checks if a global object exists in the localStorage
  * if it exists and it's version is equal to the current default version,
  * sets the storaged object as RTA_GLOBALS, else, uses the default global object
  * and saves it in the local storage.
  */
  constructor() {
    let locSto = window.localStorage.getItem("rta_globals");

    if(locSto) {
      locSto = JSON.parse(locSto);
      locSto = locSto.version < RTA_GLOBALS.version
             ? RTA_GLOBALS
             : locSto;
    } else {
      locSto = RTA_GLOBALS;
      window.localStorage.setItem("rta_globals", JSON.stringify(RTA_GLOBALS));
    }

    RTA_GLOBALS = locSto;
    RTA_GLOBALS.agents = {};

    for(let key in RTA_GLOBALS.teams) {
      RTA_GLOBALS.teams[key].table = "";
    }
  }
  /*
  * Finds and assigns the specific dashboards to the global object.
  */
  findDashboards() {
    let dashboards = document.querySelectorAll(".widgetContainer");

    dashboards.forEach(dashboard => {
      let title = dashboard.querySelector(".titleNode").textContent;
      
      if(title.includes("RTA Main")) {
        let container = dashboard.querySelector(".widgetContent");
        container.style.padding = "0";

        let main = document.createElement("div");
        main.classList.add("rta-container");

        container.innerHTML = `
          <div id="rta-menu-btn"></div>
          <div id="menu-body">
            <h3>Settings</h3>
            <section>
              <h4>Show status</h4>
              <div class="grid"></div>
            </section>
            <section>
              <h4>Status limits</h4>
              <div class="grid-2"></div>
            </section>
          </div>
        `;

        this.settings = {};
        this.settings.show   = container.querySelector(".grid");
        this.settings.limits = container.querySelector(".grid-2");

        RTA_GLOBALS.settings.show   = this.settings.show;
        RTA_GLOBALS.settings.limits = this.settings.limits;

        container.appendChild(main);

        RTA_GLOBALS.dashboards.main = main;

      } else if(title.includes("Agent List")) {
        RTA_GLOBALS.dashboards.agentList = dashboard.querySelector(".widgetContent");
      } else if(title.includes("Contact List")) {
        RTA_GLOBALS.dashboards.contactList = dashboard.querySelector(".widgetContent");
      }
    });
  }
  /*
  * @since 0.1.5
  */
  createSettings() {
    let states = RTA_GLOBALS.states;

    for(let st in states) {
      let obj = states[st];
      let check = new StatusCheck(obj.label, obj, obj.show);

      if(!this.settings.show.textContent.includes(obj.label)) {
        check.createCheck();
        check.appendTo(this.settings.show);

        let new_picker = new LimitPicker(obj.label, obj, obj.limit, obj.index);
        new_picker.createPicker();
        new_picker.appendTo(this.settings.limits);
      }
      

      if(st === 'unavailable') {
        let uns = states.unavailable;

        for(let unst in uns) {
          let obj2 = uns[unst];

          if(obj2.label) {
            let check2 = new StatusCheck(obj2.label, obj2, obj2.show);

            if(!this.settings.show.textContent.includes(obj2.label)) {
              check2.createCheck();
              check2.appendTo(this.settings.show);

              let new_picker = new LimitPicker(obj2.label, obj2, obj2.limit, obj.index);
              new_picker.createPicker();
              new_picker.appendTo(this.settings.limits);
            }
          }
        }
      }
    }
  }
  /*
  * Iterates over the list of agents, creates an instance of the Agent class,
  * and save it on the global object; If the Agent already exists in the global object,
  * updates it's time and state.
  */
  scoutAgents() {
    let agents = RTA_GLOBALS.dashboards.agentList.querySelectorAll(".slick-row");

    agents.forEach(agent => {
      let row   = agent.children;
      let name  = row[0].textContent;
      let state = row[1].textContent;
      let time  = row[2].textContent;
      let team  = row[3].textContent;
      let new_agent = RTA_GLOBALS.agents[name];

      if(new_agent) {
        new_agent.setTime(time);
        new_agent.setState(state);
      } else {
        new_agent = new Agent(name, state, time, team);
        RTA_GLOBALS.agents[name] = new_agent;
      }
    });
  }
  /*
  *
  */
  validateAgents() {
    let agents = RTA_GLOBALS.agents;

    for(let agent_key in agents) {
      let agnt = agents[agent_key];
      let validation = agnt.validateStatus();

      if(!validation.isValid && validation.props.show) {
        agnt.createRow();

        let team = RTA_GLOBALS.teams[agnt.team];
        let table;

        if(!team) {
          addTeamToGlobal(agnt.team);
          team = RTA_GLOBALS.teams[agnt.team]
        }

        table = RTA_GLOBALS.teams[agnt.team].table;

        if(!table) {
          let new_table = new RTATable(agnt.team);
          new_table.createTable();
          new_table.appendTo(RTA_GLOBALS.dashboards.main);
          RTA_GLOBALS.teams[agnt.team].table = new_table;

          table = new_table;
        }

        let section = table.sections[validation.key];
        if(!section) {
          let new_section = new Section(validation.props.label, validation.props.index);
          table.sections[validation.key] = new_section;
          section = new_section;
        }

        section.createSection();
        section.sort();
        section.addAgent(agnt);
      }
    }
  }
  /*
  * Iterates over the Contact List and validates the holds.
  */
  findHolds() {
    let agents = RTA_GLOBALS.dashboards.contactList.querySelectorAll(".slick-row");
    agents.forEach(agent => {
      let row = agent.children;
      let state = row[1].textContent;
      let name = row[2].textContent;
      //let call_time = row[3].textContent;
      let hold_time = state.match(/\(\d{2}:\d{2}:\d{2}\)/) || "";
      let existing_agents = RTA_GLOBALS.agents;

      if(existing_agents[name]) {
        let agent_instance = existing_agents[name];
        if(state.includes("Hold")) {
          if(hold_time) {
            agent_instance.setHold(hold_time[0]);
          }
        } else {
          agent_instance.setHold('')
        }
      }
    });
  }
  /*
  * Create a table for each team and append it's HTML body to the main dashboard.
  */
  createTables() {
    RTA_GLOBALS.dashboards.main.innerHTML = "";

    for(let team_key in RTA_GLOBALS.teams) {
      let new_table = new RTATable(team_key);
      new_table.createTable();
      new_table.appendTo(RTA_GLOBALS.dashboards.main);

      RTA_GLOBALS.teams[team_key].table = new_table;
    }
  }
  /*
  * 
  */
  fillTables() {
    for(let team_key in RTA_GLOBALS.teams) {
      let table = RTA_GLOBALS.teams[team_key].table;
      table.sectionsContainer.innerHTML = "";

      table.sort();
      table.createSections();
    }
  }
  /*
  * 
  */
  injectCSS() {
    let tag = document.createElement("style");

    tag.textContent = `
      body{
        font-family: Arial;
      }
      .ui-resizable-s {
        height: 10px;
      }
      .ui-resizable-e {
        width: 10px;
      }
      .ui-resizable-s,
      .ui-resizable-e {
        background-color: hsla(210, 40%, 40%, 0.5);
        transition: 200ms;
      }
      .ui-resizable-s:hover,
      .ui-resizable-e:hover {
        background-color: hsla(210, 40%, 40%, 1);
      }

      /* FOSSIL VIEW */
      .rta-container {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .rta-table {
        border: 1px solid #ccc;
        display: inline-block;
        margin: 1em;
        vertical-align: top;
      }
      .rta-table .title {
        text-align: center;
        padding: 0.5em;
      }
      .rta-table .title img {
        margin: 0 0.4em;
      }
      .rta-table .rta-table-section ul {
        margin: 0;
        list-style: none;
        padding: 0;
        background-color: #fff;
      }
      .rta-table .rta-table-section ul li {
        display: grid;
        grid-template-columns: 2em 1fr 4em minmax(1em, 6em);
        margin: 0.2em 0;
        align-items: center;
        font-size: 0.9em;
        background-color: #f5f5f5;
      }
      .rta-table .rta-table-section ul li div {
        padding: 0.3em 0.5em;
      }
      .rta-table .rta-table-section ul li .aux-text {
        font-size: 0;
      }
      .rta-table .rta-table-section ul li .type {
        transform: scale(0.6);
      }
      .rta-table .rta-table-section ul li .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
      }
      .rta-table .rta-table-section ul li .time {
        text-align: right;
        flex-grow: 0.5;
      }
      .rta-table .rta-table-section ul li .hold {
        text-align: center;
        font-size: 0.8em;
        position: relative;
      }
      .rta-table .rta-table-section ul li .hold::after {
        content: 'Hold';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(70%, -50%);
        background-color: #1e1e1e;
        color: #fff;
        border-radius: 0.5em;
        opacity: 0;
        z-index: -1;
        transition: 200ms;
        font-size: 0;
        padding: 0;
      }
      .rta-table .rta-table-section ul li .hold:hover::after {
        opacity: 0.9;
        z-index: 100;
        font-size: 0.8em;
        padding: 0.4em;
      }
      .rta-table .rta-table-section ul li .hold span {
        background-color: #ccc;
        display: inline-block;
        padding: 0.4em;
        border-radius: 0.5em;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      .grid-2 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1em;
      }
      .ip-cb {
        background-color: transparent;
        position: relative;
        display: block;
        margin: 0.5em 0.2em;
        cursor: pointer;
      }
      .ip-cb span.label {
        margin-left: 0.4em;
        vertical-align: top;
        display: inline-block;
      }
      .ip-cb input[type="checkbox"] {
        display: none;
      }
      .ip-cb .check-arrow {
        border: 1px solid #404040;
        width: 1em;
        height: 1em;
        position: relative;
        display: inline-block;
      }
      .ip-cb .check-arrow::after {
        opacity: 0;
        transition: 200ms;
        position: absolute;
        content: "";
        width: 0.4em;
        height: 0.8em;
        border-width: 0 0.2em 0.2em 0;
        border-style: solid;
        border-color: #b3b3b3;
      }
      .ip-cb input[type="checkbox"]:checked ~ .check-arrow::after {
        opacity: 1;
        transition: 200ms;
        border-width: 0 0.2em 0.2em 0;
        border-style: solid;
        border-color: #b3b3b3;
        transform: rotate(45deg) translate(0.05em, -0.5em);
      }
      .ip-txt {
        display: flex !important;
        margin: 0.4em 0.2em;
      }
      .ip-txt span.dots {
        border-bottom: 1px dashed #404040;
        flex-grow: 1;
      }
      .ip-txt span.label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: bottom;
      }
      .ip-txt input[type="text"] {
        background-color: transparent;
        border: 1px solid #404040;
        display: inline-block;
        width: 4.5em;
        color: #b3b3b3;
        text-align: center;
        margin-left: 0.2em;
      }
      #rta-menu-btn {
        cursor: pointer;
        position: absolute;
        top: 1em;
        right: 1em;
        border-radius: 50%;
        animation-duration: 200ms;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        z-index: 100;
      }
      #rta-menu-btn {
        animation-name: wtb;
      }
      #rta-menu-btn.show {
        animation-name: btw;
      }
      #menu-body {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 50%;
        transition: 200ms;
        background-color: #1e1e1e;
        transform: translateX(100%);
        color: #b3b3b3;
        padding: 0.5em;
        z-index: 99;
      }
      #menu-body.show {
        transform: translateX(0);
        transition: 200ms;
      }
      #menu-body section {
        border: 1px solid #404040;
        padding: 0.5em;
        margin: 2em 0.5em;
      }
      #menu-body h3,
      #menu-body h4 {
        font-weight: normal;
      }
      #menu-body h3 {
        margin: 0.5em;
        margin-bottom: 1em;
      }
      #menu-body h4 {
        margin: 0;
        margin-top: -1em;
        background-color: #1e1e1e;
        width: max-content;
        padding: 0 0.5em;
      }

      @keyframes wtb {
        0% {
          background-color: #fff;
          border: 0 solid #1e1e1e;
        }
        100% {
          background-color: #fff;
          border: 1em solid #1e1e1e;
        }
      }
      
      @keyframes btw {
        0% {
          background-color: #1e1e1e;
          border: 0 solid #fff;
        }
        100% {
          background-color: #1e1e1e;
          border: 1em solid #fff;
        }
      }
    `;

    document.body.appendChild(tag);
  }
}

/*
* Initial function.
* 
* @since 0.0.1
*/
(function() {
  console.clear();
  console.log('Running Fossil monitor...');

  let app = new RTAEnv();
  app.injectCSS();
  app.findDashboards();
  app.scoutAgents();
  app.findHolds();
  app.createTables();
  app.validateAgents();
  app.fillTables();
  app.createSettings();

  let rta_menu_btn = document.querySelector("#rta-menu-btn");
  let menu_body    = document.querySelector("#menu-body");

  rta_menu_btn.onclick = function(e) {
    rta_menu_btn.classList.toggle("show");
    menu_body.classList.toggle("show");
  }

  let target = RTA_GLOBALS.dashboards.agentList;
  let config = {attributes: true, childList: true, subtree: true};

  let observer = new MutationObserver(e => {
    app.scoutAgents();
    app.findHolds();
    app.createTables();
    app.validateAgents();
    app.fillTables();
  });

  RTA_GLOBALS.observerId = observer.observe(target, config);

})();
})();