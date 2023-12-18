export async function main(s: string) {
    const text = await Deno.readTextFile("./input.txt");
    const lines = text.split('\n');
    console.log(lines);
}

main('abcdefgac');
