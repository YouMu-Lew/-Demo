import levelBtn from "./levelBtn";

const { ccclass, property } = cc._decorator;

const filePrefix = "101_";

@ccclass
export default class LevelsMap extends cc.Component {

    @property(cc.Node)
    levelBtns: cc.Node = null;

    @property(cc.Prefab)
    levelBtnPrefab: cc.Prefab = null;

    onLoad() { }

    start() {
        this.initLevelsBtns();
    }

    initLevelsBtns() {
        let i: number = 0;
        let pic: cc.SpriteFrame = null;
        let json: cc.JsonAsset = null;
        let fileName = "";
        let path = "";
        let btnNode = null;
        while (i < 105) {
            fileName = filePrefix + i.toString();
            path = "imgs_101/" + fileName;
            btnNode = cc.instantiate(this.levelBtnPrefab);

            cc.resources.load(path, cc.SpriteFrame, (err, sf) => {
                // btnNode.getComponent(cc.Sprite).SpriteFrame = sf;
                btnNode.getComponent(levelBtn).setIcon(sf);
            });

            cc.resources.load("config/imps_101/" + fileName, (err, jsonAsset: cc.JsonAsset) => {
                // json = jsonAsset;
                btnNode.getComponent(levelBtn).parseJson(jsonAsset);
                // console.log(jsonAsset);
            });

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

            console.log("成功加载图片和json资源：" + fileName);

            i++;
        }
    }

    // update (dt) {}
}
