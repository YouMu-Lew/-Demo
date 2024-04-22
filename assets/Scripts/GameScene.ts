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

    // board size
    // public xSize: number = 8;
    // public ySize: number = 8;
    // private boardSize = [globalConfig.boardSizeX, globalConfig.boardSizeY];

    // private targetData = new Array(globalConfig.boardSizeX * globalConfig.boardSizeY);    // 目标棋盘数据

    // private curData = new Array(globalConfig.boardSizeX * globalConfig.boardSizeY);       // 当前棋盘数据

    onLoad() {
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

    initBoard() {
        let oneWidth = this.board.width / globalConfig.boardSizeX;
        let oneHeight = this.board.height / globalConfig.boardSizeY;
        let i = 0, j = 0;
        for (; i < globalConfig.boardSizeX; i++) {
            j = 0;
            for (; j < globalConfig.boardSizeY; j++) {
                let og = cc.instantiate(this.oneGrid);
                og.setParent(this.board);
                // og.width = oneWidth;
                og.setContentSize(oneWidth, oneHeight);
                og.setPosition(i * oneWidth, -j * oneHeight);
                og.on(cc.Node.EventType.TOUCH_START, () => {
                    this.setOneGridInBoard(i, j, og.getComponent(oneGrid).getMyType());
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
        if (gt == gridType.NONE) {
            console.error("错误的类型设置");
            return;
        }
        globalConfig.curData[globalConfig.boardSizeX * y + x] = gt;
        console.log(globalConfig.curData);
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
}
