
import { _decorator, Component, Node, Toggle, Slider, ProgressBar, director, Label } from 'cc';
import { GameManager } from './GameManager';
import { LiteEvent } from './LiteEvent';
const { ccclass, property } = _decorator;



@ccclass('UIManager')
export class UIManager extends Component {


    @property(Toggle)
    fastDeliveryToggle: Toggle = null;
    @property(Toggle)
    spinDeliveryToggle: Toggle = null;
    @property(Slider)
    sliderMovement: Slider;
    @property(ProgressBar)
    bowlingMeter: ProgressBar = null;
    @property(Slider)
    bowlingMeterProgressBar: Slider = null;
    @property(Toggle)
    aiBattingEasyLevelToggle: Toggle = null;
    @property(Toggle)
    aiBattingMediumLevelToggle: Toggle = null;
    @property(Toggle)
    aiBattingDifficultLevelToggle: Toggle = null;
    @property(Toggle)
    aiBowlingEasyLevel: Toggle = null;
    @property(Toggle)
    aiBowlingMediumLevel: Toggle = null;
    @property(Toggle)
    aiBowlingDifficultLevel: Toggle = null;
    @property (Label)
    ballBowled : Label;
    @property(Label)
    playerBallBowled : Label;
    @property(Label)
    shotTypes : Label;

    private static instance: UIManager = null as any;
    public static get Instance(): UIManager {
        return UIManager.instance;
    }

    onLoad() {
        if (UIManager.instance == null) {
            UIManager.instance = this;
        }
        else {
            return;
        }
       


    }
}


