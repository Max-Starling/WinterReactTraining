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
  // state = {
  //   response: ''
  // };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

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
  "targets": [
      {
          "name": "testTarget",
          "generalProgress": 0.3,
          "remainingTime": 1,
          "description": "It's awesome target."
      }, {
          "name": "testTarget #2",
          "generalProgress": 0.7,
          "remainingTime": 3,
          "description": "It's also awesome target."
      }, {
          "name": "testTarget №3",
          "generalProgress": 0.5,
          "remainingTime": 2,
          "description": "It's just something awesome."
      }, {
          "name": "testTarget_4",
          "generalProgress": 0.1,
          "remainingTime": 3,
          "description": "Awesome."
      }, {
        "name": "testTarget-5",
        "generalProgress": 0.9,
        "remainingTime": 999,
        "description": "Asm."
    }
  ],
  "groups": [
      {
          "name": "English Group",
          "picture": "koroleva_britanii.jpeg",
          "targets" : [],
          "groups" : []
      },
      {
          "name": "Katalonia",
          "picture": "freedom.png",
          "targets" : [],
          "groups" : [
              {
                  "name": "Life Sence",
                  "picture": "not-found.bmp",
                  "targets" : [
                      {
                          "name": "goddamnTarget",
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

console.log(jsonPerson);

//итераторы, мэпы, алгоритм на дереве буквами и цифрами, генераторы, конкатенация строк

function parsePersonToClass(jsonPerson, exemplarPerson) {
  const rec = function inRec(obj, type) {
      // obj.pathArray = [];
      Object.keys(obj).forEach((key, index) => {
        // console.log(obj[key] instanceof Array);
        if(key !== 'pathArray') {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item, i) => {

            if (obj.pathArray) { // && obj.pathArray.length
              // console.log('Copy parrant path array in child path array');
              item.pathArray = [...obj.pathArray];
            } else {
              // console.log('Create path array');
              item.pathArray = [];
            } 

            if(item.pathArray) {
              if(!(obj in item.pathArray)) {
                // console.log('Push child in child path array');
                // console.log('child obj', obj[key]);
                  // item.pathArray.push(item);
                  item.pathArray.push(`${key}${'_'}${i}`);
                console.log("path array:", item.pathArray);
                item.pathArray.forEach(() => {
                  console
                });
              }
            }
            console.log(obj, key.toUpperCase(), item);
            console.log(`

            `);

            if (key === "targets") {
              // type = "targets";
              exemplarPerson.addTarget(new TargetDetail(item.name, item.generalProgress, item.remainingTime, item.description));
              // console.log("path array:", exemplarPerson.execute(item.pathArray.slice(0, -1)));
              // exemplarPerson.execute(item.pathArray.slice(0, -1)).addTarget(new TargetDetail(item.name, item.generalProgress, item.remainingTime, item.description));
              // inRec(item, "targets");
            } 
            else if (key === "groups") {
              exemplarPerson.addGroup(new Entity(item.name, item.picture));
              // console.log("path array:11111111111", exemplarPerson.execute(item.pathArray));
              // inRec(item, "groups");
            } 
            // else {
            //   inRec(item);
            // }
            inRec(item, key);
          });
          
        } }
      });
  }
  rec(jsonPerson);
}

/* --------- CLASSES --------- */
class Entity {
  constructor(fullName, url, targets, groups) {
    this.name = fullName || "Unknown";
    this.picture = url || "default picture";
    this.targets = targets || [];
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
  get getTargets() {
    return this.targets;
  }
  set setTargets(t) {
    if(t) {
      this.targets = t;
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
  addTarget(t) {
    this.targets.push(t);
  }
  addGroup(g) {
    if(g) {
      this.groups.push(g);
    }
  }
  execute(pathArray) {
    // console.log(this);
    let obj = this;
    pathArray.forEach((item, i) => {
      const [type, index] = [item.split('_')[0], item.split('_')[1]];
      // const index =  item.split('_')[1];
      // console.log(type, index);
      switch (type) {
        case 'groups': obj = obj.getGroups[index]; break;
        case 'targets': obj = obj.getTargets[index]; break;
      }
    });
    // console.log(obj);
    return obj;
  }
}

class TargetPreview {
  constructor(name, generalProgress, remainingTime) {
    this.name = name || "Target";
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

class TargetDetail extends TargetPreview {
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

parsePersonToClass(jsonPerson, person);

// person.setAvatar = "src/resources/images/logo.svg";
// person.addTarget(new TargetDetail('testTarget', 0.3, 1, "It's awesome target."));
// person.addTarget(new TargetDetail('testTarget2', 0.4, 3, "It's awesome target 2."));
// person.addTarget(new TargetDetail('testTarget3', 0.5, 2, "It's awesome target 3."));
// person.addTarget(new TargetDetail('testTarget4', 0.5, 2, "It's awesome target 4."));
// person.addTarget(new TargetDetail('testTarget5', 0.5, 2, "It's awesome target 5."));
// person.addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));
// person.addTarget(new TargetDetail('testTarget7', 0.5, 2, "It's awesome target 7.It's awesome target 7."));

// person.addGroup(new Entity('English Group', 'koroleva_britanii.jpeg'));
// person.addGroup(new Entity('Katalonia', 'freedom.png'));

// person.addGroup(new Entity('Life Sense', 'not-found.bmp'));
person.execute(['groups_1']).addGroup(new Entity('Life Sense', 'not-found.bmp'));
// person.getGroups[1].addGroup(new Entity('Life Sense', 'not-found.bmp'));
person.execute(['groups_1', 'groups_0']).addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));
// person.execute(['groups_1', 'groups_0', 'groups_0', 'groups_0', 'groups_0', 'groups_0', 'groups_0', 'groups_0']).addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));

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
function createTarget({ 
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

/* --------- PERSON ENTITY --------- */
const Dan = createEntity({
  positionX: mainStage.getWidth() / 2 -150,
  positionY: 5,
  name: person.getName, 
  picture: person.getAvatar,
});

person.setEntity = Dan;

/* --------- LAYERS --------- */
const personLayer = new Konva.Layer();
const groupLayer = new Konva.Layer();
const targetLayer = new Konva.Layer();
const lineLayer = new Konva.Layer();

personLayer.add(Dan);

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
      // console.log(root, item);
      drawLine(itemGroup.attrs.x + 150, itemGroup.attrs.y + 100, root.getEntity.attrs.x + 150, root.getEntity.attrs.y + 100);
      groupLayer.add(itemGroup);
    });
  }
}
drawGroups(person, 500);
drawGroups(person.getGroups[1], 250);

/* --------- DRAWNING TARGETS --------- */
function drawTargets(root, offsetY) { 
  let deltaTargets = 0;
  if (root.getTargets.length) {
    root.getTargets.forEach((item, i) => {
      if (i !== 0 && i % 2 !== 0) {
        deltaTargets += 200;
      }
      // console.log(Math.pow(-1, i) * deltaTargets);
      var itemTarget = createTarget({
        positionX: root.getEntity.attrs.x + 150 + Math.pow(-1, i) * deltaTargets,
        positionY: root.getEntity.attrs.y + offsetY + 10 * root.getTargets.length,
        name: item.getName,
        remainingTime: item.getRemainingTime,
        generalProgress: item.getGeneralProgress,
        description: item.getDescription,
      });
      item.setEntity = itemTarget;
      drawLine(itemTarget.attrs.x, itemTarget.attrs.y, root.getEntity.attrs.x + 150, root.getEntity.attrs.y + 100);
      // personLayer.add(root.getEntity);
      targetLayer.add(itemTarget);
    });
  }
}
drawTargets(person, 300);
drawTargets(person.getGroups[1].getGroups[0], 300);

/* --------- DISPLAYING ON STAGE --------- */
mainStage.add(lineLayer);
mainStage.add(personLayer);
mainStage.add(groupLayer);
mainStage.add(targetLayer);


/* --------- DRAG & DROP --------- */

  // itemTarget.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemTarget.attrs.x, itemTarget.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(targetLayer);
  // });
  // Dan.on('xChange', (event) => {
  //   lineLayer.find('.link-line')[i].attrs.points = [itemTarget.attrs.x, itemTarget.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
  //   mainStage.add(lineLayer);
  //   mainStage.add(personLayer);
  //   mainStage.add(targetLayer);
  // });