export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindSelectionChanged((i) => this.nextMove(i));
  }

  nextMove(index) {
    if (this.model.changeCell(index)) {
      this.view.updateBoard();
    } else {
      this.view.wrongMove();
      return;
    }

    if (this.model.checkForWinner()) {
      this.view.gameIsWon();
    }
  }

  run() {
    // main wird regelmässig aufgerufen
    setInterval(() => this.view.main(), 100);
  }
}
