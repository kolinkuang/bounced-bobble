// vue3 root component
// 定义 vue3 根组件
import {defineComponent, h} from '@vue/runtime-core';
import MainPage from './page-components/MainPage';

// template -> render
export default defineComponent({

    setup() {
    },

    render() {
        return h('Container', [
            h(MainPage)
        ]);
    }

});