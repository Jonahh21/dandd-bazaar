
import _ from 'lodash'
import { ItemPost } from '../../interfaces/item.interface'
import { FormGroup, FormControl } from '@angular/forms';

export function array_random<T>(array: T[]): T{
    const shuffled = _.shuffle(array)

    return shuffled[0]
}

export function formGroupize<T>(): FormGroup {
    const controls: { [key: string]: FormControl } = {};
    
    // Get all properties from T using mapped types
    type DefaultValues = { [K in keyof T]: T[K] extends number ? 1 
        : T[K] extends string ? ''
        : T[K] extends boolean ? false
        : null };
    
    // Create an object with default values based on the interface
    const defaultValues = {} as DefaultValues;
    
    // Create form controls with default values
    for (const key in defaultValues) {
        controls[key] = new FormControl(defaultValues[key]);
    }
    
    return new FormGroup(controls);
}
