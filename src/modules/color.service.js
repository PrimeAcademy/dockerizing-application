const COLOR_CODES = {
    HEX: 'HEX',
    RGB: 'RGB',
    HSL: 'HSL',
};

/**
 * Referenced CSS-Tricks for color conversions & random color generation
 * https://css-tricks.com/converting-color-spaces-in-javascript/
 * https://css-tricks.com/examples/RandomHexColor/
 */
class Color {
    constructor() {
        this.colorCode = COLOR_CODES.HEX;

        this._init();
    }

    //
    // PRIVATE METHODS
    // --------------------------------------------------------------------------------

    _init() {
        this.pickNewColor(this.colorCode);
    }

    _generateColorHexCode() {
        const randomColorCode = Math.floor(Math.random()*16777215).toString(16);
        return `#${randomColorCode}`;
    }

    _setCurrColor(newHexColor, newColorCode) {
        let newCurrColor = newHexColor;

        if (newColorCode !== COLOR_CODES.HEX
            && COLOR_CODES[newColorCode] != null
        ) {
            const converterMethod = `_convert${COLOR_CODES.HEX}To${newColorCode}`;
            newCurrColor = this[converterMethod](newHexColor);
        }

        this.currColor = newCurrColor;
        this.colorCode = newColorCode;
        console.log('currColorHex: ', this.currColorHex);
        console.log('currColor: ', this.currColor);
        console.log('colorCode: ', this.colorCode);

        return true;
    }

    _convertHEXToRGB(hexStr) {
        let r = 0;
        let g = 0;
        let b = 0;

        // 3 digits
        if (hexStr.length == 4) {
            r = "0x" + hexStr[1] + hexStr[1];
            g = "0x" + hexStr[2] + hexStr[2];
            b = "0x" + hexStr[3] + hexStr[3];

        // 6 digits
        } else if (hexStr.length == 7) {
            r = "0x" + hexStr[1] + hexStr[2];
            g = "0x" + hexStr[3] + hexStr[4];
            b = "0x" + hexStr[5] + hexStr[6];
        }

        return `rgb(${+r}, ${+g}, ${+b})`;
    }

    _convertHEXToHSL(hexStr) {
        // Convert hex to RGB first
        let r = 0;
        let g = 0;
        let b = 0;

        if (hexStr.length == 4) {
            r = "0x" + hexStr[1] + hexStr[1];
            g = "0x" + hexStr[2] + hexStr[2];
            b = "0x" + hexStr[3] + hexStr[3];
        } else if (hexStr.length == 7) {
            r = "0x" + hexStr[1] + hexStr[2];
            g = "0x" + hexStr[3] + hexStr[4];
            b = "0x" + hexStr[5] + hexStr[6];
        }
        
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r,g,b);
        let cmax = Math.max(r,g,b);
        let delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;

        if (delta == 0) {
            h = 0;
        }
        else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        }
        else if (cmax == g) {
            h = (b - r) / delta + 2;
        }
        else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    //
    // PUBLIC METHODS
    // --------------------------------------------------------------------------------

    convertTo(convertCode) {
        if (COLOR_CODES[convertCode] == null) {
            return false;
        }

        this._setCurrColor(this.currColor, convertCode);

        return true;
    }

    pickNewColor(useColorCode) {
        const newColor = this._generateColorHexCode();

        this.currColorHex = newColor;
        this._setCurrColor(newColor, useColorCode);
    }

    get color() {
        return this.currColor;
    }

    get type() {
        return this.colorCode;
    }

    static launchSingleton() {
        return new Color();
    }
}

export default Color.launchSingleton();