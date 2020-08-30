import {createRenderer} from "@vue/runtime-core";
import {Container, Graphics} from 'pixi.js';
import {circleRadius} from '../constants/Constants';

//定义渲染方式
const typeElementMap = {
    circle() {
        let element = new Graphics();
        element.beginFill(0xCAEACE);
        element.drawCircle(circleRadius, circleRadius, circleRadius);
        element.endFill();
        return element;
    },
    Container() {
        return new Container();
    }
};

const patchPropMap = {
    'onClick'(el, key, nextValue) {
        el.on('pointertap', nextValue);
    },
    default(el, key, nextValue) {
        el[key] = nextValue;
    }
};

// 自定义渲染器（可跨平台）
const renderer = createRenderer({
    createElement(type) {
        // 创建元素：将Vue 虚拟 DOM 映射成 pixi.js 的元素
        // create canvas element based on type
        return typeElementMap[type]();
    },
    insert(el, parent) {
        // append （创建完元素后，添加进容器）
        parent.addChild(el);
    },
    patchProp(el, key, prevValue, nextValue) {
        // patch pixi 元素的属性
        const fn = patchPropMap[key];
        !!fn ? fn(el, key, nextValue) : patchPropMap.default(el, key, nextValue);
    },
    setElementText(node, text) {
        // create text
        const cText = new Text(text);
        node.addChild(cText);
    },
    createText(text) {
        return new Text(text);
    },
    createComment(text) {
    },
    parentNode(node) {
    },
    nextSibling(node) {
    },
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    }
});

export default function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}