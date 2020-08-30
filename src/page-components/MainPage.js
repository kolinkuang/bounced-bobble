import {h, defineComponent, onMounted, onUnmounted} from '@vue/runtime-core';
import {Circle, handleBobble} from '../components/Circle';
import {game} from '../Game';
import {isEdgeTouched} from '../utils/Algo';

export default defineComponent({

    //vue2 this.$emit
    setup() {
        const {bobbleInfo, moveBobble, changeDirection, handleClick} = handleBobble();

        function handleTicker() {
            moveBobble(bobbleInfo);
            if (isEdgeTouched(bobbleInfo)) {
                changeDirection(bobbleInfo);
            }
        }

        onMounted(() => game.ticker.add(handleTicker));
        onUnmounted(() => game.ticker.remove(handleTicker));

        return {
            bobbleInfo,
            handleClick
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx.bobbleInfo;

        return h('Container', [
            h(Circle, {
                x,
                y,
                interactive: true,
                onClick: ctx.handleClick
            })
        ]);
    }


});