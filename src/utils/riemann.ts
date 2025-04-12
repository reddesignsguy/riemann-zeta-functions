import {add, chain, cos, divide, e, floor, log, multiply, pi, pow, sin, sqrt, subtract } from "mathjs";

export function Z(t: number)
{
    const T = sqrt(t/(2*pi))
    const m = floor(T) as number;
    const z = 2*(t-m) - 1;

    let summ = 0;
    for (let n = 1; n <= m; n ++)
    {
        summ +=  cos(theta(t) - t * log(n, e)) / (sqrt(n) as number) || 0;
    }
    summ *= 2;

    const M = 2;
    let correction : any = 0;
    for (let j = 0; j < M; j ++)
    {
        correction += multiply(multiply(pow(-1, j), pow(T, -j)), phi(j, z));
    }
    correction *= multiply(pow(-1, m + 1), pow(T, -1/2)) as number;

    const res = summ + correction;
    return res;
}

export function phi(j: number, z: number) : number
{
    if (j == 0)
    {
        return cos((0.5 * pi * z ** 2) + (3 / 8) * pi ) / cos(pi * z);
    }
    else if (j == 1)
    {
        const piZ = multiply(pi, z);
        const piZ2 = multiply(pi, pow(z, 2));
        const sinPiZ = sin(piZ);
        const cosPiZ = cos(piZ);
        const cosPiZSquared = pow(cosPiZ, 2);
        const sinPiZSquared = pow(sinPiZ, 2);
        const cosPiZCubed = pow(cosPiZ, 3);
      
        const angle = add(divide(piZ2, 2), multiply(3, pi / 8)) as number;
        const sinAngle = sin(angle);
        const cosAngle = cos(angle);
      
        const term1 = multiply(
          add(
            multiply(2 * pi * z, multiply(cosPiZ, sinPiZ)),
            cosPiZSquared
          ),
          sinAngle
        );
      
        const term2 = multiply(
          add(
            multiply(subtract(multiply(pi, pow(z, 2)), pi), cosPiZSquared),
            multiply(-2 * pi, sinPiZSquared)
          ),
          cosAngle
        );
      
        const numerator = multiply(-pi, add(term1, term2));
        const result = divide(numerator, cosPiZCubed);
      
        return result.valueOf() as number;
    }
    else
    {
        return 0;
    }
}

export function theta(t: number) : number
{
    return t/2 * log(t/(2*pi), e) - t/2 - pi/8 + 1/(48*t) + 7/(5760*(pow(t, 3) as number));
}

console.log("test")