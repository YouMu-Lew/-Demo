import { gridType } from "./globalConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class oneGrid extends cc.Component {

    @property(cc.Sprite)
    mySprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    selectedFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    notSelectedFrame: cc.SpriteFrame = null;

    private myType = gridType.NONE

    myX: number = 0;
    myY: number = 0;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.onClick(gridType.SELECTED);
        }, this);
        //TODO 手指按住滑动，实现多个连续点击的效果
    }

    start() {

    }

    init(x: number, y: number) {
        this.myX = x;
        this.myY = y;
    }

    onClick(clickType: gridType) {
        if (this.myType == gridType.NONE)
            this.setMyType(clickType);
        else if (this.myType == clickType)
            this.setMyType(gridType.NONE);
    }

    private setMyType(gt: gridType) {
        this.myType = gt;
        if (gt == gridType.SELECTED)
            this.mySprite.spriteFrame = this.selectedFrame;
        else if (gt == gridType.NOT_SELECTED)
            this.mySprite.spriteFrame = this.notSelectedFrame;
        else
            this.mySprite.spriteFrame = null;
    }

    public getMyType() {
        return this.myType;
    }

}
