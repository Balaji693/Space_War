
import { _decorator, Component, Node, Label, director,systemEvent, SystemEventType, macro, labelAssembler } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Label)
    scorelabel :Label;
    score:number = 0;
    lives : number = 3;
    @property(Label)
    lifelable : Label;
    @property(Label)
    yourscore:Label;
    @property(Label)
    Win:Label;
    @property(Label)
    Lose:Label;
    @property(Label)
    restart:Label;
    

     onLoad()
    {
        director.preloadScene("scene");
        systemEvent.on(SystemEventType.KEY_UP,this.keyup,this);
        
        
    }
    keyup(event)
    {
     
     
     if(this.lives <= 0 || this.score >= 4000)
     {
        let keycodes = event.keyCode;
        switch(keycodes)
        {
           case macro.KEY.enter:
               director.loadScene("scene");
               
           break;
          
        }
     }
     
        
        
    }
   
    addscore(): void
    {
        this.score += 100;
        this.scorelabel.string = "Score : " + this.score.toString();
    }
    lesslifes()
    {
       this.lives -= 1;
       this.lifelable.string = "x  " + this.lives.toString();
    }
    yourscores()
    {
        this.yourscore.string = "Your Score : " + this.score.toString(); 
    }
    winlabel()
    {
        this.Win.string = "You Win !!!";
    }
    loselabel()
    {
        this.Lose.string ="You Lose !!!" ;
    }
    restartlabel()
    {
        this.restart.string = "Press " + " Enter "  +" to restart ";
    }
    update(dt)
    {
        if(this.lives <= 0)
        {
            this.yourscores();
            this.loselabel();
            this. restartlabel();
             
         
          
            
         
        }
        if(this.score >= 4000)
        {
            this. winlabel();
            this.yourscores();
            this. restartlabel();
        }
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
