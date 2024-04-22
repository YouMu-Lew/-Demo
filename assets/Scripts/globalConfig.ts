
export const enum gridType {
    NONE = -1,
    NOT_SELECTED = 0,
    SELECTED = 1
};

export namespace globalConfig {
    // 棋盘大小
    export let boardSizeX: number = 5;
    export let boardSizeY: number = 5;

    export let targetData: Array<number>;    // 目标棋盘数据

    export let curData: Array<number>;     // 当前棋盘数据
    export let curClickType: gridType = gridType.SELECTED;
}