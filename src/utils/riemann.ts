import {add, chain, cos, divide, e, floor, log, multiply, pi, pow, sin, sqrt, subtract } from "mathjs";

export function Z(t: number)
{
const T = sqrt(t / (2 * pi));
const m = floor(T);
let summ = 0;
for (let n = 1; n <= m; n++) {
    summ += cos(theta(t) - t * log(n)) / sqrt(n);
}
summ *= 2;

const c0 = Psi(T - m);
const c1 = sqrt(2 * pi / t) * c0;
const correction = pow(-1, m - 1) * pow(2 * pi / t, 0.25) * (c0 + c1);

return summ + correction;
}

function Psi(t: number): number {
    return cos(2 * pi * (t ** 2 - t - 1 / 16)) / cos(2 * pi * t);
}

function T(t: number): number {
    return sqrt(t / (2 * pi)) - floor(sqrt(t / (2 * pi)));
}
}

export function theta(t: number) : number
{
return t/2 * log(t/(2*pi), e) - t/2 - pi/8 + 1/(48*t) + 7/(5760*(pow(t, 3) as number));
}

console.log("test")
