
import { _decorator, Component, Node, RigidBody2D, v2, ConstantForce, Collider2D, Contact2DType ,ICollisionEvent, RigidBody, Vec3, Collider, instantiate, Prefab} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')

export class Bullet extends Component {
    direction: number = 1;
   rb : RigidBody;
   @property(Prefab) public prefabs:Prefab = null;

    walkforce: number = 0;
    onLoad()
    {
        let rigidBody = this.node.getComponent(RigidBody) as RigidBody;
        let collider = this.node.getComponent(Collider)!;
    
        collider.off("onCollisionEnter", this.onCollisionEnter, this);  
         collider.on("onCollisionEnter", this.onCollisionEnter, this);
   }
    start () 
    {
      
        let rigidBody = this.node.getComponent(RigidBody) as RigidBody;
      let collider = this.node.getComponent(Collider)!;
      
    }
   
    onCollisionEnter (event: ICollisionEvent) {
  
    
        if (event.otherCollider.node.name !== 'bullet') {
            
         
          this.node.destroy();
          
         return;
      }
    
    }
    
       
    
     update(dt)
     
    {
        this.rb = this.node.getComponent(RigidBody);
        this.rb.applyLocalForce(new Vec3(0, 4000, -3000), new Vec3(0, 10000, 0));
    }
        
    // update (deltaTime: number) {
    //     // [4]
    // }
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
