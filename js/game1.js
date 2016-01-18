
/*Состояние - Игра*/

GameStates.Game = {


  /*метод добовляет мир в игру*/
  initWorld: function() {
    // константы в игре
    var score = 0;
    // переменная хранения счетчика
    var scoreText;
    var platforms;
    var live = 100;
    var liveText;
    // переменные уровня
    var map;
    var layer;
    
     // добвляем небо в игру
    this.sky = this.add.sprite(0, 0, 'sky');
    this.sky.scale.setTo(5,2);

    // инициализируем карту
    map = this.add.tilemap('map');
    // к карте добовляем спрайт
    map.addTilesetImage('tiles');

    // создаем на карте слой (называем его)
    this.layer = map.createLayer('Tile Layer 1');
    // растягиваем его по всему миру 
    this.layer.resizeWorld();

    this.layer.enableBody = true;
    
    map.setCollisionBetween(1, 12);

    //  добавляем в игру физику (выбираем аркадную фищику)
    this.physics.startSystem(Phaser.Physics.ARCADE);

     // Добавляем ввод с клавиатуры
    this.cursors = this.input.keyboard.createCursorKeys();
  },



  /*Игрок*/

  addPlayer: function () {

    // добовляем игрока
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');

    //  добовляем играку физику (инициализируем ее)
    this.physics.arcade.enable(this.player);

    //  добовляем параметры для физики
    this.player.body.bounce.y = 0.2; // отскок от поверхности
    this.player.body.gravity.y = 300; // вектор гравитации
    this.player.body.collideWorldBounds = true; // запещаем игроку заходить за гроницы мира

    //  добовляем анимации (ходьба влева и вправо)
    this.player.animations.add('left', [0, 1, 2, 3], 10, true); // название, номера слайдов, колчество кадров в
    // секунду, true замыкаем анимацию в цикде
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);


    /*Камера*/

    // добовляем камеру которая следит за игроком
    this.camera.follow(this.player);

},
  


/*Звездочки*/

  addStars: function () {


    // добовляем звездочки
    this.stars = this.add.group();
    // добовляем массу тела
    this.stars.enableBody = true;

    //  добовляем звездочки через цикл
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  добовляем им вектор гравитации
        star.body.gravity.y = 100;

        // добовляем им случаную скорость отталкивания от поверхности
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    };

},




 /*Аптечка*/

addApt: function () {


    // добовляем 
    this.aptec = this.add.group();
    // добовляем массу тела
    this.aptec.enableBody = true;

     var star = this.aptec.create(0, this.world.height - 164, 'apt');

    //  добовляем им вектор гравитации
    star.body.gravity.y = 300;

    // добовляем им случаную скорость отталкивания от поверхности
    star.body.bounce.y = 0.2;
    

},




/*проверяем столкновение игрока и стены*/
collisianPlayLayer: function () {
  this.game.physics.arcade.collide(this.player, this.layer);
},


/*столкновение игрока со звездочкой*/
collisionPlayStar: function () {
  this.game.physics.arcade.collide(this.player, this.stars, this.ballCollidesWithBlock);
},



/*обработчик события столкновения игрока и звездочки*/

ballCollidesWithBlock: function(a, stars) {
  stars.kill();
},

/*столкновение звездочки и карты*/

collisianStarLivel: function () {
  this.game.physics.arcade.collide(this.stars, this.layer);
},

/*столкновение аптечки и карты*/



/*проверка на столкновение с землей, перезагружае игру при поподание
мячака по земе*/
resetBall: function() {
  this.ball.reset(160, 240);
  this.ball.body.velocity.x = this.ballSpeed;
  this.ball.body.velocity.y = this.ballSpeed;
},


/*проверка проиграша игрока*/
ballCollidesWithGround: function() {
  if (this.ball.y >= 470) {
    this.playerLives -= 1;
    this.resetBall();
  }

  /*
   Обновляем отображение жизней игрока
   */
  this.livesDisplay.setText("Lives: " + this.playerLives);
  
  if (this.playerLives === 0) {
    // если уровень жизни равень нулю то игра перейдет в состояние
    // конец игры
    this.state.start("GameOver");
  }
  
},


/*
обработка события прикосновение (на сенсорных экранах)
*/

handleTouchInput: function () {
  if (this.input.pointer1.isDown) {
    if (this.input.pointer1.worldX > 160) {
      this.player.body.velocity.x = this.playerSpeed;
    }

    if (this.input.pointer1.worldX <= 160) {
      this.player.body.velocity.x = -1 * this.playerSpeed;
    }
  }
},


/*
обработка события нажатия клавиш (на лево и на право)
*/
handleKeyboardInput: function () {
  if (this.cursors.right.isDown) {
    this.player.body.velocity.x = this.playerSpeed;
  }

  if (this.cursors.left.isDown) {
    this.player.body.velocity.x = -1 * this.playerSpeed;
  }
},


/*функция для проверки колчиства блоков, и при колчистве равном 0 
переход в состояние выйграша
*/
checkGameWin: function () {
  if (this.blocks.countLiving() === 0) {
    if (this.currentLevel === levels.length - 1) {
      this.state.start("GameWin");
    } else {
      this.currentLevel++;
      this.addBlocks();
      this.resetBall();
    }
  }
},



/*добавляем статичные методы*/

  create: function() {
    this.initWorld();
    this.addPlayer();
    this.addStars();
    this.addApt();
  },

/*добовляем динамические методы*/
  update: function() {

  this.collisianPlayLayer();

  this.collisionPlayStar();
  this.collisianStarLivel();
  /*this.ballCollidesWithGround();
  this.handleTouchInput();
  this.handleKeyboardInput();
  this.checkGameWin();*/


      // добовляем управление
    // если нажать на лево то
    if (this.cursors.left.isDown)
    {
        //  изменяем крость тела игрока
        this.player.body.velocity.x = -150;
        // добовляем анимацию при нажатие
        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  изменяем вектор скорости и добовляем анимацию
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        // если мы не нажимаем то анимация остонавливается
        this.player.animations.stop();

        // выбираем 4 слайд (из спрайта)
        this.player.frame = 4;
    }

    //  разрешае игроку прыгать если он находиться на змеле
    if (this.cursors.up.isDown && this.player.body.onFloor()) // если нажата кнопка вверх и тело игрока касаеться низа
    {
        this.player.body.velocity.y = -310;
    };
}

};