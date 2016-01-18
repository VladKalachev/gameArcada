var GameStates = {}; // <-- Объект для хранения всех наших игровых состояний

document.addEventListener("DOMContentLoaded", function()  {

	/*Создаем экран*/

	var width = 800;
	var height = 600;

var game = new Phaser.Game(width, height, Phaser.AUTO, "game");

/*Иницилизируем состояния*/

  // Добавляем игровое состояние, все состояния нужно регистрировать
  game.state.add('Preloader', GameStates.Preloader);
  game.state.add('Game', GameStates.Game);
  game.state.add('Gameover', GameStates.GameOver);
  //game.state.add('GameOver', GameStates.GameOver);
  //game.state.add('GameWin', GameStates.GameWin);


  // Запускаем состояние Preloader
  game.state.start('Preloader');
  
});