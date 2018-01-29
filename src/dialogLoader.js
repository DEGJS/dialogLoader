import dialogPolyfill from 'dialog-polyfill';

const dialogLoader = function(options = {}) {

    const defaults = {
        enableObservation: true,
        observedEl: document.body
    };
    
    const mutationConfig = {
        childList: true,
        attributes: false,
        characterData: false
    };

    const settings = {...defaults, ...options};

    function init() {
        initDialogsOnPage();
        if(settings.enableObservation === true){
            const observer = new MutationObserver(onMutation);
            observer.observe(settings.observedEl, mutationConfig);
        }
    }

    function initDialogsOnPage(){
        const dialogEls = [...document.querySelectorAll('dialog')];
        registerDialogs(dialogEls);
    }

    function onMutation(mutationsList){
        for(const mutation of mutationsList) {
            const dialogEls = getDialogEls(mutation);
            registerDialogs(dialogEls);
        }
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