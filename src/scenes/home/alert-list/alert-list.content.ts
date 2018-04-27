import { ClassModule } from '../home.content';

export interface Alert {
    id: string;
    module: ClassModule;
    missing?: Array<ClassModule>;
    following?: Array<ClassModule>;
}