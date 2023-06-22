
let player;
let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let playerLives = 100;

let score = 0;
let stage = 0;

let titleFont;
let backgroundMusic;

let isMoving = false;
let movementIntervalId;

function preload() {
    pimg = loadImage('player.png')
    pb = loadImage('bulletb.png');
    titleFont = loadFont('HBIOS-SYS.ttf');
    bfimg = loadImage('1pazeboss.png');
    bsimg = loadImage('2pazeboss.png');
    btimg = loadImage('3pazeboss.png');
    bl = loadImage('4pazeboss.png');
    fbimg = loadImage('1paze.png');
    sbimg = loadImage('2paze.png');
    tbimg = loadImage('3paze.png');
    lb = loadImage('4paze.png');

    bgf = loadImage('1screen.jpg');
    bgs = loadImage('2screen.jpg');
    bgt = loadImage('3screen.jpg');
    bgl = loadImage('4screen.jpg');
    //ebs = loadSound('MP_Gun Silencer.mp3');
    //bgsong = loadSound('bgsong.mp3')
}


function setup() {
    createCanvas(800, 800);
    player = new Player();
    for (let i = 0; i < 1; i++) {
        enemies.push(new Enemy(random(width), random(height / 2)));
    }
    textAlign(CENTER)
    fill(255, 0, 0)
    //bgsong.play();
}

function draw(){

  if (stage == 0){
  splash();
}

  if (stage == 1){
  march();
}

if (stage == 2){
    april();
  }

  if (stage == 3){
    may();
  }

  if (stage == 4){
    june();
  }

  if (stage == 5){
  win();
}

if(mouseIsPressed == true){
  stage = 1;
}

}




function splash(){
  background(0);
  fill(255);
  textSize(40)
  textFont(titleFont);
  text('과제침공', width/2, 100)
  textSize(15)
  text('Made by 지영킴', width/2, 130)

  textSize(40)
  text('HOW TO PLAY', width/2, 250)
  textSize(15)
  text('Press left and right arrows to move', width/2, 290)
  text('press space bar to fire bullets', width/2, 320)
  text('과제를 파괴하여 네 명의 보스를 물리치고', width/2, 450)
  text('무사히 종강을 쟁취하시오', width/2, 480)
  textSize(40)
  text('CLICK THE SCREEN TO PLAY', width/2, 650)
}


function win(){
  background(255);
  stroke(5)
  fill(255)
  rect(0, 0, 800, 800)
  noStroke()
  fill(0);
  textSize(40)
  text('VICTORY', width/2, 200)
  textSize(15)
  text('축하합니다', width/2, 370)
  text('침공을 막아냈습니다', width/2, 400)
  text('다음 학기에 계속', width/2, 430)
  textSize(40)
  text('to be continued. . .', width/2, 650)
}

function keyPressed() {
    if (key === " ") {
        playerBullets.push(new PlayerBullet(player.x, player.y));
    }
}

function Player() {
    this.x = width / 2;
    this.y = height - 50;

    this.show = function () {
        image(pimg, this.x, this.y, 20, 20);
    };

    this.move = function () {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= 5;
        } else if (keyIsDown(RIGHT_ARROW) && this.x < width - 20) {
            this.x += 5;
        }
    };
}

function PlayerBullet(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;

    this.show = function () {
        fill(255, 255, 0);
        image(pb, this.x, this.y, 10, 10);

    };

    this.move = function () {
        this.y -= this.speed;
    };

    this.hits = function (object) {
        let d = dist(this.x, this.y, object.x, object.y);
        return d < 20;
    };
}


function march() {
    background(0);
    imageMode(CENTER)
    image(bgf, width/2, height/2, 600, 600)
    fill(225);
    rect(270, 170, 315, 515)
    textSize(20);
    text('Score:', 50, 35)
    text(score, 100, 35)
    text('Lives', 150, 35)
    text(playerLives, 200, 35)

    player.show();
    player.move();

    for (let i = playerBullets.length - 1; i >= 0; i--) {
        let bullet = playerBullets[i];
        bullet.show();
        bullet.move();

        if (bullet.y < 0 || bullet.y > height) {
            playerBullets.splice(i, 1);
            
        } else {
            for (let j = enemyBullets.length - 1; j >= 0; j--) {
                if (bullet.hits(enemyBullets[j])) {
                    //ebs.play();
                    score = score + 1;
                    enemyBullets.splice(j, 1);
                    playerBullets.splice(i, 1);
                    break;
                  
                }
            }
        }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let bullet = enemyBullets[i];
        
        bullet.show();
        bullet.move();

       if (bullet.y < 0 || bullet.y > height) {
            enemyBullets.splice(i, 1);
            playerLives = playerLives - 1;
            
        }
    }

    for (let enemy of enemies) {
        enemy.show();
        enemy.move();

        if (random() < 0.01) {
            enemyBullets.push(new EnemyBullet(enemy.x, enemy.y));
        }
    }

    if (playerLives <= 0) {
        textSize(64);
        text("Game Over", width / 2, height / 2);
        noLoop();
    }

    if(score >= 2){
      stage = 2;
    } // 점수 설정
}

function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.02, 0.04); // Easing speed
    this.targetX = x;
    this.targetY = y;


    this.targetChangeInterval = setInterval(() => {
        this.targetX = random(width);
        this.targetY = 170;
    }, random(100, 2000)); // 1000 milliseconds = 1 seconds

    this.show = function () {
        fill(255, 0, 0);
        image(bfimg, this.x, this.y, 20, 20);
        
    };

    this.move = function () {
        this.speed = random(0.02, 0.04 * stage * 0.1);
        
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        this.x = constrain(this.x, 270, width - 215);
        if (this.y < 0) this.y = 0;
        if (this.y > height / 2) this.y = height / 2;
    };

    function EnemyBullet(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5
    
        this.show = function () {
            fill(255, 0, 0);
            image(fbimg, this.x, this.y, 20, 20);
        };
    
        this.move = function () {
            this.y += this.speed * (stage * 0.5);
        };
    
        this.hits = function (object) {
            let d = dist(this.x, this.y, object.x, object.y);
            return d < 10;
        };
}

}

function april() {
    background(0);
    imageMode(CENTER)
    image(bgs, width/2, height/2, 600, 600)
    // fill(0)
    // rect(170, 195, 20)
    // rect(620, 195, 20)
    fill(225);
    textSize(20);
    text('Score:', 50, 35)
    text(score, 100, 35)
    text('Lives', 150, 35)
    text(playerLives, 200, 35)

    player.show();
    player.move();

    for (let i = playerBullets.length - 1; i >= 0; i--) {
        let bullet = playerBullets[i];
        bullet.show();
        bullet.move();

        if (bullet.y < 0 || bullet.y > height) {
            playerBullets.splice(i, 1);
            
        } else {
            for (let j = enemyBullets.length - 1; j >= 0; j--) {
                if (bullet.hits(enemyBullets[j])) {
                    score = score + 1;
                    enemyBullets.splice(j, 1);
                    playerBullets.splice(i, 1);
                    break;
                  
                }
            }
        }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let bullet = enemyBullets[i];
        
        bullet.show();
        bullet.move();

        if (bullet.y < 0 || bullet.y > height) {
            enemyBullets.splice(i, 1);
            playerLives = playerLives - 1;
            
        }
    }

    for (let enemy of enemies) {
        enemy.show();
        enemy.move();

        if (random() < 0.01) {
            enemyBullets.push(new EnemyBullet(enemy.x, enemy.y));
        }
    }

    if (playerLives <= 0) {
        textSize(64);
        text("Game Over", width / 2, height / 2);
        noLoop();
    }

    if(score >= 4){
      stage = 3;
    } // 점수 설정
}


function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.02, 0.04); // Easing speed
    this.targetX = x;
    this.targetY = y;

    
    this.targetChangeInterval = setInterval(() => {
        this.targetX = random(width);
        this.targetY = 195;
    }, random(100, 2000)); // 1000 milliseconds = 1 seconds

    this.show = function () {
        fill(255, 0, 0);
        image(bsimg, this.x, this.y, 20, 20);
    };

    this.move = function () {
        this.speed = random(0.02, 0.04 * stage * 0.1);
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        this.x = constrain(this.x, 170, width - 180);
        if (this.y < 0) this.y = 0;
        if (this.y > height / 2) this.y = height / 2;
    };

    function EnemyBullet(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5
    
        this.show = function () {
            fill(255, 0, 0);
            image(sbimg, this.x, this.y, 20, 20);
        };
    
        this.move = function () {
            this.y += this.speed * (stage * 0.5);
        };
    
        this.hits = function (object) {
            let d = dist(this.x, this.y, object.x, object.y);
            return d < 10;
        };
}
}

function may(){
        background(0);
        imageMode(CENTER)
        image(bgt, width/2, height/2, 600, 600)
        // fill(0)
        // rect(160, 195, 20)
        // rect(630, 195, 20)
        fill(225);
        textSize(20);
        text('Score:', 50, 35)
        text(score, 100, 35)
        text('Lives', 150, 35)
        text(playerLives, 200, 35)
    
        player.show();
        player.move();
    
        for (let i = playerBullets.length - 1; i >= 0; i--) {
            let bullet = playerBullets[i];
            bullet.show();
            bullet.move();
    
            if (bullet.y < 0 || bullet.y > height) {
                playerBullets.splice(i, 1);
                
            } else {
                for (let j = enemyBullets.length - 1; j >= 0; j--) {
                    if (bullet.hits(enemyBullets[j])) {
                        score = score + 1;
                        enemyBullets.splice(j, 1);
                        playerBullets.splice(i, 1);
                        break;
                      
                    }
                }
            }
        }
    
        for (let i = enemyBullets.length - 1; i >= 0; i--) {
            let bullet = enemyBullets[i];
            
            bullet.show();
            bullet.move();
    
            if (bullet.y < 0 || bullet.y > height) {
                enemyBullets.splice(i, 1);
                playerLives = playerLives - 1;
                
            }
        }
    
        for (let enemy of enemies) {
            enemy.show();
            enemy.move();
    
            if (random() < 0.01) {
                enemyBullets.push(new EnemyBullet(enemy.x, enemy.y));
            }
        }
    
        if (playerLives <= 0) {
            textSize(64);
            text("Game Over", width / 2, height / 2);
            noLoop();
        }
    
        if(score >= 6){
          stage = 4;
        } // 점수 설정
    }
    
    
    function Enemy(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(0.02, 0.04); // Easing speed
        this.targetX = x;
        this.targetY = y;
    
        this.targetChangeInterval = setInterval(() => {
            this.targetX = random(width);
            this.targetY = 195;
        }, random(100, 2000)); // 1000 milliseconds = 1 seconds
    
        this.show = function () {
            fill(255, 0, 0);
            image(btimg, this.x, this.y, 20, 20);
        };
    
        this.move = function () {
            this.speed = random(0.02, 0.04 * stage * 0.1);
            let dx = this.targetX - this.x;
            let dy = this.targetY - this.y;
            this.x += dx * this.speed;
            this.y += dy * this.speed;
    
            this.x = constrain(this.x, 160, width - 170);
            if (this.y < 0) this.y = 0;
            if (this.y > height / 2) this.y = height / 2;
        };
    }    
    function EnemyBullet(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5
    
        this.show = function () {
            
            image(tbimg, this.x, this.y, 20, 20);
        };
    
        this.move = function () {
            this.y += this.speed * (stage * 0.5);

        };
    
        this.hits = function (object) {
            let d = dist(this.x, this.y, object.x, object.y);
            return d < 10;
        };
}


function june() {
    background(0);
    imageMode(CENTER)
    image(bgl, width/2, height/2, 600, 600)
    // fill(0)
    //     rect(150, 280, 20)
    //     rect(480, 280, 20)
    fill(225);
    textSize(20);
    text('Score:', 50, 35)
    text(score, 100, 35)
    text('Lives', 150, 35)
    text(playerLives, 200, 35)

    player.show();
    player.move();

    for (let i = playerBullets.length - 1; i >= 0; i--) {
        let bullet = playerBullets[i];
        bullet.show();
        bullet.move();

        if (bullet.y < 0 || bullet.y > height) {
            playerBullets.splice(i, 1);
            
        } else {
            for (let j = enemyBullets.length - 1; j >= 0; j--) {
                if (bullet.hits(enemyBullets[j])) {
                    score = score + 1;
                    enemyBullets.splice(j, 1);
                    playerBullets.splice(i, 1);
                    break;
                  
                }
            }
        }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let bullet = enemyBullets[i];
        
        bullet.show();
        bullet.move();

        if (bullet.y < 0 || bullet.y > height) {
            enemyBullets.splice(i, 1);
            playerLives = playerLives - 1;
            
        }
    }

    for (let enemy of enemies) {
        enemy.show();
        enemy.move();

        if (random() < 0.01) {
            enemyBullets.push(new EnemyBullet(enemy.x, enemy.y));
        }
    }

    if (playerLives <= 0) {
        textSize(64);
        text("Game Over", width / 2, height / 2);
        noLoop();
    }

    if(score >= 10){
      stage = 5;
    } // 점수 설정
}

function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.02, 0.04); // Easing speed
    this.targetX = x;
    this.targetY = y;

    this.targetChangeInterval = setInterval(() => {
        this.targetX = random(width);
        this.targetY = 300;
    }, random(100, 2000)); // 1000 milliseconds = 1 seconds

    this.show = function () {
        
        image(bl, this.x, this.y, 20, 20);
    };

    this.move = function () {
        this.speed = random(0.02, 0.04 * stage * 0.1);
        
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        this.x = constrain(this.x, 170, width - 320);
        if (this.y < 0) this.y = 0;
        if (this.y > height / 2) this.y = height / 2;
    };
}

function EnemyBullet(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5

    this.show = function () {
        
        image(lb, this.x, this.y, 20, 20);
    };

    this.move = function () {
        this.y += this.speed * (stage * 0.5);
    };

    this.hits = function (object) {
        let d = dist(this.x, this.y, object.x, object.y);
        return d < 10;
    };
}






