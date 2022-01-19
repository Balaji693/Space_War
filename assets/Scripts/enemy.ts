
import { _decorator, Component, Node, RigidBody2D,v2, RigidBody, Vec3, director, Director, ColliderComponent, CircleCollider2D, Collider2D, Contact2DType, Collider, PhysicsSystem2D, IPhysics2DContact, Prefab, instantiate,ICollisionEvent, TiledObjectGroup, BoxCollider2D, AudioClip, AudioSource } from 'cc';
import { Game } from './game';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
rb : RigidBody;
@property(Prefab)
prefabs:Prefab = null;
@property(AudioSource)
audio:AudioSource = null;


    onLoad()
    {
      let rigidBody = this.node.getComponent(RigidBody) as RigidBody;
      let collider = this.node.getComponent(Collider)!;
      
  
      collider.off("onCollisionEnter", this.onCollisionEnter, this);
      
      
          collider.on("onCollisionEnter", this.onCollisionEnter, this);
       
    // this.rb =  this.node.getComponent(RigidBody2D);
   //
    //   this.direction = 1;
    //   this.velocity = 10;
     //  this.walkforce = 10;
   }
   start () 
   {
   
    
    
   }
  

   onCollisionEnter (event: ICollisionEvent) {
  
    
  if (event.otherCollider.node.name === 'bullet') {
   
  
    this.explosion();
   
   this.node.parent.getComponent(Game).addscore();

    this.node.destroy();
    

    
    
    
   return;
}
if(event.otherCollider.node.name === "playercollision")
{
  this.explosion();
 
  this.node.parent.getComponent(Game).lesslifes();
  
  this.node.destroy();
 
 
}



  }


  explosion()
  {
    this.audio.play();
   let explosionprefab = instantiate(this.prefabs);
    explosionprefab.parent = this.node.parent;
   explosionprefab.setPosition(this.node.position.x ,this.node.position.y);
   
  }

     update (dt)
   {
     // this.rb.applyForceToCenter(v2(0,-this.direction * this.walkforce),true);
         
       
    


   }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
