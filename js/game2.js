
/*Состояние - Игра*/

GameStates.Game2 = {

/*КОНСТАНТЫ*/


  /*метод добовляет мир в игру*/
  initWorld: function() {
    

    /*ИГРОВЫЕ КОНСТАНТЫ*/
    this.score = 0;
    // переменная хранения счетчика
    this.scoreText;
    this.platforms;
    this.live = 100;
    this.liveText;
    // переменные уровня
    this.map;
    this.layer;

    this.star = 0;
    console.log(typeof this.star);





/*ФИЗИКА*/


    //  добавляем в игру физику (выбираем аркадную фищику)
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.arcade.gravity.y = 200;
    

/*ПАРАЛАКС ФОНА*/

     // добвляем небо в игру
    this.sky = this.add.sprite(0, 0, 'sky');
    this.sky.scale.setTo(4,3);

    // фиксируем небо что бы сделать паралакс эффект
    this.sky.fixedToCamera = true;


/*КАРТА*/

    // загружаем json
    this.map = this.add.tilemap('map2');
    // добовляем спрайт
    this.map.addTilesetImage('tiles');

    // физика для карты
    this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    // инициализируем слой
    this.layer = this.map.createLayer('Tile Layer 1');
    // растягиваем его по всему миру 
    this.layer.resizeWorld();

    this.layer.enableBody = true;

    this.layer.immovable = true;
    
    // добовляем коллизию с tilemap
    //this.map.setCollisionBetween(1, 12);


     // Добавляем ввод с клавиатуры
    this.cursors = this.input.keyboard.createCursorKeys();
  },



  /*Игрок*/

  addPlayer: function () {

/*ДОБОВЛЯЕМ ИГРОКА*/

    // добовляем игрока
    this.player = this.add.sprite(32, this.world.height - 350, 'dude');


/*ФИЗИКА ИГРОКА*/
    //  добовляем играку физику (инициализируем ее)
    this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

    //  добовляем параметры для физики
    this.player.body.bounce.y = 0.2; // отскок от поверхности
    this.player.body.gravity.y = 300; // вектор гравитации
    this.player.body.collideWorldBounds = true; // запещаем игроку заходить за гроницы мира
    this.player.body.setSize(20, 32, 5, 16); // добовляем карту для тела, по нему будут происходить столкновения


/*АНИМАЦИЯ ИГРОКА*/

    //  добовляем анимации (ходьба влева и вправо)
    this.player.animations.add('left', [0, 1, 2, 3], 10, true); // название, номера слайдов, колчество кадров в
    // секунду, true замыкаем анимацию в цикде
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);


/*Счетчик звездочик*/

  this.scoreText = this.add.text(10,20, "Звездочки: 0", { fontSize: '32px', fill: '#fff' });

  //фиксируем счетчик на одном месте

  this.scoreText.fixedToCamera = true;

},
  


/*Звездочки*/

  addStars: function () {


    // добовляем звездочки
    this.stars = this.add.group();
    // добовляем массу тела
    this.stars.enableBody = true;

    //  добовляем звездочки через цикл
    for (var i = 0; i < 100; i++)
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



/*События столкновения*/



/*проверяем столкновение игрока и стены*/
collisianPlayLayer: function () {
  this.game.physics.arcade.collide(this.player, this.layer);
},


/*столкновение игрока со звездочкой*/
collisionPlayStar: function () {
  this.game.physics.arcade.collide(this.player, this.stars, this.ballCollidesWithBlock, null, this);
},



/*обработчик события столкновения игрока и звездочки*/

ballCollidesWithBlock: function(a, stars) {
  stars.kill();
  //star +=1;
  this.star += 10;

  //console.log(typeof this.star);

  //console.log(this.star);
  

  this.scoreText.text = "Звездочки: "+ this.star;



/*СОСТОЯНИЯ (обработка событий)*/


/*Конец игры*/

/*  if (this.star == 20)  {

    this.state.start('Gameover');

  };*/

      if (this.star == 100)  {

        this.state.start('win');
     };
},


/*столкновение звездочки и карты*/

collisianStarLivel: function () {
  this.game.physics.arcade.collide(this.stars, this.layer);
},



/*столкновение аптечки и карты*/
collisianAptLivel: function () {
  this.game.physics.arcade.collide(this.aptec, this.layer, this.AptCollisLivel);
},

/*обработчик события столкновения меча аптечки и уровня*/
AptCollisLivel: function (aptec, b) {
  aptec.kill();
},




/*Счетчик очков*/

wotchXP: function () {
  /* Обновляем отображение жизней игрока */

 // this.livesDisplay.setText("Lives: " + this.playerLives);
},


/*проверка проиграша игрока*/
/*ballCollidesWithGround: function() {
  if (this.ball.y >= 470) {
    this.playerLives -= 1;
    this.resetBall();
  }*/

  /*
   Обновляем отображение жизней игрока
   */
/*  this.livesDisplay.setText("Lives: " + this.playerLives);
  
  if (this.playerLives === 0) {
    // если уровень жизни равень нулю то игра перейдет в состояние
    // конец игры
    this.state.start("GameOver");
  }
  
},*/



/*
обработка события нажатия клавиш (на лево и на право)
*/
handleKeyboardInput: function () {
    
    this.player.body.velocity.x = 0;
        // добовляем управление

    // если нажать на лево то
    if (this.cursors.left.isDown)
    { 
        //  изменяем крость тела игрока
        this.player.body.velocity.x = -150;
        //this.camera.x -= 1;
        // добовляем анимацию при нажатие
        this.player.animations.play('left');
        //console.log(this.player.body.velocity.x);
    }

    else if (this.cursors.right.isDown)

    {
        //  изменяем вектор скорости и добовляем анимацию
        this.player.body.velocity.x = 150;
        //this.camera.x += 1;
 //console.log(this.player.body.velocity.x);
        this.player.animations.play('right');
    }

    else

    {
        // если мы не нажимаем то анимация остонавливается
        this.player.animations.stop();
         //console.log(this.player.body.velocity.x);

        // выбираем 4 слайд (из спрайта)
        this.player.frame = 4;
    }

    //  разрешае игроку прыгать если он находиться на змеле
    if (this.cursors.up.isDown && this.player.body.onFloor()) // если нажата кнопка вверх и тело игрока касаеться низа
    {
        this.player.body.velocity.y = -310;
        //console.log(this.player.body.velocity.y);
    };

},






/*добавляем статичные методы*/

  create: function() {
    this.initWorld();
    this.addPlayer();
    this.addStars();
    this.wotchXP();
    //this.addApt();

         /*Камера*/

    // добовляем камеру которая следит за игроком
    this.camera.follow(this.player);
    
  },

/*добовляем динамические методы*/
  update: function() {

  this.collisianPlayLayer();
  this.collisionPlayStar();
  this.collisianStarLivel();
  //this.collisianAptLivel();
  this.handleKeyboardInput();


   

}

};