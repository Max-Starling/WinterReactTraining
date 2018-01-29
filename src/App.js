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
  console.log(match.params.pth);
  return (
    <div>
      {match.params.pth}
    </div>
  );
};

export default App;

// first we need to create a stage
var stage = new Konva.Stage({
  container: 'stage1',   // id of container <div>
  width: 500,
  height: 500,
});

// then create layer
var layer = new Konva.Layer();

// create our shape
var pentagon = new Konva.RegularPolygon({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  sides: 4,
  radius: 60,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 2,
  shadowColor: 'pink',
  shadowOffsetX : 5,
  shadowOffsetY : 5,
  shadowBlur : 10,
  opacity : 1,
  name : 'red-quadro'
});

var pentagon2 = new Konva.RegularPolygon({
  x: stage.getWidth() - 100,
  y: stage.getHeight() - 100,
  sides: 5,
  radius: 60,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 2,
  shadowColor: 'pink',
  shadowOffsetX : 5,
  shadowOffsetY : 5,
  shadowBlur : 10,
  opacity : 1,
  name : 'red-quadro'
});
pentagon.draggable('true');
pentagon2.draggable('true');

pentagon.on('mouseout touchend', () => console.log('user input'));
var triangle = new Konva.Shape({
  sceneFunc: function(context) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();

    // special Konva.js method
    context.fillStrokeShape(this);
  },
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4
});
// var redLine;
// const redQuadro = layer.findOne('.red-quadro');
// const triangle = layer.findOne('.red-quadro');
function drawLink(coordX, coordY, viewX, viewY) {
  const redLine = new Konva.Line({
    points: [coordX, coordY, viewX, viewY],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    name: 'red-line'
  });
  layer.add(redLine);
}
drawLink(pentagon.getX(), pentagon.getY(), triangle.getX(), triangle.getY());
drawLink(pentagon.getX(), pentagon.getY(), pentagon2.getX(), pentagon2.getY());
layer.add(pentagon2);
stage.add(layer);
var text = new Konva.Text({
  x: 10,
  y: 10,
  text: 'Static Layer',
  fontSize: '30',
  fontFamily: 'Calibri',
  fill: 'black'
});

pentagon.on('xChange', (event) => {
  // console.log('position change', event.target, event.currentTarget);
  event.currentTarget.attrs.fill = "black";
  // console.log(layer.find('.red-line'));
  layer.find('.red-line')[0].attrs.points = [pentagon.getX(), pentagon.getY(), triangle.getX(), triangle.getY()];
  layer.find('.red-line')[1].attrs.points = [pentagon.getX(), pentagon.getY(), pentagon2.getX(), pentagon2.getY()];
  // drawLink(pentagon.getX(), pentagon.getY(), pentagon2.getX(), pentagon2.getY());
  // layer.findOne('.red-quadro').attrs.fill = "black";
});

pentagon2.on('xChange', (event) => {
  // layer.find('.red-line')[0].attrs.points = [pentagon.getX(), pentagon.getY(), triangle.getX(), triangle.getY()];
  layer.find('.red-line')[1].attrs.points = [pentagon.getX(), pentagon.getY(), pentagon2.getX(), pentagon2.getY()];
});

pentagon.on('dragend', (event) => {
  // console.log('drag stopped', event.target, event.currentTarget);
  event.currentTarget.attrs.fill = "red";
  console.log(event.currentTarget.getX());
  console.log(pentagon.getX());
  // drawLink(pentagon.getX(), pentagon.getY(), triangle.getX(), triangle.getY());
  // redLine.attrs.points = [pentagon.getX(), pentagon.getY(), triangle.getX(), triangle.getY()];
  layer.add(pentagon);
  stage.add(layer);
});


text.cache();

var staticLayer = new Konva.Layer();
staticLayer.add(text);
stage.add(staticLayer);
// add the shape to the layer
layer.add(pentagon);
console.log(layer.find('.red-quadro')[0].attrs);


// add the layer to the stage
// stage.add(layer);

// layer.add(triangle);
stage.add(layer);

var group = new Konva.Group({
  draggable: true
});

// Font = require('canvas').Font,
// path = require('path');
// function fontFile(name) {
//   return path.join(__dirname, '/Ubuntu/', name);
// }

// var font = new Font('Ubuntu', fontFile('Ubuntu-Regular.ttf'));
// font.addFace(fontFile('Ubuntu-Bold.ttf'),   'bold');
// font.addFace(fontFile('Ubuntu-Italic.ttf'), 'normal', 'italic');
// font.addFace(fontFile('Ubuntu-BoldItalic.ttf'), 'bold', 'italic');



var complexText = new Konva.Text({
  x: 40,
  y: 60,
  text: 'COMPLEX TEXT\n\nAll the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.',
  fontSize: 18,
  fontFamily: 'Cambria',
  fill: '#555',
  width: 400,
  padding: 20,
  align: 'center'
});

var rect = new Konva.Rect({
  x: 40,
  y: 60,
  stroke: '#555',
  strokeWidth: 3,
  fill: '#ddd',
  width: 400,
  height: complexText.getHeight(),
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffset: [10, 10],
  shadowOpacity: 0.2,
  cornerRadius: 10,
  // draggable: true,
});

// layer.add(rect);
// layer.add(complexText);
group.add(rect);
group.add(complexText);
group.on('mouseover', () => document.body.style.cursor = 'pointer');
group.on('mouseout', () => document.body.style.cursor = 'default');

layer.add(group);

// complexText.draggable('true');
// complexText.on('dragged', (event) => {
//   // event.currentTarget.attrs.fill = "black";
//   rect.attrs.x = this.attrs.x;
//   rect.attrs.y = this.attrs.y;
//   layer.add(rect);
//   layer.drow();
//   // rect.draw();
//   // layer.add(rect);
//   // layer.add(complexText);
//   stage.add(layer);
//   console.log(rect.attrs);
//   // console.log('qq');
// });

var group2 = new Konva.Group({
  x: 120,
  y: 40,
  rotation: 20,
  draggable: true,
});

var colors = ['red', 'orange', 'yellow'];

for(var i = 0; i < 3; i++) {
  var box = new Konva.Rect({
      x: i * 30,
      y: i * 18,
      width: 100,
      height: 50,
      name: colors[i],
      fill: colors[i],
      stroke: 'black',
      strokeWidth: 4
  });
  group2.add(box);
}

var tween;
group.on('mousedown', function() {
  // this.moveTo(group2);
  if (tween) {
    tween.destroy();  
  }
  tween = new Konva.Tween({
    node: pentagon, 
    duration: 1,
    scaleX: Math.random() * 2,
    scaleY: Math.random() * 2,
    easing: Konva.Easings.ElasticEaseOut
  }).play();
});

layer.add(group2);

stage.add(layer);










class Person {
  constructor(fullName, url, targets, groups) {
    this.name = fullName || "Unknown";
    this.avatar = url || "default picture";
    this.targets = targets || [];
    this.groups = groups || [];
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
    return this.avatar;
  }
  set setAvatar(a) {
    if (a) {
      this.avatar = a;
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
    if(g) {
      this.groups = g;
    }
  }
  addTarget(t) {
    if(t) {
      this.targets.push(t);
    }
  }
  addGroup(g) {
    if(g) {
      this.groups.push(g);
    }
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

const p = new Person('Alen Stone');

p.setAvatar = "src/resources/images/logo.svg";

p.addTarget(new TargetDetail('testTarget', 0.3, 1, "It's awesome target."));

var mainStage = new Konva.Stage({
  container: 'stage2',
  width: 2000,
  height: 2000,
});


function createPerson({ positionX, positionY, name, avatar }) {
  const personGroup = new Konva.Group({
    x: positionX,
    y: positionY,
    // draggable: true, //false 
  });

  const personCardText = new Konva.Text({
    text: `${name}\n${avatar}`, 
    fontSize: 18,
    fontFamily: 'Cambria', //Purisa
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center'
  });
  
  const personCardBackground = new Konva.Rect({
    stroke: 'f7f7f7',
    strokeWidth: 0.15,
    fill: '#f7f7f7',
    width: 300,
    height: personCardText.getHeight() + 100,
    shadowColor: 'black',
    shadowBlur: 5,
    shadowOffset: {x : 2, y : 2},
    shadowOpacity: 0.5,
  });
  personGroup.add(personCardBackground);
  personGroup.add(personCardText);
  return personGroup;
}

function createTarget({ positionX, 
                        positionY, 
                        name, 
                        genetalProgress, 
                        remainingTime, 
                        description }) {
  const targetGroup = new Konva.Group({
    x: positionX,
    y: positionY,
    draggable: true,
  });

  const targetCardText = new Konva.Text({
    x: -150,
    y: -50,
    text: `${name}\n${genetalProgress}\n${remainingTime}\n${description}`, 
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
  
  // const targetPhantomText = new Konva.Text({
  //   x: targetCardText.getHeight() - 70,
  //   y: -50,
  //   text: `${name}\n${genetalProgress}\n${remainingTime}\n${description}`, 
  //   fontSize: 18,
  //   fontFamily: 'Cambria',
  //   fill: '#555',
  //   width: 300,
  //   padding: 20,
  //   align: 'center',
  //   opacity: 0.5,
  // });

  // const targetPhantomBackground = new Konva.Circle({
  //   x: targetCardText.getHeight() + 80,
  //   y: 0,
  //   stroke: 'f7f7f7',
  //   strokeWidth: 0.07,
  //   fill: '#f7f7f7',
  //   // radius: 40,
  //   height: targetCardText.getHeight() + 70,
  //   shadowColor: 'black',
  //   shadowBlur: 5,
  //   shadowOffset: {x : 2, y : 2},
  //   shadowOpacity: 0.5,
  //   opacity: 0.5,
  // });

  // targetPhantomText.hide();
  // targetPhantomBackground.hide();

  // targetCardText.on('mouseleave', function() {
  //   targetPhantomText.hide();
  //   targetPhantomBackground.hide();
  // });

  // targetCardText.on('mouseover', function() {
  //   targetPhantomText.show();
  //   targetPhantomBackground.show();
  // });

  targetGroup.add(targetCardBackground);
  targetGroup.add(targetCardText);
  // targetGroup.add(targetPhantomText);
  // targetGroup.add(targetPhantomBackground);

  return targetGroup;
}

var personLayer = new Konva.Layer();

console.log(mainStage.getHeight());
console.log(mainStage.getWidth());

personLayer.add(createPerson({
  positionX: mainStage.getWidth() / 2,
  positionY: mainStage.getHeight() / 4,
  name: p.getName, 
  avatar: p.getAvatar,
}));

const targetLayer = new Konva.Layer();
const lineLayer = new Konva.Layer();

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

const Dan = createPerson({
  positionX: mainStage.getHeight() / 2 + 400,
  positionY: 5,
  name: 'Dan KR', 
  avatar: 'krasivo.svg',
});

personLayer.add(Dan);

p.addTarget(new TargetDetail('testTarget2', 0.4, 3, "It's awesome target 2."));
p.addTarget(new TargetDetail('testTarget3', 0.5, 2, "It's awesome target 3."));

p.addTarget(new TargetDetail('testTarget4', 0.5, 2, "It's awesome target 4."));
p.addTarget(new TargetDetail('testTarget5', 0.5, 2, "It's awesome target 5."));
p.addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));
p.addTarget(new TargetDetail('testTarget7', 0.5, 2, "It's awesome target 7."));

// p.addTarget(new TargetDetail('testTarget4', 0.5, 2, "It's awesome target 4."));
// p.addTarget(new TargetDetail('testTarget5', 0.5, 2, "It's awesome target 5."));
// p.addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));
// p.addTarget(new TargetDetail('testTarget7', 0.5, 2, "It's awesome target 7."));

// p.addTarget(new TargetDetail('testTarget4', 0.5, 2, "It's awesome target 4."));
// p.addTarget(new TargetDetail('testTarget5', 0.5, 2, "It's awesome target 5."));
// p.addTarget(new TargetDetail('testTarget6', 0.5, 2, "It's awesome target 6."));
// p.addTarget(new TargetDetail('testTarget7', 0.5, 2, "It's awesome target 7."));

const gp = new Konva.Group();
gp.draggable = 'true';
gp.add(Dan);

let delta = 0;
p.getTargets.forEach((item, i) => {
  if (i !== 0 && i % 2 !== 0) {
    delta += 200;
  }
  console.log(Math.pow(-1, i) * delta);
  var itemTarget = createTarget({
    positionX: Dan.attrs.x + 150 + Math.pow(-1, i) * delta,
    positionY: Dan.attrs.y + 300 + 10 * p.getTargets.length,
    name: item.getName,
    remainingTime: item.getRemainingTime,
    genetalProgress: item.getGeneralProgress,
    description: item.getDescription,
  });
  drawLine(itemTarget.attrs.x, itemTarget.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100);
  itemTarget.on('xChange', (event) => {
    lineLayer.find('.link-line')[i].attrs.points = [itemTarget.attrs.x, itemTarget.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
    mainStage.add(lineLayer);
    mainStage.add(personLayer);
    mainStage.add(targetLayer);
  });
  Dan.on('xChange', (event) => {
    lineLayer.find('.link-line')[i].attrs.points = [itemTarget.attrs.x, itemTarget.attrs.y, Dan.attrs.x + 150, Dan.attrs.y + 100];
    mainStage.add(lineLayer);
    mainStage.add(personLayer);
    mainStage.add(targetLayer);
  });
  personLayer.add(Dan);
  targetLayer.add(itemTarget);
});


gp.on('mouseover')
const gpLayer = new Konva.Layer();
gpLayer.add(gp);

mainStage.add(gpLayer);

mainStage.add(lineLayer);
mainStage.add(personLayer);
mainStage.add(targetLayer);