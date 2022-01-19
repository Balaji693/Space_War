
import { _decorator, Component, Node, RigidBody2D,RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Testing')
export class Testing extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property
 rb:RigidBody;
    start () {
        // [3]
        
        
    }
     
    update(dt)
     
    {
        this.rb = this.node.getComponent(RigidBody);
        this.rb.applyLocalForce(new Vec3(0, 15000, -3000), new Vec3(0, 10000, 0));
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
