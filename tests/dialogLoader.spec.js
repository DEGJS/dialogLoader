jest.mock('dialog-polyfill');

import mutationObserver from './__mocks__/mutationObserver.js';
import dialogPolyfill from 'dialog-polyfill';

beforeAll(() => {
    const dialogHTML = `<dialog></dialog>`;
    global.document.body.insertAdjacentHTML('beforeend', dialogHTML);
})

describe('dialogLoader', () => {

    afterEach(() => {
        dialogPolyfill.registerDialog.mockClear();
    })

    it('should register dialogs currently on page', () => {
        const dialogHTML = `<dialog></dialog>`;
        global.document.body.insertAdjacentHTML('beforeend', dialogHTML);

        require('../src/dialogLoader');
        expect(dialogPolyfill.registerDialog).toHaveBeenCalled();
        expect(dialogPolyfill.registerDialog).toHaveBeenCalledTimes(2);
    });

    it('should register dialogs added to page', () => {
        const dialogEl = document.createElement('dialog');
        mutationObserver.__mutate(dialogEl);

        expect(dialogPolyfill.registerDialog).toHaveBeenCalled();
        expect(dialogPolyfill.registerDialog).toHaveBeenCalledTimes(1);
    });
});