(function(scope){
    class CollisionDetector {
        _checkCollsion(x, y) {
            const hasHorizontalCollision = 
                ( x.left <= y.left && y.left <= x.right ) ||
                ( x.left <= y.right && y.right <= x.right ) ||
                ( y.left <= x.left && x.left <= y.right ) ||
                ( y.left <= x.right && x.right <= y.right );
    
            const hasVerticalCollision = 
                ( x.top <= y.top && y.top <= x.bottom ) ||
                ( x.top <= y.bottom && y.bottom <= x.bottom ) ||
                ( y.top <= x.top && x.top <= y.bottom ) ||
                ( y.top <= x.bottom && x.bottom <= y.bottom );
    
            return hasHorizontalCollision && hasVerticalCollision;
        }

        _getCollisionBox({left, top}, {width, height}) {
            const collisionBox = {
                left,
                top,
                right: left + width,
                bottom: top + height
            };

            return collisionBox;
        }

        doOnCollidingObjects(arr1, size1, arr2, size2, func) {
            arr1.forEach(x => {
                const hitbox1 
                    = this._getCollisionBox(x, size1);
                for (let i = 0; i < arr2.length; i++) {
                    const y = arr2[i];
                    const hitbox2 = this._getCollisionBox(y, size2);

                    const hasCollision = 
                    this._checkCollsion(hitbox1, hitbox2);
                    if (hasCollision) {
                        func(x,y);
                        break;
                    }
                }
            });
        }
    }

    scope.CollisionDetector = CollisionDetector;
})(window);