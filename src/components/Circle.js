import {defineComponent, h, reactive} from '@vue/runtime-core';

const Circle = defineComponent({

    setup(props) {
    },

    render() {
        return h('circle', {x: 0, y: 0});
    }

});

function handleBobble() {

    const initState = {
        x: 300,
        y: 200
    };

    const MoveDirection = {
        Up: Symbol(),
        Down: Symbol(),
        Left: Symbol(),
        Right: Symbol()
    };

    const bobbleInfo = reactive({
        x: initState.x,
        y: initState.y,
        width: 200,
        height: 200,
        direction: MoveDirection.Right
    });

    const Speed = 8;

    const Strategies = {
        [MoveDirection.Up](bobbleInfo) {
            bobbleInfo.y -= Speed;
        },
        [MoveDirection.Down](bobbleInfo) {
            bobbleInfo.y += Speed;
        },
        [MoveDirection.Left](bobbleInfo) {
            bobbleInfo.x -= Speed;
        },
        [MoveDirection.Right](bobbleInfo) {
            bobbleInfo.x += Speed;
        }
    };

    const ChangeDirectionMap = {
        [MoveDirection.Up](bobbleInfo) {
            bobbleInfo.direction = MoveDirection.Down;
        },
        [MoveDirection.Down](bobbleInfo) {
            bobbleInfo.direction = MoveDirection.Up;
        },
        [MoveDirection.Left](bobbleInfo) {
            bobbleInfo.direction = MoveDirection.Right;
        },
        [MoveDirection.Right](bobbleInfo) {
            bobbleInfo.direction = MoveDirection.Left;
        }
    };

    function moveBobble(bobbleInfo) {
        Strategies[bobbleInfo.direction](bobbleInfo);
    }

    function changeDirection(bobbleInfo) {
        ChangeDirectionMap[bobbleInfo.direction](bobbleInfo);
    }

    function handleClick() {
        console.log('onClick!');
        const keys = Object.keys(MoveDirection);
        const index = Math.floor((Math.random() * keys.length))
        bobbleInfo.direction = MoveDirection[keys[index]];
    }

    return {
        bobbleInfo,
        moveBobble,
        changeDirection,
        handleClick
    };
}

export {
    Circle,
    handleBobble
};