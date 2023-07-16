import InGamesTool from "./InGamesTool";

export default class Inventory{
    readonly _countTools: Map<string, number> = new Map();
    readonly _tools: Map<string, InGamesTool> = new Map();

    constructor(
        // readonly text: Phaser.GameObjects.Text,
    ){}

    addTool(tool: InGamesTool){

        tool.takeFrom(this);
        tool.removeCollide();

        let countTools = this._countTools.get(tool.name);
        const toolMap = this._tools.get(tool.name);

        if(!countTools || !toolMap){
            const distance = this._countTools.size;
            tool.coord = [400+distance*50, 650];
            tool.text = "1";
            tool.textPosition = [395+distance*50, 650-40];

            this._tools.set(tool.name, tool);
            this._countTools.set(tool.name, 1);

            return;
        }

        ++countTools;
        toolMap.text = `${countTools}`;
        tool.coord = toolMap.coord;
        this._countTools.set(tool.name, countTools);
    }
}