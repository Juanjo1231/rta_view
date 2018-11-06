/*
*  V3.0.1
* Added functionality: create hold segment for hold status
* that is not part of a long call. 
*/
let widgets    = {
  'wd_main': 'RTA-Main',
  'wd_agent_list': 'RTA-AgentsList',
  'wd_call_list': 'RTA-CallsList',
  'wd_esc_list': 'RTA-EscList',
  'wd_sl': 'RTA-SL',
  'wd_agent_count': 'RTA-Agents',
  'wd_esc_count': 'RTA-EscAgents',
  'wd_queue': 'RTA-Queue',
  'wd_g_sl': 'RTA-GrocerySL',
  'wd_g_esc_count': 'RTA-EscGrocery',
  'wd_g_agent_count': 'RTA-GAgents',
  'wd_g_queue': 'RTA-GroceryQ',
  'wd_spa_queue': 'RTA-SpanishQ'
}
let skills     = {
  'unavailable': {
    'name': 'Unavailable',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 0
  },
  'refused': {
    'name': 'Refused',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 1
  },
  'heldpartyabandoned': {
    'name': 'Held Party Abandoned',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 2
  },
  'long inbound': {
    'name': 'Inbound',
    'type': 'inbound',
    'limit': '00:07:00',
    'index': 7
  },
  'long outbound': {
    'name': 'Outbound',
    'type': 'outbound',
    'limit': '00:07:00',
    'index': 8
  },
  'outbound consult': {
    'name': 'Outbound Consult',
    'type': 'unavailable',
    'limit': '00:07:00',
    'index': 35
  },
  'after call work': {
    'name': 'After Call Work',
    'type': 'acw',
    'limit': '00:00:20',
    'index': 10
  },
  'system p': {
    'name': 'SYSTEM P',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 23
  },
  'callbackpending': {
    'name': 'Callback Pending',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 36
  },
  'consultpending': {
    'name': 'Consult Pending',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 37
  },
  'inboundpending': {
    'name': 'Inbound Pending',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 38
  },
  'outboundpending': {
    'name': 'Outbound Pending',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 38
  },
  'promisepending': {
    'name': 'Promise Pending',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 38
  },
  'personal': {
    'name': 'Personal',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 3
  },
  'system w': {
    'name': 'SYSTEM W',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 22
  },
  'break': {
    'name': 'BREAK',
    'type': 'unavailable',
    'limit': '00:15:00',
    'index': 20
  },
  'lunch': {
    'name': 'LUNCH',
    'type': 'unavailable',
    'limit': '00:30:00',
    'index': 21
  },
  'right now manual input': {
    'name': 'Rightnow Manual Input',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 6
  },
  'coaching': {
    'name': 'COACHING',
    'type': 'unavailable',
    'limit': '00:15:00',
    'index': 24
  },
  'floor support': {
    'name': 'SUPPORT',
    'type': 'unavailable',
    'limit': '00:30:00',
    'index': 25
  },
  'supervisor only': {
    'name': 'SUPERVISOR ONLY',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 5
  },
  'meeting': {
    'name': 'MEETING',
    'type': 'unavailable',
    'limit': '00:30:00',
    'index': 26
  },
  'nesting': {
    'name': 'NESTING',
    'type': 'unavailable',
    'limit': '00:15:00',
    'index': 27
  },
  'train p': {
    'name': 'TRAIN P',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 29
  },
  'train w': {
    'name': 'TRAIN W',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 28
  },
  'available': {
    'name': 'Available',
    'type': 'available',
    'limit': '00:00:00',
    'index': 34
  },
  'grocery inbound': {
    'name': 'Long Inbound',
    'type': 'inbound',
    'limit': '00:07:00',
    'index': 7
  },
  'grocery outbound': {
    'name': 'Grocery Outbound',
    'type': 'unavailable',
    'limit': '00:07:00',
    'index': 9
  },
  'grocery system p': {
    'name': 'Grocery System P',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 23
  },
  'grocery system w': {
    'name': 'Grocery System W',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 12
  },
  'grocery train p': {
    'name': 'Grocery Train P',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 19
  },
  'grocery train w': {
    'name': 'Grocery Train W',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 28
  },
  'grocery backoffice': {
    'name': 'Grocery Backoffice',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 31
  },
  'grocery coaching': {
    'name': 'Grocery Coaching',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 14
  },
  'grocery email': {
    'name': 'Grocery Email',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 30
  },
  'grocery feedback': {
    'name': 'Grocery Feedback',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 32
  },
  'grocery floor support': {
    'name': 'Grocery Floor Support',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 15
  },
  'grocery meeting': {
    'name': 'Grocery Meeting',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 16
  },
  'grocery nesting': {
    'name': 'Grocery Nesting',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 17
  },
  'grocery right now manual': {
    'name': 'Grocery Right Now Manual Input',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 6
  },
  'grocery chat': {
    'name': 'Grocery Chat',
    'type': 'unavailable',
    'limit': '00:00:00',
    'index': 33
  }
}
let profiles   = {
  '24 7 escal denver': {
    'site': 'Denver'
  },
  '24 7 escal grocery': {
    'site': 'Denver'
  },
  '24 7 escal guat': {
    'site': 'Guatemala'
  },
  '24 7 escal tampa': {
    'site': 'Tampa'
  },
  '24 7 intouch denver': {
    'site': 'Denver'
  },
  '24 7 intouch gaut': {
    'site': 'Guatemala'
  },
  '24 7 intouch guat spanish': {
    'site': 'Guatemala'
  },
  '24 7 intouch tampa': {
    'site': 'Tampa'
  },
  '24 7 intouch grocery': {
    'site': 'Denver'
  },
  '24 7 intouch nesting team den': {
    'site': 'Denver'
  },
  '24 7 intouch nesting team gua': {
    'site': 'Denver'
  },
  '24 7 intouch nesting team tpa': {
    'site': 'Denver'
  },
  '24-7 guatemala supervisor': {
    'site': 'Guatemala'
  },
  '24-7 tampa supervisor': {
    'site': 'Tampa'
  },
  'walmart grocery': {
    'site': 'Denver'
  }
}
let sitesList  = ["Guatemala", "Tampa", "Denver"]

const styleSheet = "html,body{margin:0;padding:0;font-family:'Roboto', sans-serif;font-size:12px;text-rendering:optimizeLegibility;}.jtable{font-size: 12px;display:inline-block;vertical-align:top;width:max-content;max-width:30rem;margin:3rem 1em;}.jtable *{transition:0.3s;}.jtable .jtitle{background-color:#607d8b;padding:0.5em;text-align:center;text-transform:uppercase;color:#fff;letter-spacing:0.1em;font-size:1.1em;box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);margin-bottom:1em;}.jtable .jbody{padding:0 0.5em;}.jtable .jbody .jsegment{display:grid;grid-template-columns:1fr auto;}.jtable .jbody .jsegment .jseg-title{padding:0.5em;text-transform:capitalize;box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);font-size:1.1em;font-weight:bold;cursor:pointer;}.jtable .jbody .jsegment .row-total{padding:0.5em;box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);font-size:1.1em;}.jtable .jbody .jsegment ul{grid-area:2/1/span 1/span 2;transition:0.3s;margin:0;padding:0 0.5em;overflow:hidden;}.jtable .jbody .jsegment ul.collapsed{height:0 !important;}.jtable .jbody .jsegment ul li{list-style:none;display:grid;grid-template-columns:2fr 1fr 1fr;border-bottom:1px solid #ccc;}.jtable .jbody .jsegment ul li div{display:inline-block;padding:0.5em;}.jtable .jbody .jsegment ul li div.jname{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.jtable .jbody .jsegment ul li div.jtime{text-align:right;}.jtable .jbody .jsegment ul li div.jhold span{background-color:#607d8b;color:#fff;padding:0.2em 0.3em;text-align:right;border-radius:0.2em;margin-right:0.25em;}.jsegment.unavailable .jseg-title,.jsegment.unavailable li{border-left:5px solid #f44336;}.jsegment.inbound .jseg-title,.jsegment.inbound li{border-left:5px solid #9c27b0;}.jsegment.outbound .jseg-title,.jsegment.outbound li{border-left:5px solid #ffeb3b;}.jsegment.acw .jseg-title,.jsegment.acw li{border-left:5px solid #ff9800;}.jsegment.available .jseg-title,.jsegment.available li{border-left:5px solid #8bc34a;}.jsegment.hold .jseg-title,.jsegment.hold li{border-left:5px solid #607d8b;}"

// ---SITETABLE PROTOTYPE--- //
const SiteTable = function (sets = {}) {
  this.sets     = sets
  this.parent   = sets.parent
  this.title    = this.setTitle(sets.title)
  this.id       = this.title.toLowerCase().trim().replace(/\s/g, "_")
  this.segments = {}
  
  if(this.parent){
    this.createTable()
    this.appendTable()
  }
}
SiteTable.prototype.setTitle = function (t) {
  if(t) {
    return t.trim().toLowerCase()
  }else{
    let tables = document.querySelectorAll(".jtable")
    return `table ${tables.length + 1}`
  }
}
SiteTable.prototype.createTable = function () {
  let cont  = document.createElement('div')
  let title = document.createElement('div')
  let body  = document.createElement('div')
  
  cont.classList.add('jtable')
  title.classList.add('jtitle')
  body.classList.add('jbody')
  
  cont.setAttribute('id', this.id)
  title.textContent = this.title
  
  cont.appendChild(title)
  cont.appendChild(body)
  
  this.DOMElement = cont
}
SiteTable.prototype.appendTable = function () {
  this.parent.appendChild( this.DOMElement )
}
SiteTable.prototype.addSegment = function (segment) {
  if (!segment) { return }
  let body = this.DOMElement.querySelector('.jbody')
  this.segments[segment.id] = segment
  body.appendChild(segment.DOMElement)
  // Set segment height
  let rect = segment.ul.getBoundingClientRect()
  segment.ul.style.height = rect.height + "px"
  this.sortSegments()
}
SiteTable.prototype.sortSegments = function (desc) {
  let auxArr = []
  let segs = this.DOMElement.querySelectorAll('.jsegment')
  let body = this.DOMElement.querySelector('.jbody')
  
  segs.forEach(el => {
    let arr2 = []
    let indx = Number(el.getAttribute('data-index'))
    
    arr2.push(indx)
    arr2.push(el)
    auxArr.push(arr2)
  })
  
  body.innerHTML = ''
  
  auxArr.sort((a, b) => {
    return a[0] - b[0]
  })
  
  auxArr.forEach(el => {
    body.appendChild(el[1])
  })
}

// ---SEGMENT PROTOTYPE--- //
const Segment = function (sets = {}) {
  this.sets   = sets
  this.table  = sets.table
  this.title  = this.setTitle(sets.title)
  this.id     = sets.ID || this.table.id + "_" + this.title.replace(/\s/g, "_")
  this.agents = sets.agents || [["No agents", "--:--"]]
  this.segmentType = sets.segmentType
  this.index = sets.index || 0
  this.total = 0
  
  if(this.table){
    this.createSegment()
    this.table.addSegment(this)
  }
}
Segment.prototype.setTitle = function (t) {
  if(t) {
    return t.trim().toLowerCase()
  }else{
    let segments = document.querySelectorAll(".jsegment")
    return `segment ${segments.length + 1}`
  }
}
Segment.prototype.createSegment = function () {
  let cont  = document.createElement("div")
  let title = document.createElement("div")
  let total = document.createElement("div")
  this.ul   = document.createElement("ul")
  
  cont.classList.add("jsegment", this.segmentType)
  title.classList.add("jseg-title")
  total.classList.add("row-total")
  title.addEventListener("click", this.toggle.bind(this) )
  
  title.textContent = this.title
  total.textContent = `(${this.total})`
  cont.setAttribute("id", this.id)
  cont.setAttribute("data-index", this.index)
  
  cont.appendChild(title)
  cont.appendChild(total)
  cont.appendChild(this.ul)
  
  this.agents.forEach(el => {
    let li = document.createElement("li")
    let nm = document.createElement("div")
    let tm = document.createElement("div")
    let id = el[0].toLowerCase().trim().replace(/\s/g, "_")
    
    nm.classList.add("jname")
    tm.classList.add("jtime")
    li.setAttribute("id", id)
    
    nm.textContent = el[0]
    tm.textContent = el[1]
    li.setAttribute("data-duration", el[2])
    
    li.appendChild(nm)
    li.appendChild(tm)
    
    this.ul.appendChild(li)
  })
  
  this.DOMElement = cont
  this.sortRows()
  this.updateTotal()
}
Segment.prototype.toggle = function () {
  let h = this.ul.classList.contains("collapsed")
  
  if ( !h ) {
    this.ul.classList.add("collapsed")
  }else{
    this.ul.classList.remove("collapsed")
  }
}
Segment.prototype.removeAgents = function () {
  this.ul.innerHTML = ""
}
Segment.prototype.addAgents = function (agents = [["No name", "--:--", 0]]) {
  if (!agents) { return }
  agents.forEach(el => {
    let li = document.createElement("li")
    let nm = document.createElement("div")
    let tm = document.createElement("div")
    let id = el[0].toLowerCase().trim().replace(/\s/g, "_")
    
    nm.classList.add("jname")
    tm.classList.add("jtime")
    li.setAttribute("id", id)
    
    nm.textContent = el[0]
    tm.textContent = el[1]
    li.setAttribute("data-duration", el[2])
    
    li.appendChild(nm)
    li.appendChild(tm)
    
    this.ul.appendChild(li)
    
    let h = li.getBoundingClientRect().height
    this.ul.style.height = (h * this.ul.querySelectorAll('li').length) + "px"
  })
  this.updateTotal()
}
Segment.prototype.sortRows = function (desc) {
  let rows = this.ul.querySelectorAll("li")
  let arr = []
  
  for(let a = 0; a < rows.length; a++){
    let newarr = []
    let dur = rows[a].getAttribute('data-duration')
    
    newarr.push( dur )
    newarr.push( rows[a] )
    arr.push(newarr)
  }
  
  if (!desc) {
    arr.sort((a, b) => {
      return a[0] - b[0]
    })
  }else{
    arr.sort((a, b) => {
      return b[0] - a[0]
    })
  }
  
  this.ul.innerHTML = ""
  
  arr.forEach(el => {
    this.ul.appendChild( el[1] )
  })
}
Segment.prototype.updateTotal = function(){
  this.total = this.ul.childElementCount
  let newTotal = `(${this.total})`
  this.DOMElement.querySelector('.row-total').textContent = newTotal
}
Segment.prototype.clear = function () {
  this.ul.innerHTML = ""
  this.ul.style.height = "0px"
  this.updateTotal()
}

// --- JAPP --- //
const JApp = function (sets = {}) {
  this.sets     = sets
  this.widgets  = sets.widgets  || {}
  this.skills   = sets.skills   || {}
  this.profiles = sets.profiles || {}
  this.sites    = sets.sites    || []
  this.styles   = sets.styleSheet
  // ----- //
  this.siteTables  = {}
  this.segments    = {}
  this.segmentObjs = {}
  this.agents      = {}
}
JApp.prototype.timeFormat = function (time, format) {
  if( format === 'number' && typeof(time) === 'string' ) {
    let timeArr = time.split(':')
    let l = timeArr.length

    let s = Number( timeArr[l-1] ) || 0
    let m = Number( timeArr[l-2] ) || 0
    let h = Number( timeArr[l-3] ) || 0

    s *= 1000
    m *= 60000
    h *= 3600000

    return s + m + h
  }

  if(format === 'string' && typeof(time) === 'number'){
    let h  = Math.trunc( time / 3600000 )
    let hr = time % 3600000
    let m  = Math.trunc( hr / 60000 )
    let mr = hr % 60000
    let s  = Math.trunc( mr / 1000 )

    s = s < 10 ? '0' + s : s

    if(h > 0){
      m  = m < 10 ? '0' + m : m
      return `${h}:${m}:${s}`
    }else{
      return `${m}:${s}`
    }
  }
}
JApp.prototype.setWidgets = function () {
  let len = Object.keys(this.widgets).length

  for (let a = 0; a < len; a++) {
    let key = Object.keys(this.widgets)[a]
    let title = this.widgets[key]
    let _this = this

    document.querySelectorAll('.widgetHeader').forEach(el => {
      if(el.textContent.includes(title)){
        let box = el.parentElement.children[1]
        _this.widgets[key] = box
      }
    })

  }
}
JApp.prototype.prepare = function () {
  this.widgets.wd_main.innerHTML = ""
  // --- ADD CUSTOM STYLES TO THE PAGE --- //
  let styleTag = document.createElement('style')
  styleTag.setAttribute('type', 'text/css')
  styleTag.textContent = this.styles
  document.querySelector("head").appendChild(styleTag)
}
JApp.prototype.createSiteTables = function () {

  for(let a = 0; a < this.sites.length; a++){
    
    let newTable = new SiteTable({
      parent: this.widgets.wd_main,
      title: this.sites[a]
    })
    
    this.siteTables[ this.sites[a] ] = newTable
  }
}
JApp.prototype.scoutAgents = function () {
  this.segments = {}
  // --- GET DIRECT PARENT OF ROWS --- //
  this.callsContainer = this.widgets.wd_agent_list.parentElement
                          .children[4]
                          .children[1]
                          .children[4]
                          .children[0]
  // --- GET DIRECT PARENT OF ROWS --- //
  this.holdContainer = this.widgets.wd_call_list.parentElement
                          .children[4]
                          .children[1]
                          .children[4]
                          .children[0]
  let agents = this.callsContainer.children
  // --- GET AGENTS, STATES AND TIMES --- //
  for(let a = 0; a < agents.length; a++){
    let name     = agents[a].children[0].textContent.trim()
    let state    = agents[a].children[1].textContent.trim()
    let time     = agents[a].children[2].textContent.trim()
    let profile  = agents[a].children[3].textContent
                                     .trim()
                                     .toLowerCase()
    if (this.profiles[profile]) {
      let site  = this.profiles[profile].site
      let table = this.siteTables[site]
      
      if (table) {
        let compState = state.toLowerCase()
        let classType
        
        if(compState.includes('unavailable')){
          classType = 'unavailable'
          state = state.replace('Unavailable:', "")
        }else if(compState.includes('after')){
          classType = 'acw'
        }else if(compState.includes('inbound') && site === 'Denver'){
          classType = 'inbound'
          state = 'Grocery Inbound'
        }else if(compState.includes('inbound') && site != 'Denver'){
          classType = 'inbound'
          state = 'Long Inbound'
        }else if(compState.includes('outbound')){
          classType = 'outbound'
          state = 'Long Outbound'
        }else if(compState === 'hold'){
          classType = 'hold'
        }else if(compState === 'available'){
          classType = 'available'
        }
        
        let tableID = site.trim().toLowerCase().replace(/\s/g, "_")
        let segmentID = state.trim().toLowerCase().replace(/\s/g, "_")
        let ID = `${tableID}_${segmentID}`
        let ms = this.timeFormat(time, 'number')

        if(!this.skills[state.toLowerCase().trim()]){
          console.log('New state found:' + state.toLowerCase().trim())
          this.skills[state.toLowerCase().trim()] = {
            'type': 'unavailable',
            'limit': '00:00:00',
            'index': 40
          }
        }
        
        let stateLimitStr = this.skills[state.toLowerCase().trim()].limit
        let stateLimitMs  = this.timeFormat(stateLimitStr, 'number')
        
        if(this.segments[ID] && ms >= stateLimitMs){
          this.segments[ID].agents.push([name, time, ms])
        }
        else if(!this.segments[ID] && ms >= stateLimitMs){
          let skill = this.skills[state.toLowerCase().trim()]
          this.segments[ID] = {
            table: this.siteTables[site],
            title: state,
            id: ID,
            agents: [[name, time, ms]],
            segmentType: skill.type,
            index: skill.index
          }
          
          let rowID = name.trim().toLowerCase().replace(/\s/g, "_")
          if(!this.agents[rowID]){ this.agents[rowID] = {site} }
        }
      }
    }
  }
  // --- CREATE SEGMENTS --- //
  let segObjs = Object.keys(this.segmentObjs).length
  let len     = Object.keys(this.segments).length
  
  for(let a = 0; a < segObjs; a++){
    let key = Object.keys(this.segmentObjs)[a]
    this.segmentObjs[key].clear()
  }
  
  for(let a = 0; a < len; a++){
    let key = Object.keys(this.segments)[a]

    if(this.segmentObjs[key]){
      this.segmentObjs[key].addAgents( this.segments[key].agents )
      this.segmentObjs[key].sortRows(true) // DESC SORT
    }else if(this.segments[key]){
      let newSegment = new Segment( this.segments[key] )
      this.segmentObjs[key] = newSegment
      newSegment.sortRows(true) // DESC SORT
    }
  }
  this.scoutHolds()
}
JApp.prototype.scoutHolds = function () {
  let list = this.widgets.wd_call_list
                   .parentElement
                   .querySelector(".grid-canvas")
                   .children
  for(let a = 0; a < list.length; a++){
    let row = list[a].children
    let state = row[0].textContent.trim()
    let name = row[1].textContent.trim()
    let totalTime = row[2].textContent
    let totalTimeNum = this.timeFormat(totalTime, "number")
    
    if(state.includes("Hold") && name !== ""){
      let i = state.indexOf("(") + 1
      let o = state.indexOf(")")
      let timeTxt = state.substring(i, o)
      let timeNum = this.timeFormat(timeTxt, "number")
      let fixedTime = this.timeFormat(timeNum, "string")
      let rowID = name.trim().toLowerCase().replace(/\s/g, "_")
      
      let row = document.getElementById(rowID)
      
      if(row){
        let cont = row.querySelector(".jhold")
        
        if (cont) { cont.innerHTML = "" }
        else { cont = document.createElement("div") }

        let span = document.createElement("span")
        let time = document.createTextNode( fixedTime )
        
        span.textContent = "Hold"
        cont.classList.add("jhold")
        
        cont.appendChild(span)
        cont.appendChild(time)
        
        row.appendChild(cont)        
      }
      else if(this.agents[rowID]){
        let site = this.agents[rowID].site
        let table = this.siteTables[site]
        let segmentID = table.id + "_" + "hold"
        
        let exSegment = this.segments[segmentID]
        
        if(exSegment && timeNum >= 60000){
          this.segments[segmentID].agents.push([name, fixedTime, totalTime])
        }else if(!exSegment && timeNum >= 60000){
          this.segments[segmentID] = {
            table,
            title: "Long Hold",
            id: segmentID,
            agents: [[name, fixedTime, totalTime]],
            segmentType: "hold",
            index: 7
          }
        }
      }
    }
  }
  // --- CREATE HOLD SEGMENT --- //
  for (let a = 0; a < this.sites.length; a++) {
    let site = this.sites[a].toLowerCase()
    let segID = site + "_hold"
    
    if(this.segmentObjs[segID] && this.segments[segID]){
      this.segmentObjs[segID].addAgents(this.segments[segID].agents)
      this.segmentObjs[segID].sortRows(true)
    }else if(this.segments[segID]){
      let newSegment = new Segment( this.segments[segID] )
      this.segmentObjs[segID] = newSegment
      newSegment.sortRows(true)
    }
  }
}

let app = new JApp({
  widgets,
  skills,
  profiles,
  sites: sitesList,
  styleSheet
})

app.setWidgets()
app.prepare()
app.createSiteTables()
app.scoutAgents()

setInterval(app.scoutAgents.bind(app), 5000)
