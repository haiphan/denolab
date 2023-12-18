function sol(arr: [string, number, string][]) {
    const vertices: [number, number][] = [[0, 0]];
    const deltas = {U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1]};
    let b = 0;
    for(const l of arr) {
        const [d, s] = l;
        b += s;
        const [dr, dc]: number[] = deltas[d] || [0, 0];
        const [r, c] = vertices[vertices.length - 1];
        vertices.push([r + s * dr, c + s * dc]);
    }
    const L = vertices.length;
    const AREA = vertices.reduce((acc, [r, c], i) => {
        const [pp, np] = [vertices[(i - 1 + L) % L], vertices[(i + 1) % L]];
        const [, pc] = pp;
        const [, nc] = np;
        acc += (r * (pc - nc));
        if (i === L - 1) acc = Math.abs(acc / 2);
        return acc;
    }, 0);
    const INTER = AREA - b / 2 + 1;
    const total = b + INTER;
    console.log('tt', total);//47527
    return total;
}

export async function main(s: string) {
    const text = await Deno.readTextFile("./input.txt");
    const lines: [string, number, string][] = text.split('\n').map(l => {
        const [d,s,c] = l.split(' ');
        const sn = Number(s);
        return [d, sn, c] as [string, number, string];
    });
    sol(lines);
}

main('abcdefgac');
