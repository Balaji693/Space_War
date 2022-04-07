
import { _decorator, Component, Node, Input, input, EventTouch, Vec3, math, randomRange } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('MarkerMovement')
export class MarkerMovement extends Component {

    private positionX: number;
    private positionY: number;
    private ballMarkerSpeed: number = 0.05;
    @property(Node)
    private ballMarker: Node;
    private isMarkerSet: boolean;
    private markerXPosition: number;
    private markerZPosition: number;

    onLoad() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.isMarkerSet = false;
        this.markerXPosition = randomRange(-11, 10);
        this.markerZPosition = randomRange(-3, 40);
    }

    onTouchMove(event: EventTouch) {                               //OntouchMove event
        if (this.isMarkerSet == false) {
            let getTouch = event.getTouches();
            let touchOne = getTouch[0];
            let deltaPositions = touchOne.getDelta();
            this.positionX = deltaPositions.x;
            this.positionY = deltaPositions.y;
            let markerPosition = this.ballMarker.getPosition();
            markerPosition.x = markerPosition.x + this.positionX * this.ballMarkerSpeed;
            markerPosition.z = markerPosition.z - this.positionY * this.ballMarkerSpeed;
            this.ballMarker.setPosition(markerPosition);          //Move the ballMarker
        }
        else {
            return;
        }

    }
    private clampMarkerPosition() {
        this.ballMarker.position = new Vec3(math.clamp(this.ballMarker.position.x, -11, 10), this.ballMarker.position.y, math.clamp(this.ballMarker.position.z, -3, 40));
    }
    private checkForMarkerSet() {                                  //Set "isMarkerSet = true" When Bowl Button is Pressed
        this.isMarkerSet = true;
        if (this.isMarkerSet == true) {
            this.scheduleOnce(function () {
                this.isMarkerSet = false;
            }, 5);
        }
        else {
            return;
        }

    }
    update() {
        this.clampMarkerPosition();                                // Clamp the marker Positions                            

    }
}

