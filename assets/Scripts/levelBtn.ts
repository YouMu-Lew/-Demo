// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class levelBtn extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    setIcon(sf: cc.SpriteFrame) {
        this.icon.spriteFrame = sf;
    }

    getIcon() {
        return this.icon.spriteFrame;
    }

    parseJson(jsonAsset: cc.JsonAsset) {
        // jsonAsset.json.string
        let str = jsonAsset.toString();
        console.log(str);
    }
}
