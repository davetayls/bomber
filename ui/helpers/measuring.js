var TO_RADIANS = Math.PI / 180;

var measuring = {
    speedXY: function(rotation, speed) {
        return {
            x: Math.sin(rotation * TO_RADIANS) * speed,
            y: Math.cos(rotation * TO_RADIANS) * speed * -1,
        };
    },

    rotatePoint: function(coords, angle, distance) {
        return {
            x: Math.sin(angle * TO_RADIANS) * distance + coords.x,
            y: Math.cos(angle * TO_RADIANS) * distance * -1 + coords.y,
        };
    },

    distance: function(from, to) {
        var a = from.x > to.x ? from.x - to.x : to.x - from.x,
            b = from.y > to.y ? from.y - to.y : to.y - from.y;
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

};

