/*Состояние*/
/*функция загрузки ассетов*/

GameStates.Preloader = {
	/*медот предворительно щагружает ресурсы и индексирует их*/
  preload: function() {
    //подгружаем карту в ресурсах 
    this.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);

    // добвляем тайт для карты
    this.load.image('tiles', 'assets/tiles.png');

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('apt', 'assets/firstaid.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48); // ключь, значение (адрес ресурса), размер одного кадра
  },
  /*метод инициализирует игру для перезода в другое состояние (в
  	состояние самой игры)*/
  create: function(){
    this.state.start('Game');
  }
};


/*здесь мы в начале загружаем все ресурсы а затем открываем само
окно с игрой*/