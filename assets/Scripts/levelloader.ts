
import { _decorator, Component, Node,SystemEventType, systemEvent, macro, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Levelloader')
export class Levelloader extends Component {


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


