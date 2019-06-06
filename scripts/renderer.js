(function(scope) {
    const { SIZES } = scope;

    class Renderer {
        constructor(canvas, bounds) {
            this.ctx = canvas.getContext("2d");
            this.bounds = bounds;

            this._loadStaticImagesUtil();
        }

        _loadStaticImagesUtil() {
            const { PLAYERIMG, BULLETIMG } = STATICIMAGESOURCES;

            this._loadStaticImages(PLAYERIMG, "playerImage");

            this._loadStaticImages(BULLETIMG, "bulletImage");         
        }

        _loadStaticImages(src, propName) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                this[propName] = image;
            }
        }

        clear() {
            const {ctx} = this;
            const {width, height} = this.bounds;
            ctx.clearRect(0,0, width, height);
        }
 
        renderPlayer(player) {
            const { left, top, direction } = player;
            const { ctx } = this;
            const { WIDTH, HEIGHT, DIRECTIONS, SCALE, RIGHTROTATE, LEFTROTATE } = SIZES.PLAYER;
            const { RIGHT } = DIRECTIONS;
            if (this.playerImage) {
                const shouldRotate = direction != null;
                const roatetionDegree = direction === RIGHT ? RIGHTROTATE : LEFTROTATE;

                if (shouldRotate) {
                    ctx.save();
                    ctx.translate(left, top);
                    ctx.rotate(roatetionDegree * Math.PI / 180);
                    ctx.scale(SCALE, 1);
                    ctx.translate(-left, -top);
                }

                ctx.drawImage(this.playerImage, left, top, WIDTH, HEIGHT);

                if (shouldRotate) {
                    ctx.restore();
                }
            }
        }

        renderBullets(bullets) {
            bullets.forEach(bullet => {
                this.renderBullet(bullet);
            });
        }

        renderBullet(bullet) {
            const { left, top } = bullet;
            const { ctx } = this;
            const { WIDTH, HEIGHT } = SIZES.BULLET;
            ctx.drawImage(this.bulletImage, left, top, WIDTH, HEIGHT);
        }

        renderEnemies(enemies) {
            enemies.forEach(enemy => {
                this.renderEnemy(enemy);
            });
        }

        renderEnemy(enemy) {
            const { left, top, image } = enemy;
            const { WIDTH, HEIGHT } = SIZES.ENEMY;
            const { ctx } = this;
            ctx.drawImage(image, left, top, WIDTH, HEIGHT);
        }
    }

    scope.Renderer = Renderer;
}(window));
