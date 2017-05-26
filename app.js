'use strict'

const w = 600,
      h = 600;

// module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse;

const stageElement = $('#stage')[0];

// matterjs boilerplate: Engine, renderer and world
const engine = Engine.create({
    gravity: 1
});
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: w,
        height: h
    }
});
const world = engine.world
const mouse = Mouse.create(render.canvas)

// Bodies and constraints
const center = Bodies.circle(h/2, w/2, 0, {isStatic: true});
const ballA = Bodies.circle(h/2, 100, 20, {density: 50});
const ballB = Bodies.circle(h/2, 300, 20, {density: 50});

const A2Center = Constraint.create({bodyA: center,
                                    bodyB: ballA,
                                    length: 100,
                                    stiffness: 1});

const A2B  = Constraint.create({bodyA: ballA,
                                bodyB: ballB,
                                length: 100,
                                stiffness: 1})
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
                                


World.add(world, [center, ballA, ballB, A2Center, A2B, mouseConstraint]);
// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
