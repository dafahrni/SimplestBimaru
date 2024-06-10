import { GameModel } from "../models/game-model.js";
import { DtoFactory } from "./dtos/dto-factory.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { Configuration } from "../models/board/configuration.js";
import { RepoFactory } from "../models/repos/repo-factory.js";
export class GameApi {
    constructor(model, repoFactory) {
        this.model = model ? model : new GameModel();
        this.repoFactory = repoFactory ? repoFactory : new RepoFactory();
        this.configs = this.repoFactory.configs;
    }
    // TODO: remove these lines
    applySomeMoves() {
        this.model.fillLineWithWater(0);
        this.model.fillLineWithWater(2);
        this.model.fillLineWithWater(4);
        this.model.fillLineWithWater(6);
        this.model.setCell(3, "<");
        this.model.setCell(4, "□");
        this.model.setCell(5, ">");
        this.model.setCell(10, "~");
    }
    editConfig(size) {
        const field = FieldFactory.from(size, size);
        const config = Configuration.extract(field, false);
        this.model = new GameModel(config, -1);
    }
    saveConfig() {
        const config = this.model.extractConfig();
        this.configs.add(config);
    }
    selectConfig() {
        const config = this.model.getConfig();
        this.model = new GameModel(config);
    }
    selectNextConfig() {
        const length = this.configs.length;
        let index = this.model.getConfigIndex() + 1;
        index = index >= 0 && index < length ? index : 0;
        const config = this.configs.get(index);
        this.model = new GameModel(config, index);
    }
    getGame() {
        return DtoFactory.mapGame(this.model);
    }
    getLabels() {
        const labels = this.model.getLabels();
        return DtoFactory.mapLabels(labels);
    }
    getShips() {
        const statistics = this.model.getUpdatedStatistics();
        return DtoFactory.mapShips(statistics.getShipSets());
    }
    getCell(index) {
        let cell = this.model.getCell(index);
        return DtoFactory.mapCell(cell);
    }
    setCell(index, symbol) {
        this.model.setCell(index, symbol);
    }
    changeCell(index) {
        return this.model.changeCell(index);
    }
    checkForWinner() {
        return this.model.checkForWinner();
    }
    fillLineWithWater(index) {
        this.model.fillLineWithWater(index);
    }
    increaseTargetValue(index) {
        this.model.increaseTargetValue(index);
    }
    setTargetValue(index, value) {
        this.model.setTargetValue(index, value);
    }
}
//# sourceMappingURL=game-api.js.map