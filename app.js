const width  = 600,
      height = 600;

// module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;
      Constraint = Matter.Constraint;
      MouseConstraint = Matter.MouseConstraint;
      Mouse = Matter.Mouse;


// matterjs boilerplate: Engine, renderer and world
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: width,
        height: height
    }
});
const world = engine.world
const mouse = Mouse.create(render.canvas)

// Bodies and constraints
const center = Bodies.circle(height/2, width/2, 5, {isStatic: true});
const ballA = Bodies.circle(height/2, 100, 20, {density: 50});
const ballB = Bodies.circle(height/2, 300, 20, {density: 100});

const A2Center = Constraint.create({bodyA: center,
                                  bodyB: ballA,
                                  length: 200});

const A2B  = Constraint.create({bodyA: ballA,
                                bodyB: ballB,
                                length: 100})
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
