import { ContentModule } from '../../../constants';

export interface Alert {
    id: string;
    module: ContentModule;
    missing?: Array<ContentModule>;
    following?: Array<ContentModule>;
}