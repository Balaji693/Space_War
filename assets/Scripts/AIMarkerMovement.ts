
import { _decorator, Component, Node, randomRange, Vec3, math, game } from 'cc';
import { GameManager } from './GameManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;


@ccclass('AIMarkerMovement')
export class AIMarkerMovement extends Component {

    private isShow: boolean;
    onLoad() {

    }
    onEnable() {

    }
    start() {
        this.scheduleOnce(function () {
            this.checkForMarkerSet();
        }, 3);
        GameManager.setAIMarkerPosition.trigger();

    }
    private clampMarkerPosition() {
        this.node.position = new Vec3(math.clamp(this.node.position.x, -11, 10), this.node.position.y, math.clamp(this.node.position.z, 9.5, 40));
    }
    private checkForMarkerSet() {                                  //Set "isMarkerSet = true" When Bowl Button is Pressed
        GameManager.Instance.checkForAIMarkerSet = true;
    }

    update() {
        this.clampMarkerPosition();
    }


}

