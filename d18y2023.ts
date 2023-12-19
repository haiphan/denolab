function caclArea(mt: string[][]) {
    const [NR, NC] = [mt.length, mt[0].length];
    const outside: number[][] = [];
    const dfs = (r: number, c: number, d: number) => {
        if (r < 0 || r >= NR || c < 0 || c >= NC) return;
        if (mt[r][c] !== '.') return;
        if (d > 100) {
            outside.push([r, c]);
            return;
        }
        mt[r][c] = 'X';
        dfs(r - 1, c, d + 1);
        dfs(r + 1, c, d + 1);
        dfs(r, c - 1, d + 1);
        dfs(r, c + 1, d + 1);
    };
    for (let i = 0; i < NR; i++) {
        dfs(i, 0, 0);
        dfs(i, NC - 1, 0);
    }
    for (let i = 0; i < NC; i++) {
        dfs(0, i, 0);
        dfs(NR - 1, i, 0);
    }
    console.log('rm', outside.length);
    while (outside.length) {
        const last = outside.pop();
        if (!last) break;
        const [r, c] = last;
        dfs(r, c, 0);
    }
    console.log('rmdone');
    let cnt = 0;
    for (let i = 0; i < NR; i++) {
        for (let j = 0; j < NC; j++) {
            if (mt[i][j] !== 'X') cnt++;
        }
    }
    console.log('fill', cnt);
    // paintMt(mt)
}

function paintMt(mt: string[][]) {
    for (const r of mt) {
        console.log(r.join(''));
    }
}

function draw(vertices: [number, number][]) {
    const minX = Math.min(...vertices.map(p => p[0]));
    const minY = Math.min(...vertices.map(p => p[1]));
    const maxX = Math.max(...vertices.map(p => p[0]));
    const maxY = Math.max(...vertices.map(p => p[1]));
    const mt = Array(maxY - minY + 1).fill(0).map((_r) => Array(maxX - minX + 1).fill('.'));
    vertices.forEach((v, i) =>{
        const [x, y] = v;
        const np = vertices[i+1];
        if (!np) return;
        const [nx, ny] = np;
        if (x === nx) {
            const [ly, hy] = [Math.min(y, ny), Math.max(y, ny)];
            for (let j = ly; j <= hy; j++) {
                mt[j - minY][x - minX] = '#';
            }
            return;
        }
        const [lx, hx] = [Math.min(x, nx), Math.max(x, nx)];
        for (let j = lx; j <= hx; j++) {
            mt[y - minY][j - minX] = '#';
        }
    });
    console.log('RC', mt.length, mt[0].length);
    caclArea(mt);
    // for (const r of mt) {
    //     console.log(r.join(''));
    // }

}

function sol(arr: [string, number, string][]) {
    const vertices: [number, number][] = [[0, 0]];
    const deltas: Record<string, number[]> = {U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1]};
    console.time('perf');
    let b = 0;
    for(const l of arr) {
        const [d, s] = l;
        b += s;
        const [dr, dc]: number[] = deltas[d] || [0, 0];
        const [r, c] = vertices[vertices.length - 1];
        vertices.push([r + s * dr, c + s * dc]);
    }
    // const minx = Math.min(...vertices.map(p => p[0]));
    // const miny = Math.min(...vertices.map(p => p[1]));
    // const maxx = Math.max(...vertices.map(p => p[0]));
    // const maxy = Math.max(...vertices.map(p => p[1]));
    // console.log('mxy', minx, miny)
    // console.log('Mxy', maxx, maxy)
    const L = vertices.length;
    const AREA = vertices.reduce((acc, [r], i) => {
        const [pp, np] = [vertices[(i - 1 + L) % L], vertices[(i + 1) % L]];
        const [, pc] = pp;
        const [, nc] = np;
        acc += (r * (pc - nc));
        if (i === L - 1) acc = Math.abs(acc / 2);
        return acc;
    }, 0);
    const INTER = AREA - b / 2 + 1;
    const total = b + INTER;
    console.timeEnd('perf');
    console.log('tt', total);//47527
    draw(vertices);
    return total;
}

export async function main() {
    const text = await Deno.readTextFile("./input.txt");
    const lines: [string, number, string][] = text.split('\n').map(l => {
        const [d,s,c] = l.split(' ');
        const sn = Number(s);
        return [d, sn, c] as [string, number, string];
    });
    sol(lines);
}

main();
