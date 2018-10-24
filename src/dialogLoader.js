import dialogPolyfill from 'dialog-polyfill';

const dialogLoader = function() {

    const mutationConfig = {
        childList: true,
        attributes: false,
        characterData: false
    };

    const observedEl = document.body;

    function init() {
        initDialogsOnPage();
        if (window.MutationObserver) {
            const observer = new MutationObserver(onMutation);
            observer.observe(observedEl, mutationConfig);
        }
    }

    function initDialogsOnPage(){
        const dialogEls = [...document.querySelectorAll('dialog')];
        registerDialogs(dialogEls);
    }

    function onMutation(mutationsList){
        mutationsList.forEach(mutation => {
            const dialogEls = getDialogEls(mutation);
            registerDialogs(dialogEls);
        });
    }

    function getDialogEls(mutation){
        const addedEls = [...mutation.addedNodes];
        return addedEls.filter(el => el.nodeName.toLowerCase() === 'dialog');
    }

    function registerDialogs(dialogEls){
        dialogEls.forEach(dialogItem => dialogPolyfill.registerDialog(dialogItem));
    }

    init();
};

const instance = dialogLoader();

export default instance;