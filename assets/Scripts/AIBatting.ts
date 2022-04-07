
import { _decorator, Component, Node, Vec2, math, Vec3, randomRange, RigidBody, ITriggerEvent, ICollisionEvent, Collider, Toggle, Enum, Game } from 'cc';
import { GameManager } from './GameManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;


@ccclass('AIBatting')
export class AIBatting extends Component {

    private rigidBody: RigidBody;
    private isRelease: boolean;
    private isHitTheGround: boolean;
    private isColliderWithSphere: boolean;
    //AI DifficultLevel
    private aiDifficultyLevel: number[] = [];
    private randomDifficultyLevelIndex: number;
    private randomDifficultLevelYPosition: number;
    //AI MediumLevel
    private aiMediumLevel: number[] = [];
    private randomMediumLevelIndex: number;
    private randomMediumLevelYPosition: number;
    //AI Easy Level
    private aiEasyLevel: number[] = [];
    private randomEasyLevelIndex: number;
    private randomEasyLevelYPosition: number;
    //Bowling Speed
    private paceDeliverySpeed: number;
    private spinDeliveryAngle: number;

    private ballBowled: number = 0;


    onLoad() {
        let sphereCollider = this.getComponent(Collider);
        this.rigidBody = this.getComponent(RigidBody);
        sphereCollider.on('onTriggerStay', this.onTriggerEnter, this);
        sphereCollider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.isHitTheGround = false;
        this.isColliderWithSphere = false;

    }
    onEnable() {
        //AI EasyLevel Values
        this.aiEasyLevel[0] = randomRange(1, 300);
        this.aiEasyLevel[1] = randomRange(-1, -300);
        this.aiEasyLevel[2] = randomRange(1, 400);
        this.aiEasyLevel[3] = randomRange(-1, -400);
        this.aiEasyLevel[4] = randomRange(1, 500);
        this.aiEasyLevel[5] = randomRange(-1, -500);
        this.randomEasyLevelIndex = Math.round(randomRange(0, 5));
        this.randomEasyLevelYPosition = randomRange(100, 600);
        //AI MediumLevel Values
        this.aiMediumLevel[0] = randomRange(1, 600);
        this.aiMediumLevel[1] = randomRange(-1, -600);
        this.aiMediumLevel[2] = randomRange(1, 700);
        this.aiMediumLevel[3] = randomRange(-1, -700);
        this.randomMediumLevelIndex = Math.round(randomRange(0, 3));
        this.randomMediumLevelYPosition = randomRange(100, 700);
        //AI DifficultLevel Values
        this.aiDifficultyLevel[0] = randomRange(300, 700);
        this.aiDifficultyLevel[1] = randomRange(-300, -700);
        this.randomDifficultyLevelIndex = Math.round(randomRange(0, 1));
        this.randomDifficultLevelYPosition = randomRange(100, 700);

        this.ballBowled++;
        UIManager.Instance.playerBallBowled.string = "Ball Bowled : " + this.ballBowled.toString();
    }
    onDisable() {
        this.rigidBody.clearForces();
        this.rigidBody.clearVelocity();
        this.isColliderWithSphere = false;
        this.isRelease = false;
        this.isHitTheGround = false;
    }
    start() {

        this.calculatingPaceDeliverySpeed();
        this.calculatingSpinAngle();
    }

    //onTriggerEvent
    private onTriggerEnter(event: ITriggerEvent) {
        //// AI Batting Mechanics 
        if (event.otherCollider.node.name == "AIPlayer") {
            this.isColliderWithSphere = true;
            this.isRelease = true;
            GameManager.aiDisableBall.trigger();
            if (UIManager.Instance.aiBattingEasyLevelToggle.isChecked == true) {
                this.easyLevel();
            }
            else if (UIManager.Instance.aiBattingMediumLevelToggle.isChecked == true) {
                this.mediumLevel();
            }
            else if (UIManager.Instance.aiBattingDifficultLevelToggle.isChecked == true) {
                this.difficultLevel();
            }

        }
        else {
            return;
        }
    }

    //onCollisionEvent
    private onCollisionEnter(event: ICollisionEvent) {
        this.isHitTheGround = true;

    }
    private resetBool() {
        this.isRelease = false;
    }
    //Fast Delivery Inputs
    private fastDelivery() {
        if (this.isColliderWithSphere == false) {
            if (this.isHitTheGround == false) {
                this.rigidBody.applyForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));

            }
            if (this.isHitTheGround == true) {
                this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.playerGameobject.position.y + 5, -this.paceDeliverySpeed));
            }
        }
    }
    //Spin Delivery Inputs
    private spinDelivery() {
        if (this.isColliderWithSphere == false) {
            if (this.isHitTheGround == false) {
                this.rigidBody.applyForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.targetMarker.position.y, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15));
            }
            if (this.isHitTheGround == true) {
                this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + this.spinDeliveryAngle, GameManager.Instance.playerGameobject.position.y + 0.5, -60));
            }
        }
    }
    //Calculating Speed Of The PaceDelivery
    private calculatingPaceDeliverySpeed() {
        if (UIManager.Instance.bowlingMeter.progress < 0.2) {
            this.paceDeliverySpeed = 100;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.4) {
            this.paceDeliverySpeed = 110;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.6) {
            this.paceDeliverySpeed = 120;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.7) {
            this.paceDeliverySpeed = 130;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.8) {
            this.paceDeliverySpeed = 140;
        }
        else if (UIManager.Instance.bowlingMeter.progress > 0.8) {
            this.paceDeliverySpeed = 150;

        }
    }
    //Calculating Angle Of The SpinDelivery
    private calculatingSpinAngle() {
        if (UIManager.Instance.bowlingMeter.progress < 0.2) {
            this.spinDeliveryAngle = 4;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.4) {
            this.spinDeliveryAngle = 6;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.6) {
            this.spinDeliveryAngle = 8;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.7) {
            this.spinDeliveryAngle = 9;
        }
        else if (UIManager.Instance.bowlingMeter.progress < 0.8) {
            this.spinDeliveryAngle = 10;
        }
        else if (UIManager.Instance.bowlingMeter.progress > 0.8) {
            this.spinDeliveryAngle = 10;
        }
    }
    //AI Batting Inputs For EasyLevel
    private easyLevel() {
        this.rigidBody.setLinearVelocity(new Vec3(-this.aiEasyLevel[this.randomEasyLevelIndex] / 13, this.randomEasyLevelYPosition / 18, this.randomEasyLevelYPosition / 7));
    }
    //AI Batting Inputs For MediumLevel
    private mediumLevel() {
        this.rigidBody.setLinearVelocity(new Vec3(-this.aiMediumLevel[this.randomMediumLevelIndex] / 12, this.randomMediumLevelYPosition / 17, this.randomMediumLevelYPosition / 6));
    }
    //AI Batting Inputs For DifficultLevel
    private difficultLevel() {

        this.rigidBody.setLinearVelocity(new Vec3(-this.aiDifficultyLevel[this.randomDifficultyLevelIndex] / 10, this.randomDifficultLevelYPosition / 15, this.randomDifficultLevelYPosition / 5));
    }
    private resetBallPositionWhenGoesBehindTheBatsman() {
        if (this.node.position.z <= -30) {
            GameManager.aiDisableBall.trigger();
        }
    }

    update(dt) {

        if (UIManager.Instance.fastDeliveryToggle.isChecked) {
            this.fastDelivery();
        }
        if (UIManager.Instance.spinDeliveryToggle.isChecked) {
            this.spinDelivery();

        }
        this.calculatingPaceDeliverySpeed();
        this.calculatingSpinAngle();
        this.resetBallPositionWhenGoesBehindTheBatsman();




    }


}
