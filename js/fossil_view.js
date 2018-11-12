/*
* Fossil RTA View
* 
* Version: 0.0.1
* 
* Initial version.
*/
let RTA_GLOBALS = {
	version: 2,
	agents: {},
	dashboards: {
		main: '',
		agentList: '',
		contactList: ''
	},
	teams:
	{
		'24/7 Guatemala':
		{
			site: 'Guatemala',
			table: ''
		},
		'24/7 Winnipeg':
		{
			site: 'Canada',
			table: ''
		},
		'North America':
		{
			site: 'United States',
			table: ''
		}
	},
	states:
	{
		'inbound':
		{
			limit: 420000,
			index: 1
		},
		'outbound':
		{
			limit: 420000,
			index: 2
		},
		'unavailable':
		{
			limit: 1000,
			index: 3,
			'break':
			{
				limit: 900000,
				index: 4
			},
			'lunch':
			{
				limit: 1800000,
				index: 5
			},
			'acw':
			{
				limit: 20000,
				index: 6
			},
			'coaching':
			{
				limit: 1800000,
				index: 7
			},
			'meeting':
			{
				limit: 1800000,
				index: 8
			},
			'personal':
			{
				limit: 600000,
				index: 9
			},
			'it':
			{
				limit: 1000,
				index: 10
			},
			'facebook/twitter':
			{
				limit: 1000,
				index: 11
			},
			'floor walking':
			{
				limit: 1000,
				index: 12
			},
			'training':
			{
				limit: 1000,
				index: 13
			},
			'other':
			{
				limit: 1000,
				index: 15
			}
		},
		'hold':
		{
			limit: 120000,
			index: 14
		},
		'other':
		{
			limit: 1000,
			index: 15
		}
	}
}

/*
* Converts time string to milliseconds.
* 
* @param {String} str Time string in hh:mm:ss format.
* 
* @returns {number} Time in milliseconds.
*/
function strToMilliseconds(str)
{
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
* @since 0.0.1
*/
class Agent
{
	/*
	* @class
	* 
	* @param {String} name  Name of the agent.
	* @param {String} state Agent's current state.
	* @param {String} time  Time in state in hh:mm:ss format.
	* @param {String} group Agent's group.
	*/
	constructor(name, state, time, group)
	{
		this.name  = name;
		this.state = state;
		this.time  = time;
		this.group = group;
		this.site  = RTA_GLOBALS.teams[group].site || null;
	}
	/*
	* Validates if the agent state is out of goal.
	* 
	* @return {number} 1: OK, 0: Greater than the limit.
	*/
	validatePause()
	{
		this.timeMilliseconds = strToMilliseconds(this.time);
		this.limit 	   = 900000; // 15 Mins
		this.stateType = "unavailable"
		this.status    = 1;
		// Unavailable: Lunch
		if(this.state.includes("Unavailable:"))
		{
			let re = new RegExp('\\s+', 'g');
			let shortState = this.state
								 .replace('unavailable:', '')
								 .replace(re, ' ')
								 .trim();
			
			let unav_obj =  RTA_GLOBALS.states.unavailable[shortState]
						 || RTA_GLOBALS.states.unavailable.other;
			// lunch
			this.state = shortState;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
			this.stateType = shortState.includes("acw") ? "acw" : shortState;
		}
		else if(this.state.includes('Unavailable'))
		{
			let unav_obj = RTA_GLOBALS.states.unavailable;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
		}
		else if(this.state.includes("Inbound"))
		{
			let unav_obj = RTA_GLOBALS.states.inbound;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
			this.stateType = "inbound"
		}
		else if(this.state.includes("Outbound"))
		{
			let unav_obj = RTA_GLOBALS.states.outbound;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
			this.stateType = "outbound"
		}
		else if(this.state.includes("Hold"))
		{
			let unav_obj = RTA_GLOBALS.states.hold;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
			this.stateType = "hold"
		}
		else if(!this.state.includes("Available"))
		{
			let unav_obj = RTA_GLOBALS.states.other;
			this.index = unav_obj.index;
			this.limit = unav_obj.limit;
			this.stateType = "available"
		}
		
		this.createRow()

		if(this.timeMilliseconds >= this.limit)
		{
			this.status = 0;
		}

		return this.status;
	}
	/*
	* Creates the new HTML object representing a new agent row.
	* 
	* @return HTML object representing a new agent row.
	*/
	createRow()
	{
		let imgURL = "/inContact/css/dashboard/images/";

		switch(this.stateType)
		{
			case "available":
				imgURL += "icon_state_green.png"
				break;
			case "inbound":
				imgURL += "icon_state_purple.png"
				break;
			case "outbound":
				imgURL += "icon_state_yellow.png"
				break;
			case "acw":
				imgURL += "icon_state_orange.png"
				break;
			case "unavailable":
				imgURL += "icon_state_red.png"
				break;
			case "hold":
				imgURL += "icon_state_gray.png"
				break;
		}

		this.row = document.createElement("div");
		this.row.setAttribute("data-fullname", this.name);
		this.row.setAttribute("data-time", this.timeMilliseconds);

		this.row.innerHTML = `
			<div class="type"><img src="${imgURL}"/></div>
			<div class="name">${this.name}</div>
			<div class="time"><span class="aux-text">Time:</span>${this.time}</div>
			<div class="hold"><span class="aux-text">Hold: </span></div>
		`;

		return this.row;
	}
	/*
	* Appends the new row to an HTML object.
	* 
	* @param {HTML Object} parent Object to append the row to.
	*/
	appendToRow(parent)
	{
		// Does nothing if no parent is provided or the 'parent' parameter is not
		// a HTML object.
		if(!parent || !parent.appendChild){return;}

		parent.appendChild(this.row);
	}
}
/*
* @since 0.0.1
*/
class Table
{
	/*
	* @class
	* 
	* @param {String} name   Name of the table.
	* @param {Node}   parent HTML object to append the table to.
	*/
	constructor(name, parent)
	{
		this.name     = name;
		this.parent   = parent;
		this.id       = this.name.toLowerCase().replace(' ', '_');
		this.sections = [];
	}
	/*
	* 
	*/
	createTable()
	{
		this.body = document.createElement("div");
		this.body.classList.add("rta-table");

		this.body.innerHTML = `
			<div class="title">${this.name}</div>
			<div class="sections"></div>
		`;

		return this.body;
	}
	/*
	* 
	*/
	appendToParent(HTMLParent)
	{
		if(HTMLParent && !HTMLParent.appendChild){return;}
		let parent = HTMLParent || this.parent;
		console.log(this.body)
		parent.appendChild(this.body);
	}
}
/*
* @since 0.0.1
*/
class TableSecction
{
	/*
	* @class
	* 
	* @param {string} title    The title for the new section.
	* @param {number} indx     Section index, this determines the position
	*	                       of the section in the table.
	* @param {array}  [agents] List of Agents to add to this section.
	*/
	constructor(title, indx, agents = [])
	{
		this.title  = title;
		this.index  = indx;
		this.agents = agents;
	}
	/*
	* Creates the section HTML object. 
	* 
	* @return HTML Object representing the new empty section.
	*/
	create()
	{
		this.body = document.createElement("div");
		this.body.outerHTML = `
			<div class="rta-table-section">
		      <div class="title">${this.title}</div>
		      <ul></ul>
		    </div>
		`;

		return this.body;
	}
	/*
	* Adds agents to the section body.
	*
	* @param {array} [agnts] List of Agents to add to this section.
	*/
	addAgents(agnts = [])
	{
		this.agents = agnts ? agnts : this.agents;
		let ul = this.body.querySelectorAll("ul");

		this.sortRows();

		agents.forEach(agent => {
			agent.appendToRow(ul);
		});
	}
	/*
	* Sorts the list of agents base on their time in milliseconds.
	*/
	sortRows()
	{
		this.agents.sort((a, b) => {
			if(a.timeMilliseconds < b.timeMilliseconds)
			{
				return -1;
			}
			else if (a.timeMilliseconds > b.timeMilliseconds)
			{
				return 1;
			}

			return 0;
		});
	}
	/*
	* Appends the section to a HTML Object.
	*/
	appendToTable(HTMLParent)
	{
		// Does nothing if no parent is provided or the 'HTMLParent' parameter is not
		// a HTML object.
		if(!HTMLParent || !HTMLParent.appendChild){return;}

		HTMLParent.appendChild(this.body);
	}
}

/*
* @since 0.0.1
*/
class RTAEnvironment
{
	constructor()
	{
		this.setGlobalVariable();
		this.findDashboards();
		this.clearMainDashboard();
		this.getAgents();
	}

	clearMainDashboard()
	{

		RTA_GLOBALS.dashboards.main.innerHTML = "";
	}

	/*
	* Scouts agent list and creates an Agent instance for each.
	* 
	* @since 0.0.1
	*/
	getAgents()
	{
		let rows = RTA_GLOBALS.dashboards.agentList.querySelectorAll(".slick-row");

		RTA_GLOBALS.agents = RTA_GLOBALS.agents || {};

		rows.forEach(row => {
			let name  = row.children[0].textContent;
			let state = row.children[1].textContent;
			let time  = row.children[2].textContent;
			let team  = row.children[3].textContent;
			let agent = new Agent(name, state, time, team);
			
			RTA_GLOBALS.agents[name] = agent;

			agent.validatePause();
		});
	}

	/*
	* Sets the RTA_GLOBALS variable if exists or sets the default RTA_GLOBALS in
	* sessionStorage.
	* 
	* @since 0.0.1
	*/
	setGlobalVariable()
	{
		let sStorage = window.localStorage.getItem('RTA_GLOBALS');

		if(sStorage)
		{
			let v = JSON.parse(sStorage).version;

			if(v < RTA_GLOBALS.version)
			{
				window.localStorage.setItem('RTA_GLOBALS', JSON.stringify(RTA_GLOBALS));
			}
			else
			{
				RTA_GLOBALS = JSON.parse(sStorage);
			}
		}
		else
		{
			window.localStorage.setItem('RTA_GLOBALS', JSON.stringify(RTA_GLOBALS));
		}
	}

	/*
	* Search the necesary dashboards to run the application and save the reference in
	* the RTA_GLOBAL object.
	* 
	* @since 0.0.1
	*/
	findDashboards() {
		let widgets = document.querySelectorAll('.widgetContainer');

		widgets.forEach(widget => {
			let title = widget.querySelector('.titleNode').textContent;

			let re = new RegExp('\\(.+\\)');
			title = title.replace(re, '').trim();

			switch(title)
			{
				case 'RTA Main':
					RTA_GLOBALS.dashboards.main = widget.querySelector(".widgetContent");
					break;
				case 'Agent List':
					RTA_GLOBALS.dashboards.agentList = widget.querySelector(".widgetContent");
					break;
				case 'Contact List':
					RTA_GLOBALS.dashboards.contactList = widget.querySelector(".widgetContent");
					break;
			}
		});
	}
	/*
	* 
	*/
	createTables()
	{
		let tables = RTA_GLOBALS.teams || {};
		let parent = RTA_GLOBALS.dashboards.main;

		for(let table_key in tables)
		{
			let new_table = new Table(table_key, parent);
			new_table.createTable();
			new_table.appendToParent(parent);
			RTA_GLOBALS.teams[table_key] = new_table;
		}
	}
}


/*
* Initial function.
* 
* @since 0.0.1
*/
(function(){
	console.log('Running Fossil monitor...');

	let env = new RTAEnvironment();
	env.createTables();

})();
