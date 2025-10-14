
import _ from 'lodash'

export function array_random<T>(array: T[]): T{
    const shuffled = _.shuffle(array)

    return shuffled[0]
}