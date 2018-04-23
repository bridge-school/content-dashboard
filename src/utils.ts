import { complexityColors } from './constants';

export const getComplexityColor = (complexity) => {
    return complexityColors[complexity] || 'mid-gray';
};