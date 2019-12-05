declare global {
    // interface String {
    //     // capitalize(this: string): string
    //     isValidEmail(this: string): boolean
    // }
    interface Number {
        remap(this: number, fromRange: number[], toRange: number[]): number
        // toRadians(this: number): number
        // lerp(this: number, target: number, amount: number)
        // clamp(this: number, min: number, max: number)
        // round(this: number, decimals: number): number
    }
    // interface JSON {
    //     tryParse: <T>(string: string, failedValue?: T) => T
    // }
    // interface Array<T> {
    //     last(this: Array<T>): T
    //     removeOne(this: Array<T>, fn: (val: T) => boolean): T
    //     random(this: Array<T>): T
    //     randoms(this: Array<T>, amount: number): Array<T>
    // }
}

Number.prototype.remap = function(this: number, fromRange, toRange) {
    return ((this - fromRange[0]) * (toRange[1] - toRange[0])) / (fromRange[1] - fromRange[0]) + toRange[0]
}

export const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
