
import { _decorator, Component, Node, director, Input, __private, input, EventKeyboard, KeyCode, Asset } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('NewComponent')
export class NewComponent extends Component {


    onLoad() {

        director.preloadScene("AI Batting");
        director.preloadScene("AI Bowling");
        director.preloadScene("Menu");
    }

    public battingSceneLoader() {
        console.log("Pressed the BattingScene Button");
        director.loadScene("AI Bowling");
    }
    public bowlingSceneLoader() {
        console.log("Pressed the BowlingScene Button");
        director.loadScene("AI Batting");
    }
    public homeSceneLoader() {
        director.loadScene("Menu");
    }
    public restartBowlingScene() {
        director.loadScene("AI Bowling");
    }

    update() {


    }

}

