
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
    
<<<<<<< HEAD
        collider.off("onCollisionEnter", this.onCollisionEnter, this);  
         collider.on("onCollisionEnter", this.onCollisionEnter, this);
   }  
=======
        collider.off("onCollisionEnter", this.onCollisionEnter, this);
        
           
    
            collider.on("onCollisionEnter", this.onCollisionEnter, this);
   }

   
>>>>>>> 7ca326a686639cd7ca3f35de19dca531a41099a0
start(){
    
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

}

