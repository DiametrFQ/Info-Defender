import InGamesTool from "./InGamesTool";

export default class Inventory {
  readonly _countTools: Map<string, number> = new Map();
  readonly _tools: Map<string, InGamesTool> = new Map();

  // constructor(
  //     readonly text: Phaser.GameObjects.Text,
  // ){}

  addTool(tool: InGamesTool) {
    tool.takeFrom(this);
    tool.removeCollide();

    let countTools = this._countTools.get(tool.name);
    const toolMap = this._tools.get(tool.name);

    if (!countTools || !toolMap) {
      const distance = this._countTools.size;
      const x = 600;
      const y = 900;

      tool.coord = [x + distance * 100, y];
      tool.text = "1";
      tool.textPosition = [x - 5 + distance * 100, y - 40];

      this._tools.set(tool.name, tool);
      this._countTools.set(tool.name, 1);

      return;
    }

    ++countTools;
    toolMap.text = `${countTools}`;
    tool.coord = toolMap.coord;
    this._countTools.set(tool.name, countTools);
  }

  removeTool(tool: InGamesTool) {
    let countTools = this._countTools.get(tool.name);
    const toolMap = this._tools.get(tool.name);

    // if (!countTools || !toolMap) {
    //   const distance = this._countTools.size;
    //   const x = 600;
    //   const y = 900;

    //   tool.coord = [x + distance * 100, y];
    //   tool.text = "1";
    //   tool.textPosition = [x - 5 + distance * 100, y - 40];

    //   this._tools.set(tool.name, tool);
    //   this._countTools.set(tool.name, 1);

    //   return;
    // }

    // --countTools;
    // toolMap.text = `${countTools}`;
    // tool.coord = toolMap.coord;
    // this._countTools.set(tool.name, countTools);

    if (!countTools || !toolMap) {
      return;
    }
    --countTools;
    if (countTools) {
      toolMap.text = `${countTools}`;
      return;
    }

    toolMap.text = ``;
    tool.destroy();
    this._tools.delete(tool.name);
    this._countTools.delete(tool.name);
    this._countTools.set(tool.name, countTools);
  }
}
