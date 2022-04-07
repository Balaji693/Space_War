
import { _decorator, Component, Node, ICollisionEvent, SphereCollider, Collider, ITriggerEvent, RigidBody, Vec3, math, quat, input, Input, EventMouse, v2, EventTouch, Collider2D, Contact2DType, IPhysics2DContact, find, clamp, Material, game, tween, director, random, randomRange } from 'cc';
import { GameManager } from './GameManager';
import { UIManager } from './UIManager';
import { LiteEvent } from './LiteEvent';
import { SHOTTYPES } from './Enums';

const { ccclass, property } = _decorator;

@ccclass('Collision')
export class Collision_ScreenInput extends Component {

    private rigidBody: RigidBody;
    private touchStartPosition: math.Vec2;
    private touchEndPosition: math.Vec2;
    private deltaPositions: math.Vec3;
    private isRelease: boolean;
    private isHitTheGround: boolean;
    private isOnEnable: boolean;
    private ballBowled: number = 1;
    private isSpinDelivery: boolean;
    //aiBowlingEasyLevel Values
    private easyLevelPaceDeliverySpeed: number;
    private easyLevelSpinDeliveryAngle: number;
    //aiBowlingMediumLevel Values
    private mediumLevelPaceDeliverySpeed: number;
    private mediumLevelSpinDeliveryAngle: number;
    //aiBowlingDifficultLevel Values
    private difficultLevelPaceDeliverySpeed: number;
    private difficultLevelSpinDeliveryAngle: number;


    onLoad() {
        let sphereCollider = this.getComponent(Collider);
        this.rigidBody = this.getComponent(RigidBody);
        sphereCollider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.deltaPositions = new Vec3();
        this.touchStartPosition = v2();
        this.touchEndPosition = v2();
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.isHitTheGround = false;
        this.isOnEnable = false;

    }
    onEnable() {
        this.isOnEnable = true;
        UIManager.Instance.ballBowled.string = "Ball Bowled : " + this.ballBowled.toString();
        GameManager.Instance.isShotPlayed = false;
        this.isSpinDelivery = Math.random() > 0.5;
        this.easyLevelPaceDeliverySpeed = Math.round(randomRange(100, 120));
        this.easyLevelSpinDeliveryAngle = Math.round(randomRange(4, 6));
        this.mediumLevelPaceDeliverySpeed = Math.round(randomRange(120, 140));
        this.mediumLevelSpinDeliveryAngle = Math.round(randomRange(6, 9));
        this.difficultLevelPaceDeliverySpeed = Math.round(randomRange(140, 160));
        this.difficultLevelSpinDeliveryAngle = Math.round(randomRange(8, 12));
    }
    onDisable() {

        this.isOnEnable = false;
        this.isHitTheGround = false;
        GameManager.resetShotPlayedBool.trigger();
        this.rigidBody.clearForces();
        this.rigidBody.clearVelocity();
        this.ballBowled++;
        GameManager.activeBall.trigger();

    }
    start() {

    }

    //onTouchStart Event
    private onTouchStart(event: EventTouch) {

        this.touchStartPosition = event.getLocation();            //Get screenposition when onTouchStart
        this.isRelease = false;
    }

    //onTouchEnd Event
    private onTouchEnd(event: EventTouch) {

        this.touchEndPosition = event.getLocation();             //Get screenposition when onTouchENd
        this.deltaPositions.x = (this.touchStartPosition.x - this.touchEndPosition.x);
        this.deltaPositions.y = (this.touchStartPosition.y - this.touchEndPosition.y);
        this.isRelease = true;
        this.scheduleOnce(function () {                         //Reset the "isRelease" bool and deltaPositions after the onTouchEnd Function
            this.resetBool();
        }, 1);
        if (this.isRelease == true) {
            GameManager.batRelease.trigger();
        }

        this.aiMarkerSetRandomPosition();
    }

    //onCollisionEvent
    private onCollisionEnter(event: ICollisionEvent) {
        this.isHitTheGround = true;

    }
    private aiMarkerSetRandomPosition() {                     //Randomize the market position after the shot played 
        if (GameManager.Instance.isShotPlayed == true) {
            this.scheduleOnce(function () {
                GameManager.setAIMarkerPosition.trigger();
                GameManager.disableBallObject.trigger();
            }, 5);
        }

    }
    private resetBool() {
        this.isRelease = false;
        this.deltaPositions.y = 0;
        this.deltaPositions.x = 0;

    }

    private aiBowlingEasyLevel() {
        if (this.isOnEnable == true) {
            if (this.isSpinDelivery == true) {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {
                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + this.easyLevelSpinDeliveryAngle, GameManager.Instance.playerGameobject.position.y + 0.2, -60));
                    }
                }
            }


            else {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {

                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.playerGameobject.position.y + 5, -this.easyLevelPaceDeliverySpeed));
                    }
                }

            }
        }
        else {
            return;
        }
    }
    private aiBowlingMediumLevel() {
        if (this.isOnEnable == true) {
            if (this.isSpinDelivery == true) {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {
                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + this.mediumLevelSpinDeliveryAngle, GameManager.Instance.playerGameobject.position.y + 0.2, -60));
                    }
                }

            }
            else {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {
                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.playerGameobject.position.y + 5, -this.mediumLevelPaceDeliverySpeed));
                    }
                }

            }
        }

    }
    private aiBowlingDifficultLevel() {
        if (this.isOnEnable == true) {
            if (this.isSpinDelivery == true) {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {
                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + this.difficultLevelSpinDeliveryAngle, GameManager.Instance.playerGameobject.position.y + 0.2, -60));
                    }
                }
            }
            else {
                if (GameManager.Instance.isShotPlayed == false) {
                    if (this.isHitTheGround == false) {
                        this.rigidBody.applyLocalForce(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x + 2, GameManager.Instance.targetMarker.position.y - 2, GameManager.Instance.targetMarker.position.z - this.node.position.z - 15 * 2));
                    }
                    if (this.isHitTheGround == true) {
                        this.rigidBody.setLinearVelocity(new Vec3(GameManager.Instance.targetMarker.position.x - this.node.position.x, GameManager.Instance.playerGameobject.position.y + 5, -this.difficultLevelPaceDeliverySpeed));
                    }
                }
            }
        }

    }
    private playShot() {
        if (GameManager.Instance.isBallInRange == true) {
            if (this.isRelease == true) {
                if (this.deltaPositions.y > 0) {
                    this.rigidBody.setLinearVelocity(new Vec3(-this.deltaPositions.x / 10, this.deltaPositions.y / 15, this.deltaPositions.y / 5));  //ball travels towards the angle
                }
            }

        }
    }

    update(dt) {

        if (UIManager.Instance.aiBowlingEasyLevel.isChecked == true) {
            this.aiBowlingEasyLevel();

        }
        else if (UIManager.Instance.aiBowlingMediumLevel.isChecked == true) {
            this.aiBowlingMediumLevel();
        }
        else if (UIManager.Instance.aiBowlingDifficultLevel.isChecked == true) {
            this.aiBowlingDifficultLevel();
        }

        this.playShot();
    }

}







