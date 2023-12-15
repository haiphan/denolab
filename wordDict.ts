export function main(s: string) {
    const charSet = new Set();
    for (const c of s) {
        charSet.add(c);
    }
    console.log(charSet);
}

main('abcdefgac');
