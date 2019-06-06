(function(scope) {
    const TOPLIMIT = 0;
    const ENEMYSPAWNCHANCE = 1;

    const SIZES = {
        PLAYER: {
            HEIGHT: 110,
            WIDTH: 130,
            SPEED: 30,
            SCALE: 0.8,
            LEFTROTATE: -15,
            RIGHTROTATE: 15,
            DIRECTIONS: {
                LEFT: "left",
                RIGHT: "right"
            }
        },
        BULLET: {
            HEIGHT: 20,
            WIDTH: 10,
            SPEED: -8
        },
        ENEMY: {
            HEIGHT: 40,
            WIDTH: 40,
            SPEED: 0.5,
        }
    };

    const ENEMYIMGCOUNT = 4;

    const IMAGESRCREPLACETARGET = "PLACEHOLDER";

    const IMAGESRCTEMPLATE = `./resources/enemy${IMAGESRCREPLACETARGET}.png`;

    const STATICIMAGESOURCES = {
        PLAYERIMG: "./resources/player.png",
        BULLETIMG: "./resources/bullet.png"
    }

    const KEYCODES = {
        LEFT: 65, // A
        RIGHT: 68, // D
        FIRE: 32 // Space
    };

    scope.IMAGESRCREPLACETARGET = IMAGESRCREPLACETARGET;
    scope.IMAGESRCTEMPLATE = IMAGESRCTEMPLATE;
    scope.ENEMYIMGCOUNT = ENEMYIMGCOUNT;
    scope.ENEMYSPAWNCHANCE = ENEMYSPAWNCHANCE;
    scope.TOPLIMIT = TOPLIMIT;
    scope.SIZES = SIZES;
    scope.KEYCODES = KEYCODES;
    scope.STATICIMAGESOURCES = STATICIMAGESOURCES;
})(window);
