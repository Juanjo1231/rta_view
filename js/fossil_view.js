/*
* Fossil RTA View
* 
* Version: 0.0.1
* 
* Initial version.
*/
let RTA_GLOBALS = {
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
			site: 'US',
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
				index: 14
			}
		},
		'hold':
		{
			limit: 120000,
			index: 14
		}
	}
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
		this.site  = RTA_GLOBALS.teams[this.group].site || null;
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
	* @params {String} name   Name of the table.
	* @params {Node}   parent HTML object to append the table to.
	*/
	constructor(name, parent)
	{
		this.name   = name;
		this.parent = parent;
		this.id     = this.name.toLowerCase().replace(' ', "_");
		this.groups = [];
		this.agents = [];
	}


}