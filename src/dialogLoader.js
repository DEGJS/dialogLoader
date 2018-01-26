import dialogPolyfill from 'dialog-polyfill';

const dialogLoader = function() {
    
    const mutationConfig = {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
        attributeFilter: false
    };

    function init() {
        initDialogsOnPage();
        const observer = new MutationObserver(onMutation);
        observer.observe(document.body, mutationConfig);
    }

    function initDialogsOnPage(){
        const dialogEls = Array.from(document.querySelectorAll('dialog'));
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
        dialogEls.forEach( (dialogItem) => {
            dialogPolyfill.registerDialog(dialogItem);
        })
    }

    init();
};

export default dialogLoader;