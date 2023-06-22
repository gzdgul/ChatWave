import React from 'react';
import {COLORS} from "../config/constants";

export const ColorCreator = (colorNum) => {
    switch (colorNum) {
        case 1:return COLORS.pudra;
        case 2:return COLORS.sky;
        case 3:return COLORS.greeny;
        case 4:return COLORS.peach;
        case 5:return COLORS.gold;
        case 6:return COLORS.babyFire;
        case 7:return COLORS.pig;
        case 8:return COLORS.babyBlue;
        case 1000:return COLORS.black;
    }
}

// export default ColorCreator;