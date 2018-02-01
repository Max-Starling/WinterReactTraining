/* ----- Dependencies ----- */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Konva from "konva";

/* ----- Components ----- */
import Header from "./components/Header/Header.js";
import Navbar from "./components/Navbar/Navbar.js";
// import Content from "./components/Content/Content.js";
import Footer from "./components/Footer/Footer.js";

/* ----- Styles ----- */
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Header />
            <Navbar />
            <Switch>
              {/* <Route exact="true "path="/home" component={Home}> </Route> */}
              {/* <Route "path="/item_II" component={Item_II}> </Route> */}
              <Route path="/:pth" component={Content}> </Route>
              <Redirect from="/" to="/home" />
            </Switch>
            {/* <Route exact path="/home" render={() => <p>Welcome</p>}> </Route> */}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
const Content = ({ match }) => {
  // console.log(match.params.pth);
  return (
    <div>
      {match.params.pth}
    </div>
  );
};

export default App;

const jsonPerson = JSON.parse(`{
  "name": "Dan Kr",
  "picture": "krasivo.svg",
  "goals": [
      {
          "name": "Test Goal",
          "generalProgress": 0.3,
          "remainingTime": 1,
          "description": "It's awesome goal."
      }, {
          "name": "Test Goal #2",
          "generalProgress": 0.7,
          "remainingTime": 3,
          "description": "It's also awesome goal."
      }, {
          "name": "Test Goal №3",
          "generalProgress": 0.5,
          "remainingTime": 2,
          "description": "It's just something awesome."
      }, {
          "name": "Test Goal_4",
          "generalProgress": 0.1,
          "remainingTime": 3,
          "description": "Awesome."
      }, {
        "name": "Test Goal-5",
        "generalProgress": 0.9,
        "remainingTime": 999,
        "description": "Asm."
    }
  ],
  "groups": [
      {
          "name": "English Group",
          "picture": "koroleva_britanii.jpeg",
          "goals" : [],
          "groups" : []
      },
      {
          "name": "Katalonia",
          "picture": "freedom.png",
          "goals" : [
            {
              "name": "Break Away Goal",
              "generalProgress": 0.9,
              "remainingTime": 25,
              "description": "Now or never. All or nothing."
            }
          ],
          "groups" : [
              {
                  "name": "Life Sence",
                  "picture": "not-found.bmp",
                  "goals": [
                    {
                        "name": "Goal I",
                        "generalProgress": 0.1,
                        "remainingTime": 1
                    }, {
                        "name": "Goal II",
                        "generalProgress": 0.2,
                        "remainingTime": 2
                    }, {
                        "name": "Goal III",
                        "generalProgress": 0.3,
                        "remainingTime": 3
                    }, {
                        "name": "Goal IV",
                        "generalProgress": 0.4,
                        "remainingTime": 3
                    }, {
                      "name": "Goal V",
                      "generalProgress": 0.5,
                      "remainingTime": 5
                  }
                ],
                  "groups" : [ 
                    {
                    "name": "Katalonia",
                    "picture": "freedom.png",
                    "goals" : [
                      {
                        "name": "Break Away Goal",
                        "generalProgress": 0.9,
                        "remainingTime": 25,
                        "description": "Now or never. All or nothing."
                      }
                    ],
                    "groups" : []
                  }
                ]
              }
          ]
      }
  ]
}`);

function parseJsonToClass(jsonPerson, exemplarPerson) {
  (function recursiveTraversal(parentNode, type) {
      Object.keys(parentNode).forEach((key) => {
          // consider only array keys exept path array (only goals and groups)
          if (parentNode[key] instanceof Array && key !== 'pathArray') {
            parentNode[`${key}Length`] = 0;
            parentNode[key].forEach((item, i) => {
              parentNode[`${key}Length`]+=1;
              // copy parent path array or create new path array if it's doesn't exist
              if (parentNode.pathArray) { 
                item.pathArray = [...parentNode.pathArray];
              } else {
                item.pathArray = [];
              } 
              // push string information in path array
              item.pathArray.push(`${key}${'_'}${i}`);
              console.log(item.pathArray);
              // add node to the exemplar
              addNode(exemplarPerson, key, item, item.pathArray.slice(0, -1));
              // consider child as parent and repeat
              recursiveTraversal(item, key);
            });
            console.log('papa', parentNode);
          } 
      });
  })(jsonPerson);
}

function addNode(exemplar, type, node, slicedPathArray) {
  if (type === "goals") {
    if (slicedPathArray.length) {
      exemplar.execute(slicedPathArray).addGoal(new GoalDetail(node.name, node.generalProgress, node.remainingTime, node.description));
      exemplar.execute(slicedPathArray).setGoalsLength =  exemplar.execute(slicedPathArray).getGoalsLength + 1;
    } else {
      exemplar.addGoal(new GoalDetail(node.name, node.generalProgress, node.remainingTime, node.description));
      exemplar.setGoalsLength =  exemplar.getGoalsLength + 1; 
    }
  } 
  else if (type === "groups") {
    if (slicedPathArray.length) {
      exemplar.execute(slicedPathArray).addGroup(new Entity(node.name, node.picture));
      exemplar.execute(slicedPathArray).setGroupsLength =  exemplar.execute(slicedPathArray).getGroupsLength + 1;
    } else {
      exemplar.addGroup(new Entity(node.name, node.picture));
      exemplar.setGroupsLength =  exemplar.getGroupsLength + 1; 
    }
  } 
}

function drawClass(exemplar) {
  (function recursiveTraversal(parentNode, type) {
    Object.keys(parentNode).forEach((key) => {
      // consider only array keys exept path array (only goals and groups)
      if (parentNode[key] instanceof Array && key !== 'pathArray') {
        parentNode[key].forEach((item, i) => {
          // copy parent path array or create new path array if it's doesn't exist
          if (parentNode.pathArray) { 
            item.pathArray = [...parentNode.pathArray];
          } else {
            item.pathArray = [];
          } 
          // push string information in path array
          if(item.pathArray) {
            item.pathArray.push(`${key}${'_'}${i}`);
          }
          // add node to the exemplar
          drawNodeChilds(exemplar, key, item, parentNode, item.pathArray.slice(0, -1));
          // consider child as parent and repeat
          recursiveTraversal(item, key);
        });
      } 
    });
  })(exemplar);
}

function drawNodeChilds(exemplar, type, node, parentNode, slicedPathArray) {
  if (slicedPathArray.length) {
    switch(type) {
      case 'goals': 
        if (!parentNode.isGoalsDrawn) {
          drawGoals(exemplar.execute(slicedPathArray), 350, 300);
          parentNode.isGoalsDrawn = true;
        }
        break;
      case 'groups':
        if (!parentNode.isGroupsDrawn) {
          drawGroups(exemplar.execute(slicedPathArray), 350, 300);
          parentNode.isGroupsDrawn = true;
        }
        break;
      default: 
        break;
    }
  }
}

/* --------- CLASSES --------- */
class Entity {
  constructor(fullName, url, goals, groups) {
    this.name = fullName || "Unknown";
    this.picture = url || "default picture";
    this.goals = goals || [];
    this.goalsLength = 0;
    this.groups = groups || [];
    this.groupsLength = 0;
    this.entity = null;
  }
  get getName() {
    return this.name;
  }
  set setName(n) {
    if (n) {
      this.name = n;
    }
  }
  get getAvatar() {
    return this.picture;
  }
  set setAvatar(a) {
    if (a) {
      this.picture = a;
    }
  }
  get getGoals() {
    return this.goals;
  }
  set setGoals(t) {
    if(t) {
      this.goals = t;
    }
  }
  get getGroups() {
    return this.groups;
  }
  set setGroups(g) {
    if(g.length) {
      this.groups = g;
    }
  }
  set setEntity(e) {
    if (e) {
      this.entity = e;
    }
  }
  get getEntity() {
    return this.entity;
  }
  set setGroupsLength(length) {
    if (length) {
      this.groupsLength = length;
    }
  }
  get getGroupsLength() {
    return this.groupsLength;
  }
  set setGoalsLength(length) {
    if (length) {
      this.goalsLength = length;
    }
  }
  get getGoalsLength() {
    return this.goalsLength;
  } 
  getGeneralLength() {
    return this.goalsLength + this.groupsLength;
  }
  getSequences() {
    const groupsSequence = [];
    const goalsSequence = [];
    if (this.getGoalsLength) {
      switch (this.getGroupsLength) {
        case 1:
          for (let i = 0; i < this.getGeneralLength(); i++) {
            if (i === Math.ceil(this.getGoalsLength / 2)) {
              groupsSequence.push(1);
              goalsSequence.push(0);
            } else {
              groupsSequence.push(0);
              goalsSequence.push(1);
            }
          }
          break;
        case 2: 
          for (let i = 0; i < this.getGeneralLength(); i++) {
            if (i === 0 || i === this.getGeneralLength() - 1) {
              groupsSequence.push(1);
              goalsSequence.push(0);
            } else {
              groupsSequence.push(0);
              goalsSequence.push(1);
            }
          }
          break;
        default: 
          const intermediateSquaresLength = Math.ceil(this.getGoalsLength / this.getGroupsLength);
          for (let i = 0; i < this.getGeneralLength(); i += (intermediateSquaresLength + 1)) {
            groupsSequence.push(1);
            goalsSequence.push(0);
            for (let j = 0; j < intermediateSquaresLength; j++) {
              groupsSequence.push(0);
              goalsSequence.push(1);
            }
          }
          break;
      }
    }
    return {
      groupsSequence, 
      goalsSequence 
    }
  }
  addGoal(t) {
    this.goals.push(t);
  }
  addGroup(g) {
    if(g) {
      this.groups.push(g);
    }
  }
  execute(pathArray) {
    let obj = this;
    pathArray.forEach((item, i) => {
      const [type, index] = [item.split('_')[0], item.split('_')[1]];
      switch (type) {
        case 'groups': obj = obj.getGroups[index]; break;
        case 'goals': obj = obj.getGoals[index]; break;
        default: break;
      }
    });
    return obj;
  }
}

class GoalPreview {
  constructor(name, generalProgress, remainingTime) {
    this.name = name || "Goal";
    this.generalProgress = Number(generalProgress) || 0;
    this.remainingTime = Number(remainingTime) || 24;
  }
  get getName() {
    return this.name;
  }
  set setName(n) {
    if (n) {
      this.name = n;
    }
  }
  get getGeneralProgress() {
    return this.generalProgress;
  }
  set setGeneralProgress(gp) {
    if (gp) {
      this.generalProgress = gp;
    }
  }
  get getRemainingTime() {
    return this.remainingTime;
  }
  set setRemainingTime(rt) {
    if (rt) {
      this.remainingTime = rt;
    }
  }
}

class GoalDetail extends GoalPreview {
  constructor(name, generalProgress, remainingTime, description) {
    super(name, generalProgress,remainingTime);
    this.description = description || "Description";
  }
  get getDescription() {
    return this.description;
  }
  set setDescription(d) {
    if (d) {
      this.description = d;
    }
  }
}

/* --------- OBJECTS OF CLASSES --------- */
const person = new Entity('Dan Kr', 'krasivo.svg');
parseJsonToClass(jsonPerson, person);
console.log(person);

// document.querySelector('#main-stage').style.width = window.innerWidth + 'px';
// document.querySelector('#main-stage').style.height = window.innerHeight - 100;
document.querySelector('#main-stage').style.overflowX = 'scroll';
document.querySelector('#main-stage').style.overflowY = 'scroll';
/* --------- STAGE --------- */
var mainStage = new Konva.Stage({
  container: 'main-stage',
  width: 6000,
  height: 1400,
});

/* --------- CREATE ENTITY --------- */
function createEntity({ positionX, positionY, name, picture }) {
  const entityGroup = new Konva.Group({
    x: positionX - 300,
    y: positionY,
    // draggable: true
  });
  // let firstLetters = '';
  // name.split(' ').forEach((item) => {
  //   console.log(item);
  //   firstLetters = `${firstLetters}${item[0]}`
  // })
  const entityCardLetter = new Konva.Text({
    x: 118,
    y: 32,
    text: `${name[0]}`, //\n${picture}
    fontSize: 36,
    fontFamily: 'Cambria', //Purisa
    fontStyle: 'bold',
    fill: '#555',
    // width: 300,
    padding: 20,
    align: 'center'
  });

  const entityCardText = new Konva.Text({
    x: 190,
    y: 38,
    text: `${name}`, //\n${picture}
    fontSize: 22,
    fontFamily: 'Cambria', //Purisa
    fontStyle: 'bold',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'left'
  });

  const entityCardBackground = new Konva.Circle({
      x: 150,
      y: 70,
      // stroke: 'f7f7f7',
      strokeWidth: 0.07,
      fill: '#f7f7f7',
      radius: 40,
      // height: entityCardText.getHeight() + 70,
      shadowColor: 'black',
      shadowBlur: 4, //10
      shadowOffset: {x : 0, y : 1},
      shadowOpacity: 0.4, // 0.2
    });

  entityGroup.add(entityCardBackground);
  entityGroup.add(entityCardText);
  entityGroup.add(entityCardLetter);
  return entityGroup;
}

/* --------- CREATE GOAL --------- */
function createGoal({ 
                        positionX, 
                        positionY, 
                        name, 
                        generalProgress, 
                        remainingTime, 
                        description }) {
  const goalGroup = new Konva.Group({
    x: positionX,
    y: positionY,
    // draggable: true,
  });

  const goalCardName = new Konva.Text({
    x: -150,
    y: -50,
    text: `${name}`, 
    fontSize: 20,
    fontFamily: 'NanumGotic',
    fontStyle: 'bold',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  
  const goalCardText = new Konva.Text({
    x: -150,
    y: -30,
    text: `${description}\n${'Progress: '}${generalProgress * 100}${'%'}\n${remainingTime}${' days left'}`, 
    fontSize: 20,
    fontFamily: 'NanumGotic',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });

  const goalCardBackground = new Konva.Rect({
    x: -150,
    y: -50,
    // stroke: 'f7f7f7',
    strokeWidth: 0.15,
    fill: '#f7f7f7',
    width: 300,
    height: goalCardText.getHeight() + 30,
    shadowColor: 'black',
    shadowBlur: 4,
    shadowOffset: {x : 0, y : 2},
    shadowOpacity: 0.4,
  });
  goalGroup.add(goalCardBackground);
  goalGroup.add(goalCardText);
  goalGroup.add(goalCardName);
  return goalGroup;
}

/* --------- LAYERS --------- */
const personLayer = new Konva.Layer();
const groupLayer = new Konva.Layer();
const goalLayer = new Konva.Layer();
const lineLayer = new Konva.Layer();
const backgroundLayer = new Konva.Layer();
// const elem = document.querySelector("#main-stage");
// elem.style.transform = elem.style.WebkitTransform = elem.style.MsTransform = 'scale(0.8)';

/* --------- BACKGROUND --------- */
const stageBackground = new Konva.Rect({
  fill: '#e2e1e0',
  width: mainStage.getWidth(),
  height: mainStage.getHeight(),
  shadowColor: '#e2e1e0',
  shadowBlur: 4,
  shadowOffset: {x : 0, y : 2},
  shadowOpacity: 0.4,
});
backgroundLayer.add(stageBackground);

/* --------- PERSON ENTITY --------- */
const personEntity = createEntity({
  positionX: mainStage.getWidth() / 2 -150,
  positionY: 5,
  name: person.getName, 
  picture: person.getAvatar,
});

person.setEntity = personEntity;
personLayer.add(personEntity);

/* --------- DRAWNING LINES --------- */
function drawLine(coordX, coordY, viewX, viewY, strokeWidth = 1) {
  const linkLine = new Konva.Line({
    points: [coordX, coordY, viewX, viewY],
    stroke: '#212121',
    strokeWidth: strokeWidth,
    lineCap: 'round',
    lineJoin: 'round',
    name: 'link-line',
  });
  lineLayer.add(linkLine);
  return linkLine;
}

/* --------- DRAWNING GROUPS --------- */
function drawGroups(node, offsetX, offsetY) { 
  // console.log(node, node.getSequences().groupsSequence);
  if (node.getGroups.length) {
    node.getGroups.forEach((item, index) => {
      const startX = node.getEntity.attrs.x + (-1) * (node.getGeneralLength() / 2 - 1) * offsetX;
      let currentX =  startX + (node.getGoalsLength + 1 + index) * offsetX;
      const currentY = node.getEntity.attrs.y + offsetY;
      const itemGroup = createEntity({
        positionX: currentX,
        positionY: currentY,
        name: item.getName, 
        picture: item.getAvatar,
      });
      item.setEntity = itemGroup;
      drawLine(itemGroup.attrs.x + 150, itemGroup.attrs.y + 100, node.getEntity.attrs.x + 150, node.getEntity.attrs.y + 100);
      groupLayer.add(itemGroup);
    });
  }
}
drawGroups(person, 350, 250);
// personLayer.add(personEntity);

/* --------- DRAWNING GOALS --------- */
function drawGoals(node, offsetX, offsetY) { 
  if (node.getGoals.length) {
    node.getGoals.forEach((item, index) => {
      const startX = node.getEntity.attrs.x + (-1) * (node.getGeneralLength() / 2 - 1) * offsetX;
      let currentX =  startX + index * offsetX;
      const currentY = node.getEntity.attrs.y + offsetY;
      var itemGoal = createGoal({
        positionX: currentX,
        positionY: currentY,
        name: item.getName,
        remainingTime: item.getRemainingTime,
        generalProgress: item.getGeneralProgress,
        description: item.getDescription,
      });
      item.setEntity = itemGoal;
      //const line = 
      drawLine(itemGoal.attrs.x, itemGoal.attrs.y, node.getEntity.attrs.x + 150, node.getEntity.attrs.y + 100);
      // itemGoal.on('xChange', (event) => {
      //   line.attrs.points = [itemGoal.attrs.x, itemGoal.attrs.y, node.getEntity.attrs.x + 150, node.getEntity.attrs.y + 100];
      //   lineLayer.draw();
      // });
      goalLayer.add(itemGoal);
    });
  }
}
drawGoals(person, 350, 250);
drawClass(person);

/* --------- DISPLAYING ON STAGE --------- */
mainStage.add(backgroundLayer);
mainStage.add(lineLayer);
mainStage.add(personLayer);
mainStage.add(groupLayer);
mainStage.add(goalLayer);


// function downloadURI(uri, name) {
//   var link = document.createElement("a");
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   // delete link;
// }

// document.getElementById('save').addEventListener('click', function () {
//   var dataURL = mainStage.toDataURL();
//   downloadURI(dataURL, 'stage.png');
// }, false);

// window.onresize = function () {
//   console.log('qq');
//   mainStage.batchDraw();
// }

/* --------- DRAG & DROP --------- */

  // itemGoal.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemGoal.attrs.x, itemGoal.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(goalLayer);
  // });
  // Dan.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemGoal.attrs.x, itemGoal.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(goalLayer);
  // });