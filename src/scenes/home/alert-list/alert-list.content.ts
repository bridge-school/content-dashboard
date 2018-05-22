import { ContentModule } from '../../../constants';

export interface Alert {
    id: string;
    targetPosition: number;
    module: ContentModule;
    missing?: Array<ContentModule>;
    following?: Array<ContentModule>;
}