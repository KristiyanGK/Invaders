(function (scope) {
    const {SIZES} = scope;

    class GameObjectsFactory {
        constructor (containerWidth, containerHeight){
            this.bounds = {containerHeight, containerWidth};
        }

        createBullet(left, top) {
            const bullet = {left, top};
            return bullet;
        }

        createPlayer() {
            const {containerHeight, containerWidth} = this.bounds;
            const {WIDTH, HEIGHT} = SIZES.PLAYER;
            const left = 
            (containerWidth - WIDTH) / 2;
            const top = 
            (containerHeight - HEIGHT);

            const player = {left, top};

            return player;
        }
        
        createEnemy() {
            const { containerWidth } = this.bounds;
            const top = 0;
            const left = parseInt(Math.random() * containerWidth);

            let image = new Image();

            const num = parseInt(Math.random() * ENEMYIMGCOUNT);

            image.src = IMAGESRCTEMPLATE.replace(IMAGESRCREPLACETARGET, num);

            let enemy = {
                left, top, image
            };

            return enemy;
        }
    }

    scope.GameObjectsFactory = GameObjectsFactory;
})(window);
