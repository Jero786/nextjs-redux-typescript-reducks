export const toggler = (collection = [], item) => {
    const idx = collection.indexOf(item);
    if (idx !== -1) {
        collection.splice(idx, 1);
    } else {
        collection.push(item);
    }
    return collection;
};

/**
 * Retrieve the matcher ancestor which contain given {@param className}.
 * @param el
 * @param className
 * @returns {*}
 */
export const getElementByClassName = (el, className) => {
    const maxStack = 10; // prevent transfers so far
    let stackIndex = 0;

    while (el && el.classList && !el.classList.contains(className) && stackIndex < maxStack) {
        stackIndex++;
        el = el.parentElement;
    }

    return el && el.classList && el.classList.contains(className) ? el : null;
};
