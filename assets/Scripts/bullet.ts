
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


>>>>>>> master
=======
        let number6;
<<<<<<< HEAD
>>>>>>> 52d2876ffdd3283b0c40fafa28a428cb20996f8a
=======
        let number7;
<<<<<<< HEAD
        let changes;
>>>>>>> eba31dc1e8434c657e7bee5e7ea32dbc5a0ea321
=======
        let number8;
<<<<<<< HEAD
>>>>>>> c7cb844a784cb500040794d08fd39f93b8421987
=======
        let number 9;
<<<<<<< HEAD
>>>>>>> 0030c98242801428902353d2e77ef338b73f8120
=======
        let numbr 10;
>>>>>>> e44b492af297774e047a85696663fd8c02c25bcd
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

