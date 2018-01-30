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
          "name": "testGoal",
          "generalProgress": 0.3,
          "remainingTime": 1,
          "description": "It's awesome target."
      }, {
          "name": "testGoal #2",
          "generalProgress": 0.7,
          "remainingTime": 3,
          "description": "It's also awesome target."
      }, {
          "name": "testGoal №3",
          "generalProgress": 0.5,
          "remainingTime": 2,
          "description": "It's just something awesome."
      }, {
          "name": "testGoal_4",
          "generalProgress": 0.1,
          "remainingTime": 3,
          "description": "Awesome."
      }, {
        "name": "testGoal-5",
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
          "goals" : [],
          "groups" : [
              {
                  "name": "Life Sence",
                  "picture": "not-found.bmp",
                  "goals" : [
                      {
                          "name": "goddamnGoal",
                          "generalProgress": 0.3,
                          "remainingTime": 1,
                          "description": "How u dare?!"
                      }
                  ],
                  "groups" : []
              }
          ]
      }
  ]
}`);

function parseJsonToClass(jsonPerson, exemplarPerson) {
  (function recursiveTraversal(parentNode, type) {
      Object.keys(parentNode).forEach((key) => {
        // consider only keys in json (all keys except path array)
        if(key !== 'pathArray') {
          // consider only arrays (goals and groups)
          if (parentNode[key] instanceof Array) {
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
              addNode(exemplarPerson, key, item, item.pathArray.slice(0, -1));
              // consider child as parent and repeat
              recursiveTraversal(item, key);
            });
          } 
        }
      });
  })(jsonPerson);
}

function addNode(exemplar, type, node, slicedPathArray) {
  if (type === "goals") {
    if (slicedPathArray.length) {
      exemplar.execute(slicedPathArray).addGoal(new GoalDetail(node.name, node.generalProgress, node.remainingTime, node.description)); 
    } else {
      exemplar.addGoal(new GoalDetail(node.name, node.generalProgress, node.remainingTime, node.description)); 
    }
  } 
  else if (type === "groups") {
    if (slicedPathArray.length) {
      exemplar.execute(slicedPathArray).addGroup(new Entity(node.name, node.picture));
    } else {
      exemplar.addGroup(new Entity(node.name, node.picture));
    }
  } 
}

/* --------- CLASSES --------- */
class Entity {
  constructor(fullName, url, goals, groups) {
    this.name = fullName || "Unknown";
    this.picture = url || "default picture";
    this.goals = goals || [];
    this.groups = groups || [];
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
const person = new Entity('Dan KR', 'krasivo.svg');
parseJsonToClass(jsonPerson, person);

/* --------- STAGE --------- */
var mainStage = new Konva.Stage({
  container: 'main-stage',
  width: window.innerWidth,
  height: 2000,
});

/* --------- CREATE ENTITY --------- */
function createEntity({ positionX, positionY, name, picture }) {
  const EntityGroup = new Konva.Group({
    x: positionX,
    y: positionY,
    // draggable: true, //false 
  });

  const EntityCardText = new Konva.Text({
    text: `${name}\n${picture}`, 
    fontSize: 18,
    fontFamily: 'Cambria', //Purisa
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  
  const EntityCardBackground = new Konva.Rect({
    stroke: 'f7f7f7',
    strokeWidth: 0.15,
    fill: '#f7f7f7',
    width: 300,
    height: EntityCardText.getHeight() + 100,
    shadowColor: 'black',
    shadowBlur: 5,
    shadowOffset: {x : 2, y : 2},
    shadowOpacity: 0.5,
  });
  EntityGroup.add(EntityCardBackground);
  EntityGroup.add(EntityCardText);
  return EntityGroup;
}

/* --------- CREATE TARGET --------- */
function createGoal({ 
                        positionX, 
                        positionY, 
                        name, 
                        generalProgress, 
                        remainingTime, 
                        description }) {
  const targetGroup = new Konva.Group({
    x: positionX,
    y: positionY,
    // draggable: true,
  });
  const targetCardText = new Konva.Text({
    x: -150,
    y: -50,
    text: `${name}\n${generalProgress}\n${remainingTime}\n${description}`, 
    fontSize: 18,
    fontFamily: 'Cambria',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  const targetCardBackground = new Konva.Circle({
    x: 0,
    y: 0,
    stroke: 'f7f7f7',
    strokeWidth: 0.07,
    fill: '#f7f7f7',
    // radius: 40,
    height: targetCardText.getHeight() + 70,
    shadowColor: 'black',
    shadowBlur: 5,
    shadowOffset: {x : 2, y : 2},
    shadowOpacity: 0.5,
  });

  targetGroup.add(targetCardBackground);
  targetGroup.add(targetCardText);
  return targetGroup;
}

/* --------- LAYERS --------- */
const personLayer = new Konva.Layer();
const groupLayer = new Konva.Layer();
const targetLayer = new Konva.Layer();
const lineLayer = new Konva.Layer();

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
function drawLine(coordX, coordY, viewX, viewY) {
  const linkLine = new Konva.Line({
    points: [coordX, coordY, viewX, viewY],
    stroke: 'black',
    strokeWidth: 1,
    lineCap: 'round',
    lineJoin: 'round',
    name: 'link-line'
  });
  lineLayer.add(linkLine);
}

/* --------- DRAWNING TARGETS --------- */
function drawGroups(root, offsetY) { 
  let deltaGroups = 0;
  if (root.getGroups.length) {
    root.getGroups.forEach((item, i) => {
      if (i !== 0 && i % 2 !== 0) {
        deltaGroups += 400;
      }
      const itemGroup = createEntity({
        positionX: root.getEntity.attrs.x + 150 + Math.pow(-1, i) * deltaGroups,
        positionY: root.getEntity.attrs.y + offsetY + 10 * root.getGroups.length,
        name: item.getName, 
        picture: item.getAvatar,
      });
      item.setEntity = itemGroup;
      drawLine(itemGroup.attrs.x + 150, itemGroup.attrs.y + 100, root.getEntity.attrs.x + 150, root.getEntity.attrs.y + 100);
      groupLayer.add(itemGroup);
    });
  }
}
drawGroups(person, 500);
drawGroups(person.getGroups[1], 250);

/* --------- DRAWNING TARGETS --------- */
function drawGoals(root, offsetY) { 
  let deltaGoals = 0;
  if (root.getGoals.length) {
    root.getGoals.forEach((item, i) => {
      if (i !== 0 && i % 2 !== 0) {
        deltaGoals += 200;
      }
      // console.log(Math.pow(-1, i) * deltaGoals);
      var itemGoal = createGoal({
        positionX: root.getEntity.attrs.x + 150 + Math.pow(-1, i) * deltaGoals,
        positionY: root.getEntity.attrs.y + offsetY + 10 * root.getGoals.length,
        name: item.getName,
        remainingTime: item.getRemainingTime,
        generalProgress: item.getGeneralProgress,
        description: item.getDescription,
      });
      item.setEntity = itemGoal;
      drawLine(itemGoal.attrs.x, itemGoal.attrs.y, root.getEntity.attrs.x + 150, root.getEntity.attrs.y + 100);
      // personLayer.add(root.getEntity);
      targetLayer.add(itemGoal);
    });
  }
}
drawGoals(person, 300);
drawGoals(person.getGroups[1].getGroups[0], 300);

/* --------- DISPLAYING ON STAGE --------- */
mainStage.add(lineLayer);
mainStage.add(personLayer);
mainStage.add(groupLayer);
mainStage.add(targetLayer);


/* --------- DRAG & DROP --------- */

  // itemGoal.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemGoal.attrs.x, itemGoal.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(targetLayer);
  // });
  // Dan.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemGoal.attrs.x, itemGoal.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(targetLayer);
  // });