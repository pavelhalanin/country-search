export const app = () => {
    const selector = '#app';
    const div = document.querySelector(selector);
    if (!div) {
        throw new Error(`Node is not found: ${selector}`);
    }
    div.textContent = 'Hello, World!';
}