import {width, height} from '../constants/Constants';

function isEdgeTouched(bobbleInfo) {
    return bobbleInfo.x <= 0 ||
        bobbleInfo.y <= 0 ||
        bobbleInfo.x + bobbleInfo.width >= width ||
        bobbleInfo.y + bobbleInfo.height >= height
}

export {
    isEdgeTouched
};