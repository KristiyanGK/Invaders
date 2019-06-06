(function(scope) {
    const {
        Renderer,
        GameObjectsFactory,
        SIZES,
        KEYCODES,
        CollisionDetector
    } = scope;

    const setupCanvas = function(gameContainer, width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        gameContainer.appendChild(canvas);

        return canvas;
    };

    const shouldSpawnEnemy = function (chance) {
        const value = Math.random() * 100;
        return value <= chance;
    };

    class EventChecker {
        isGoLeftEvent(ev) {
            const {LEFT} = KEYCODES;
            return ev.keyCode === LEFT;
        }
        isGoRightEvent(ev) {
            const {RIGHT} = KEYCODES;
            return ev.keyCode === RIGHT;
        }
        isFireEvent(ev) {
            const {FIRE} = KEYCODES;
            return ev.keyCode == FIRE;
        }
    }

    class Game {
        constructor(selector, width, height) {
            this.gameContainer = document.querySelector(selector);

            this.canvas = setupCanvas(this.gameContainer, width, height);
        
            this.bounds = {
                width,
                height
            };
    
            this.renderer = new Renderer(this.canvas, this.bounds);
            
            this.gameObjectsFactory = new GameObjectsFactory(width, height);

            this.player = this.gameObjectsFactory.createPlayer();

            this.bullets = [];

            this.enemies = [];

            this.eventChecker = new EventChecker();

            this.collisionDetector = new CollisionDetector();

            this._attachGameEvents();
        }

        _attachGameEvents() {
            window.addEventListener("keydown", (ev) => {
                this._handleMovementEvent(ev);
                this._handleFireEvent(ev);
            });
            window.addEventListener("keyup", (ev) => {
                this.player.direction = null;
            });
        }

        // handles firing projectiles
        _handleFireEvent(ev) {
            if(!this.eventChecker.isFireEvent(ev)) {
                return;
            }

            // create bullets
            const {top,left} = this.player;
            const leftBullet = this.gameObjectsFactory.createBullet(left, top);

            const leftOfRightBullet = left + SIZES.PLAYER.WIDTH - SIZES.BULLET.WIDTH;
            const rightBullet = this.gameObjectsFactory.createBullet(leftOfRightBullet, top);
            
            // persist
            this.bullets.push(leftBullet, rightBullet);
        }

        _handleMovementEvent(ev) {
            const {SPEED, WIDTH, DIRECTIONS} = SIZES.PLAYER;
            const {LEFT, RIGHT} = DIRECTIONS;
            let alpha = 0;

            if (this.eventChecker.isGoLeftEvent(ev)) {
                alpha = -1;
                this.player.direction = LEFT;
            }
            else if (this.eventChecker.isGoRightEvent(ev)) {
                alpha = +1;
                this.player.direction = RIGHT;
            }

            // moves the player
            this.player.left += alpha * SPEED;
            // left boundry
            this.player.left = Math.max(
                this.player.left, 0
            );
            
            // right boundry
            this.player.left = Math.min(
                this.player.left, this.bounds.width - WIDTH
            );
        }

        _render() {
            this.renderer.renderPlayer(this.player);

            this.renderer.renderBullets(this.bullets);

            this.renderer.renderEnemies(this.enemies);
        }

        _updatePositions() {
            const { SPEED: bulletSpeed } = SIZES.BULLET;
            this.bullets.forEach(bullet => {
                bullet.top += bulletSpeed;
                bullet.isDead = bullet.top <= TOPLIMIT;
            });

            const { height } = this.bounds;
            const { SPEED: enemySpeed } = SIZES.ENEMY;

            this.enemies.forEach(enemy => {
                enemy.top += enemySpeed;
                enemy.isDead = enemy.top >= height;
            });
        }

        _removeDeadGameObjects() {
            this.bullets = this.bullets.filter(bullet => !bullet.isDead);

            this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        }

        _createNewGameObjects() {
            if (shouldSpawnEnemy(ENEMYSPAWNCHANCE)) {
                const enemy = this.gameObjectsFactory.createEnemy();
                this.enemies.push(enemy);
            } 
        }

        _checkForBulletCollisions() {
            const { bullets, enemies } = this;
            const bulletSize = {
                width: SIZES.BULLET.WIDTH,
                height: SIZES.BULLET.HEIGHT
            } 
            const enemytSize = {
                width: SIZES.ENEMY.WIDTH,
                height: SIZES.ENEMY.HEIGHT
            } 
            
            this.collisionDetector
            .doOnCollidingObjects(bullets, bulletSize, enemies, enemytSize, function(bullet, enemy) {
                bullet.isDead = true;
                enemy.isDead = true;
            });
        }

        _checkForCollisions() {
            this._checkForBulletCollisions();
        }

        gameLoop() {
            this.renderer.clear();
            
            this._render();
            this._createNewGameObjects();
            this._updatePositions();
            this._checkForCollisions();
            this._removeDeadGameObjects();
            window.requestAnimationFrame(() => {
                this.gameLoop();
            });
        }

        start() {
            this.gameLoop();
        };
    }

    scope.Game = Game;
}(window));
