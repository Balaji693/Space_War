
import { _decorator, Component, Node, MeshRenderer, color, Color, Toggle, RigidBody, director, Vec3, SliderComponent, Slider, ProgressBar, game, randomRange } from 'cc';
import { AIBatting } from './AIBatting';
import { AIBATTINGDIFFICULTY, SHOTTYPES } from './Enums';
import { LiteEvent } from './LiteEvent';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;


@ccclass('GameManager')
export class GameManager extends Component {


    @property(Node)
    targetMarker: Node;
    @property(Node)
    playerGameobject: Node;
    @property(Node)
    ballGameObject: Node;
    @property(Node)
    aiBallGameObject: Node;
    @property(Node)
    overTheWicketPosition: Node;
    @property(Node)
    aroundTheWicketPosition: Node;
    isMarkerSet: boolean;
    checkForAIMarkerSet: boolean;
    stumpsGameObjects: Node[] = [];
    @property(Node)
    aiPlayer: Node;
    private isMeterMet: boolean;
    isShotPlayed: boolean;
    isBallInRange: boolean;
    isShotMissed: boolean;
    private markerXPosition: number;
    private markerZPosition: number;
    @property(Node)
    hintNode: Node;


    private static bowlingMeter: LiteEvent<string> = new LiteEvent<string>();
    public static aiEnums: LiteEvent<AIBATTINGDIFFICULTY> = new LiteEvent<AIBATTINGDIFFICULTY>();
    public static batRelease: LiteEvent<string> = new LiteEvent<string>();
    public static resetShotPlayedBool: LiteEvent<string> = new LiteEvent<string>();
    public static setAIMarkerPosition: LiteEvent<string> = new LiteEvent<string>();
    public static disableBallObject: LiteEvent<string> = new LiteEvent<string>();
    public static activeBall: LiteEvent<string> = new LiteEvent<string>();
    public static aiActiveBall: LiteEvent<string> = new LiteEvent<string>();
    public static aiDisableBall: LiteEvent<string> = new LiteEvent<string>();
    private static instance: GameManager = null as any;
    public static get Instance(): GameManager {
        return GameManager.instance;
    }

    onLoad() {
        if (GameManager.instance == null) {
            GameManager.instance = this;
        }
        else {
            return;

        }
        this.isMarkerSet = false;
        this.checkForAIMarkerSet = false;
        this.isMeterMet = false;
        this.isShotPlayed = false;
        this.isBallInRange = false;
        this.isShotMissed = false;
        this.overTheWicketPosition.getPosition();

    }

    onEnable() {
        GameManager.bowlingMeter.on(this.bowlingMeter.bind(this));
        GameManager.batRelease.on(this.batRelease.bind(this));
        GameManager.resetShotPlayedBool.on(this.resetShotPlayedBool.bind(this));
        GameManager.setAIMarkerPosition.on(this.setAIMarkerPosition.bind(this));
        GameManager.disableBallObject.on(this.disableBallObject.bind(this));
        GameManager.activeBall.on(this.activeBall.bind(this));
        GameManager.aiActiveBall.on(this.aiActiveBall.bind(this));
        GameManager.aiDisableBall.on(this.aiDisableBallObject.bind(this));


    }
    onDisable() {
        GameManager.bowlingMeter.off(this.bowlingMeter.bind(this));
        GameManager.batRelease.off(this.batRelease.bind(this));
        GameManager.resetShotPlayedBool.off(this.resetShotPlayedBool.bind(this));
        GameManager.setAIMarkerPosition.off(this.setAIMarkerPosition.bind(this));
        GameManager.disableBallObject.off(this.disableBallObject.bind(this));
        GameManager.activeBall.off(this.activeBall.bind(this));
        GameManager.aiActiveBall.off(this.aiActiveBall.bind(this));
        GameManager.aiDisableBall.off(this.aiDisableBallObject.bind(this));
    }
    disableBallObject() {
        if (this.ballGameObject.active == true) {
            this.ballGameObject.active = false;
            this.ballGameObject.setPosition(this.overTheWicketPosition.position);
        }
    }
    setAIMarkerPosition() {
        this.markerXPosition = randomRange(-17, 3);
        this.markerZPosition = randomRange(-3, 40);
        this.targetMarker.position = new Vec3(this.markerXPosition, this.targetMarker.position.y, this.markerZPosition);

    }
    activeBall() {
        this.scheduleOnce(function () {
            this.ballGameObject.active = true;
        }, 2);
    }

    activeBallObject() {
        this.aiBallGameObject.active = true;
        this.isMarkerSet = true;

    }
    aiActiveBall() {
        if (this.aiBallGameObject.active == false) {
            this.aiBallGameObject.active = true;
        }

    }
    aiDisableBallObject() {
        this.scheduleOnce(function () {
            this.aiBallGameObject.active = false;
            this.isMarkerSet = false;
            this.aiBallGameObject.setPosition(this.overTheWicketPosition.position);
        }, 3);

    }

    resetShotPlayedBool() {
        this.isShotPlayed = false;
    }


    batRelease(gameState: SHOTTYPES) {

        if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) <= -9) {

            this.isBallInRange = false;
            UIManager.Instance.shotTypes.string = "Shot Missed";
            this.resetShotTypesText();
        }
        else if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) <= -3) {

            gameState = SHOTTYPES.EARLYSHOT;
            this.isShotPlayed = true;
            this.isBallInRange = true;
            UIManager.Instance.shotTypes.string = "Early Shot";
            this.resetShotTypesText();


        }
        else if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) <= -1) {

            gameState = SHOTTYPES.GOODSHOT;
            this.isShotPlayed = true;
            this.isBallInRange = true;
            UIManager.Instance.shotTypes.string = "Good Shot";
            this.resetShotTypesText();

        }
        else if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) <= 1) {

            gameState = SHOTTYPES.PERFECT;
            this.isShotPlayed = true;
            this.isBallInRange = true;
            UIManager.Instance.shotTypes.string = "Perfect Shot";
            this.resetShotTypesText();

        }

        else if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) <= 3) {

            gameState = SHOTTYPES.LATESHOT;
            this.isShotPlayed = true;
            this.isBallInRange = true;
            UIManager.Instance.shotTypes.string = "Late Shot";
            this.resetShotTypesText();

        }
        else if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) >= 4) {

            this.isBallInRange = false;
            UIManager.Instance.shotTypes.string = "Shot Missed";
            this.resetShotTypesText();

        }

        switch (gameState) {
            case SHOTTYPES.EARLYSHOT:
                console.log("Early working");
                break;
            case SHOTTYPES.GOODSHOT:
                console.log("Good working");
                break;
            case SHOTTYPES.PERFECT:
                console.log("Perfect working");
                break;
            case SHOTTYPES.LATESHOT:
                console.log("Late working");
                break;
            default:
                break;
        }
    }

    private resetShotTypesText() {
        this.scheduleOnce(function () {
            UIManager.Instance.shotTypes.string = "";
        }, 2);
    }


    private sliderPlayerMovement() {
        let playerPosition = this.playerGameobject.getPosition();
        playerPosition.x = -UIManager.Instance.sliderMovement.progress * 14;
        this.playerGameobject.setPosition(playerPosition);
        if (Math.round(GameManager.instance.playerGameobject.position.z - GameManager.Instance.ballGameObject.position.z) >= 50) {

            GameManager.setAIMarkerPosition.trigger();
            GameManager.disableBallObject.trigger();


        }
    }

    private bowlingMeter() {

        if (this.isMarkerSet == false) {
            if (UIManager.Instance.bowlingMeter.progress >= 1) {
                this.isMeterMet = true;
            }
            if (UIManager.Instance.bowlingMeter.progress <= 0.01) {
                this.isMeterMet = false;
            }
            if (this.isMeterMet == false) {
                UIManager.Instance.bowlingMeter.progress += 0.02;
            }
            if (this.isMeterMet == true) {
                UIManager.Instance.bowlingMeter.progress -= 0.02;
            }
        }


    }
    private aiMovement() {
        this.aiPlayer.setPosition(GameManager.Instance.targetMarker.position.x, this.aiPlayer.position.y, this.aiPlayer.position.z);
    }
    private bowlingMeterProgress() {
        UIManager.Instance.bowlingMeterProgressBar.progress = UIManager.Instance.bowlingMeter.progress;
    }


    update() {

        //   if (this.checkForAIMarkerSet == true) {
        //      this.ballGameObject.active = true;
        //   }
        this.sliderPlayerMovement();
        this.bowlingMeter();
        this.aiMovement();
        this.bowlingMeterProgress();
    }


}
