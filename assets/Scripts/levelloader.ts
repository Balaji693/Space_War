
import { _decorator, Component, Node,SystemEventType, systemEvent, macro, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Levelloader')
export class Levelloader extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onLoad()
    {
     
     
      director.preloadScene("scene");
     
       systemEvent.on(SystemEventType.KEY_UP,this.keyup,this);
       
      
     
   }

     
      keyup(event)
      {
         let keycodes = event.keyCode;
        switch(keycodes)
        {
           case macro.KEY.enter:
            director.loadScene("scene");    
           break;
           case macro.KEY.r:
            director.loadScene("scene2");    
           break;
      
        }

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
