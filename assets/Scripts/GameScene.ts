import { globalConfig, gridType } from "./globalConfig";
import oneGrid from "./oneGrid";
import Tip from "./tip";

const { ccclass, property } = cc._decorator;

const gc = globalConfig;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Node)
    leftTips: cc.Node = null;

    @property(cc.Node)
    topTips: cc.Node = null;

    @property(cc.Prefab)
    oneGrid: cc.Prefab = null;

    @property(cc.Prefab)
    tipPrefab: cc.Prefab = null;

    @property(cc.Node)
    successNode: cc.Node = null;

    @property(cc.Node)
    toSeclectedNode: cc.Node = null;

    @property(cc.Node)
    toNotSeclectedNode: cc.Node = null;

    // board size
    // public xSize: number = 8;
    // public ySize: number = 8;
    // private boardSize = [globalConfig.boardSizeX, globalConfig.boardSizeY];

    // private targetData = new Array(globalConfig.boardSizeX * globalConfig.boardSizeY);    // 目标棋盘数据

    // private curData = new Array(globalConfig.boardSizeX * globalConfig.boardSizeY);       // 当前棋盘数据

    onLoad() {
        this.init();
        this.initBoardData();
        console.log(globalConfig.targetData);
        console.log(globalConfig.curData);
        globalConfig.boardSizeX = globalConfig.boardSizeX;
    }

    start() {
        this.initBoard();
        this.initTips();
    }

    // update (dt) {}

    protected onDestroy(): void {
        this.toSeclectedNode.off(cc.Node.EventType.TOUCH_START, this.toSec, this);
        this.toNotSeclectedNode.off(cc.Node.EventType.TOUCH_START, this.toNotSec, this);
    }

    init() {
        this.toSeclectedNode.on(cc.Node.EventType.TOUCH_START, this.toSec, this);
        this.toNotSeclectedNode.on(cc.Node.EventType.TOUCH_START, this.toNotSec, this);
    }

    toSec() {
        if (gc.curClickType == gridType.SELECTED)
            return;
        gc.curClickType = gridType.SELECTED;
        this.toSeclectedNode.opacity = 255;
        this.toNotSeclectedNode.opacity = 50;
    }

    toNotSec() {
        if (gc.curClickType == gridType.NOT_SELECTED)
            return;
        gc.curClickType = gridType.NOT_SELECTED;
        this.toSeclectedNode.opacity = 50;
        this.toNotSeclectedNode.opacity = 255;
    }

    initBoard() {
        let oneWidth = this.board.width / globalConfig.boardSizeX;
        let oneHeight = this.board.height / globalConfig.boardSizeY;
        let i = 0, j = 0;
        for (; i < globalConfig.boardSizeX; i++) {
            j = 0;
            for (; j < globalConfig.boardSizeY; j++) {
                let og = cc.instantiate(this.oneGrid);
                og.setParent(this.board);
                og.setContentSize(oneWidth, oneHeight);
                og.setPosition(i * oneWidth, -j * oneHeight);
                let com = og.getComponent(oneGrid);
                com.init(i, j);
                og.on(cc.Node.EventType.TOUCH_START, () => {
                    this.setOneGridInBoard(com.myX, com.myY, com.getMyType());
                }, this);
            }
        }
    }

    initBoardData() {
        // globalConfig.targetData = new Array<number>(globalConfig.boardSizeX * globalConfig.boardSizeY);
        globalConfig.targetData = [
            1, 1, 0, 0, 1,
            1, 1, 1, 1, 1,
            0, 0, 0, 1, 1,
            1, 1, 1, 0, 0,
            1, 0, 0, 1, 0
        ];
        globalConfig.curData = new Array<number>(globalConfig.boardSizeX * globalConfig.boardSizeY);
        for (let i = 0; i < globalConfig.targetData.length; i++) {
            globalConfig.curData[i] = 0;

            // if (Math.random() > 0.5)
            // globalConfig.targetData[i] = 1;
            // else
            // globalConfig.targetData[i] = 0;
        }
    }

    setOneGridInBoard(x: number, y: number, gt: gridType) {

        // if (gt == gridType.NONE)
        //     globalConfig.curData[globalConfig.boardSizeX * y + x] = 0;

        // else
        //     globalConfig.curData[globalConfig.boardSizeX * y + x] = gt;
        console.log(globalConfig.curData);
        this.isPass();
    }

    initTips() {
        for (let i = 0; i < globalConfig.boardSizeX; i++) {
            let tempTip = cc.instantiate(this.tipPrefab);
            this.topTips.addChild(tempTip);
            tempTip.getComponent(Tip).init(i, -1);
        }
        for (let j = 0; j < globalConfig.boardSizeY; j++) {
            let tempTip = cc.instantiate(this.tipPrefab);
            this.leftTips.addChild(tempTip);
            tempTip.getComponent(Tip).init(-1, j);
        }
    }

    // 是否过关
    isPass() {
        for (let i = 0; i < gc.targetData.length; i++) {
            if (gc.targetData[i] != gc.curData[i])
                return;
        }
        this.success();
    }

    success() {
        console.log("通关");
        this.successNode.active = true;
    }
}
