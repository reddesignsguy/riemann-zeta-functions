import {add, chain, Complex, cos, divide, e, floor, log, multiply, pi, pow, sin, sqrt, subtract } from "mathjs";

export function Z(t: number)
{
const T = sqrt(t / (2 * pi)) as number;
const m = floor(T) as number;
let summ = 0;
for (let n = 1; n <= m; n++) {
    summ += cos(theta(t) - t * log(n)) / (sqrt(n) as number);
}
summ *= 2;

const c0 = Psi(T - m);
const correction : number= (pow(-1, m - 1) as number )* (pow(2 * pi / t, 0.25) as number ) * (c0);

return summ + correction;
}

function Psi(t: number): number {
    return cos(2 * pi * (t ** 2 - t - 1 / 16)) / cos(2 * pi * t);
}

export enum ComplexComponent{
    re,
    im
}

export function E(comp : ComplexComponent, a: number, b: number)
{
    let res = pow(e, a) as number;
    if (comp == ComplexComponent.re)
    {
        return res * cos(b);
    }
    else
    {
        return res * sin(b);
    }
}

export function ZComplex(t: number) : {re: number, im: number}
{
    
    const zeta = Z(t);
    const thetaValue = theta(t) as number;

    const x = zeta * E(ComplexComponent.re, 0, -thetaValue);
    const y = zeta * E(ComplexComponent.im, 0, -thetaValue);

    return {re: x, im: y};
}


export function theta(t: number) : number
{
return t/2 * log(t/(2*pi), e) - t/2 - pi/8 + 1/(48*t) + 7/(5760*(pow(t, 3) as number));
}

console.log("test")
