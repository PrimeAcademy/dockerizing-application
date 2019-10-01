import colorService from '../../modules/color.service';
const defaultState = {
    color: colorService.color,
    type: colorService.type,
};

const colorgen = (state = defaultState, action) => {
    switch (action.type) {
        case 'GENERATE_NEW_COLOR':
            colorService.pickNewColor();
            return {
                color: colorService.color,
                type: colorService.type,
            };
        case 'CONVERT_TO_RGB_COLOR':
            colorService.convertTo('RGB');
            return {
                color: colorService.color,
                type: colorService.type,
            };
        case 'CONVERT_TO_HSL_COLOR':
            colorService.convertTo('HSL');
            return {
                color: colorService.color,
                type: colorService.type,
            };
        default:
            return state;
    }
};

export default colorgen;