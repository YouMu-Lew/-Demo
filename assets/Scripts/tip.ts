import { globalConfig } from "./globalConfig";

const { ccclass, property } = cc._decorator;

const gc = globalConfig;

@ccclass
export default class Tip extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    // 存储代表自己的行列数，-1用于区别是列提示还是行提示
    x: number = -1;
    y: number = -1;

    // private myData: Array<number>;

    onLoad() {
        // if (this.x != -1)
        //     this.myData = new Array<number>(this.x);
        // else
        //     this.myData = new Array<number>(this.y);
    }

    start() {

    }

    init(x: number, y: number) {
        this.x = x;
        this.y = y;
        // this.refreshLabel();
        this.updateTip();
    }

    refreshLabel() {
        //TODO 不知道为何，执行后并无变化
        this.label.getComponent(cc.Widget).updateAlignment();
    }

    updateTip() {
        if (this.x == -1) {
            // 行提示
            let startIndex = this.y * gc.boardSizeX;
            let tipNums: number[] = [];
            let n = 0;//用于存储连续块的数量
            for (let i = 0; i < gc.boardSizeX; i++) {
                if (gc.targetData[startIndex] == 1)
                    n++;
                else if (n != 0) {
                    tipNums.push(n);
                    n = 0;
                }
                startIndex++;
            }
            if (n != 0)
                tipNums.push(n);
            if (tipNums.length == 0) {
                this.label.string = "0";
                return;
            }
            let str = "";
            tipNums.forEach((num) => {
                str += (num.toString() + " ");
            });
            this.label.string = str;
        }
    }
}
