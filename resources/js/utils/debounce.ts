//create a proper typed debounce function
export function debounce<T extends (...args: any[]) => any>(func: T, wait = 500) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}