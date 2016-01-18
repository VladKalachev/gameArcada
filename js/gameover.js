

/*метод вызова состояние конец игры*/
GameStates.GameOver = {
  create: function() {
  
    // Добавляем фон
    this.add.sprite(0, 0, 'phaser');
    // добовляем текст
    var text = this.add.text(400, 500, 'Game Over! Plais kay Enter');
    text.fill = '#ec008c';
  
  },
  
  
};