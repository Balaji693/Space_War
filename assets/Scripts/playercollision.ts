
import { _decorator, Component, Node, RigidBody2D,v2, RigidBody, Vec3, director, Director, ColliderComponent, CircleCollider2D, Collider2D, Contact2DType, Collider, PhysicsSystem2D, IPhysics2DContact, Prefab, instantiate,ICollisionEvent, TiledObjectGroup, BoxCollider2D } from 'cc';
import { Game } from './game';
const { ccclass, property } = _decorator;

@ccclass('Playercollision')
export class Playercollision extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    rb : RigidBody;
   

    onLoad()
    {
        this.node.position = this.node.parent.getWorldPosition();
      let rigidBody = this.node.getComponent(RigidBody) as RigidBody;
      let collider = this.node.getComponent(Collider)!;
  
     
       
    // this.rb =  this.node.getComponent(RigidBody2D);
   //
    //   this.direction = 1;
    //   this.velocity = 10;
     //  this.walkforce = 10;
   }
   start () 
   {
   
    
    
   }
 


update(dt)
     
{
      
    
    this.rb = this.node.getComponent(RigidBody);
    this.node.position = this.node.parent.getWorldPosition();
    
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
