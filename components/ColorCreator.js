import React from 'react';
import {COLORS} from "../config/constants";

export const ColorCreator = (colorNum) => {
    switch (colorNum) {
        case 1:return COLORS.raceBlue;
        case 2:return COLORS.purpleBixi;
        case 3:return COLORS.sexRed;
        case 4:return COLORS.funnyOrange;
        case 5:return COLORS.honeyYellow;
        case 6:return COLORS.zombieGreen;
        case 7:return COLORS.babyBlue;
        case 8:return COLORS.lovePink;
        case 1000:return COLORS.black;
    }
}

// export default ColorCreator;