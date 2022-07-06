
export const importAll = (r) => {
    let files = [];
    let keys = r.keys()
    keys.slice(0, keys.length ).map((item, index) => { files[index] = r(item).default; });
    return files;
}
