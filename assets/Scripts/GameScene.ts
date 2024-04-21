import { gridType } from "./globalConfig";
import oneGrid from "./oneGrid";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Prefab)
    oneGrid: cc.Prefab = null;

    // board size
    private x: number = 8;
    private y: number = 8;
    private boardSize = [this.x, this.y];

    private targetData = new Array(this.x * this.y);    // 目标棋盘数据

    private curData = new Array(this.x * this.y);       // 当前棋盘数据

    onLoad() { }

    start() {
        this.initBoard();
    }

    // update (dt) {}

    initBoard() {
        let oneWidth = this.board.width / this.x;
        let oneHeight = this.board.height / this.y;
        let i = 0, j = 0;
        for (; i < this.x; i++) {
            j = 0;
            for (; j < this.y; j++) {
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
        this.initBoardData();
        console.log(this.targetData);
    }

    initBoardData() {
        for (let i = 0; i < this.targetData.length; i++) {
            if (Math.random() > 0.5)
                this.targetData[i] = 1;
            else
                this.targetData[i] = 0;
        }
    }

    setOneGridInBoard(x: number, y: number, gt: gridType) {
        if (gt == gridType.NONE) {
            console.error("错误的类型设置");
            return;
        }
        this.curData[this.x * y + x] = gt;
    }
}
