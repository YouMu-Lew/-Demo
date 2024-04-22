import { globalConfig } from "./globalConfig";
import levelBtn from "./levelBtn";

const { ccclass, property } = cc._decorator;

const filePrefix = "101_";

@ccclass
export default class LevelsMap extends cc.Component {

    @property(cc.Node)
    levelBtns: cc.Node = null;

    @property(cc.Node)
    info: cc.Node = null;

    @property(cc.Label)
    infoLabel: cc.Label = null;

    @property(cc.Prefab)
    levelBtnPrefab: cc.Prefab = null;

    onLoad() {
        this.info.active = false;
    }

    start() {
        this.initLevelsBtns();
    }

    initLevelsBtns() {
        let i: number = 0;
        // let pic: cc.SpriteFrame = null;
        // let json: cc.JsonAsset = null;
        let fileName = "";
        let btnNode = null;
        while (i < 105) {
            fileName = filePrefix + i.toString();
            btnNode = cc.instantiate(this.levelBtnPrefab);
            btnNode.getComponent(levelBtn).init(fileName);

            // if (btnNode.getComponent(levelBtn).getIcon() == null) {
            //     console.error("读取图片失败：" + fileName);
            //     break;
            // }
            // if (json == null) {
            //     console.error("读取json失败：" + fileName);
            //     break;
            // }
            // this.levelBtns.addChild(btnNode);
            btnNode.setParent(this.levelBtns);
            btnNode.on(cc.Node.EventType.TOUCH_END, this.showInfo, this);

            // console.log("成功加载图片和json资源：" + fileName);

            i++;
        }
    }

    // update (dt) {}

    showInfo() {
        this.info.active = true;
        this.infoLabel.string = globalConfig.boardSizeX.toString();
    }

    onBackBtn() {
        this.info.active = false;
    }

    onStartBtn() {
        cc.director.loadScene("GameScene");
    }
}
