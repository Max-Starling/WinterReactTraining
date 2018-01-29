import Konva from "konva";

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