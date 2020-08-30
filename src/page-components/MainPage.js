import {h, defineComponent, onMounted, onUnmounted} from '@vue/runtime-core';
import {Circle, handleBobble} from '../components/Circle';
import {game} from '../Game';
import {isEdgeTouched} from '../utils/Algo';

export default defineComponent({

    //vue2 this.$emit
    setup(props, ctx) {
        const {bobbleInfo, moveBobble, changeDirection} = handleBobble();

        function handleTicker() {
            moveBobble(bobbleInfo);
            if (isEdgeTouched(bobbleInfo)) {
                console.log('hit!!!');
                changeDirection(bobbleInfo);
            }
        }

        onMounted(() => game.ticker.add(handleTicker));
        onUnmounted(() => game.ticker.remove(handleTicker));

        return {
            bobbleInfo
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx.bobbleInfo;

        return h('Container', [
            h(Circle, {x, y})
        ]);
    }


});