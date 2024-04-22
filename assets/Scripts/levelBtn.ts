// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { globalConfig } from "./globalConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class levelBtn extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    private _name = "";

    private boardSize: number = 0;
    private data: number[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.once(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    start() {

    }

    // update (dt) {}

    init(name: string) {
        this._name = name;

        cc.resources.load("imgs_101/" + name, cc.SpriteFrame, (err, sf) => {
            // btnNode.getComponent(cc.Sprite).SpriteFrame = sf;
            this.setIcon(sf);
        });

        cc.resources.load("config/imps_101/" + name, (err, jsonAsset: cc.JsonAsset) => {
            // json = jsonAsset;
            this.parseJson(jsonAsset);
            // console.log(jsonAsset.json.id);
        });
    }

    setIcon(sf: cc.SpriteFrame) {
        this.icon.spriteFrame = sf;
    }

    parseJson(jsonAsset: cc.JsonAsset) {
        // jsonAsset.json.string
        this.boardSize = jsonAsset.json.size;
        this.data = jsonAsset.json.data;
    }

    onClick() {
        globalConfig.boardSizeX = this.boardSize;
        globalConfig.boardSizeY = this.boardSize;
        globalConfig.targetData = this.data;
        // cc.director.loadScene("GameScene");
    }
}
