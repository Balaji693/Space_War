
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
    


}
    start(){
    let number = 10;
     let numbe2 = 10;
     let number3 = 10;
        let number6;
        let number7;
        let number8;
        let number 9;
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

