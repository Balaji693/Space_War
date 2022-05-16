import { _decorator, Component, Vec3, systemEvent, SystemEvent, EventMouse, Animation, SystemEventType, EventKeyboard, macro, math, Vec2, Node, RigidBody2D, v2, RigidBody, Prefab, instantiate, game, Game, director } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('Player')
export class Player extends Component {
  left: boolean;
  @property
  xspeed: number = 1000;
  @property(Number)public   accce: number = 10;

  @property(Number) public maxmovement: number = 50;
  
  @property
  x: Vec3;
  @property(Node) public playernode: Node = null;

  @property(Prefab) public bullet: Prefab = null;



  direction: number;
  right: boolean;
  velocity: number;
  @property(Number) public walkforce: number = 0;

  rb: RigidBody2D;
  bulletbtn: boolean;




  onLoad() {


    this.node.position = new Vec3(-21, -244, 0);
    systemEvent.on(SystemEventType.KEY_DOWN, this.keydown, this);
    systemEvent.on(SystemEventType.KEY_UP, this.keyup, this);


    this.rb = this.node.getComponent(RigidBody2D);

    this.direction = 0;
    this.velocity = 10;
    this.walkforce = 20;
  }


  keydown(event) {
    let keycodes = event.keyCode;
    switch (keycodes) {
      case macro.KEY.left:
        this.direction = -1;
        this.rb.wakeUp();
        break;
      case macro.KEY.right:
        this.rb.wakeUp();
        this.direction = 1;
        break;
    }

  }
  keyup(event) {
    let keycodes = event.keyCode;
    switch (keycodes) {


      case macro.KEY.left:
        this.direction = 0;

        this.rb.sleep();
        break;
      case macro.KEY.right:

        this.rb.sleep();

        this.direction = 0;
        this.velocity = 10;
        this.walkforce = 20;
    }
 
      
       this.keydown(event)
       {
          let keycodes = event.keyCode;
         switch(keycodes)
         {
            case macro.KEY.left:
                this.direction = -1;
               this.rb.wakeUp();   
            break;
            case macro.KEY.right:
                this.rb.wakeUp();
            this.direction = 1;
            break;
         }

       } 
       this.keyup(event)
       {
        let keycodes = event.keyCode;
        switch(keycodes)
        {


          case macro.KEY.left:
            this.direction = 0;
           
          this.rb.sleep();   
            break;
          case macro.KEY.right:
           
            this.rb.sleep();
            
           this.direction = 0;
           break;
           case macro.KEY.space:
           this.bulletthrow();
           break;
           
        }
           
           
       }
       this.bulletthrow()
       {
        
          let bulletprefab = instantiate(this.bullet);
          bulletprefab.parent = this.node.parent;
          bulletprefab.setPosition(this.node.position.x ,this.node.position.y + 60);
          
          let bulletprefab02 = instantiate(this.bullet);
          bulletprefab02.parent = this.node.parent;
          bulletprefab02.setPosition(this.node.position.x ,this.node.position.y + 120);
          
        
       }

    
       
      
       this.update(dt) 
         {
           
          
          this.rb = this.node.getComponent(RigidBody2D);
             
             if((this.direction > 0 && this.rb.linearVelocity.x < this.velocity)||
              (this.direction < 0 && this.rb.linearVelocity.x > -this.velocity))
              {
                 
                this.rb.applyForceToCenter(v2(this.direction * this.walkforce,0),true);
             
              }
              
              
              if(this.node.position.x > 400)
              {
                this.node.position = new Vec3(400,-244,0);
                  
              }
              if(this.node.position.x < -400)
              {
                this.node.position = new Vec3(-400,-244,0);
                  
              }
            
         }
        
   
}  
