export interface IDefaultsClassName {
    divider: string;
    curdRootHeader: {
        homeButton: string;
        homeButtonIcon: string;
        wrapper: string;
    };
    toolbar: {
        searchInput: string;
        wrapper: string;

    };
    titleWrapper: string;
    titleSeparator: string;
    subtitle: string;
    title: string;
    main_action: string;
    cancel_action: string;
    delete_action: string;

    toolbarActions: {
        createNavigationIcon: string;
        createButtonClassName: string;
        refreshButtonIcon: string;
        refreshButtonClassName: string;
    },

    components: {
        errorMessage: {
            action: string;
            wrapper: string
        };
        successMessage: {
            wrapper: string;
            action: string;
        };
        messageWithActions: {
            message: string;
        },
        singleActionMessage: {
            message: string;
        },
        noItemComponent: {
            action: string;
            wrapper: string;
        }
    }
}


export const classNameDefaults: IDefaultsClassName = {

    divider: 'my-2 h-px w-full bg-gray-300',

    curdRootHeader: {
        homeButton: 'px-4 py-2 text-xl text-white bg-blue-500 rounded',
        homeButtonIcon: 'fas fa-home',
        wrapper: 'flex justify-between items-center p-2',
    },

    toolbar: {
        searchInput: 'p-2 rounded border',
        wrapper: 'items-center flex justify-between',
    },

    titleWrapper: 'flex p-2',
    title: 'text-xl text-gray-700',
    subtitle: 'text-xl text-gray-500',
    titleSeparator: 'text-black font-bold text-xl mx-4',

    main_action: 'rounded py-2 px-4 bg-gray-700 text-white',
    cancel_action: 'rounded py-2 px-4 bg-gray-200 text-black',
    delete_action: 'rounded py-2 px-4 bg-red-400 text-white',

    toolbarActions: {
        createButtonClassName: 'bg-green-500 mx-2 rounded px-4 py-2 text-xl',
        createNavigationIcon: 'fas fa-plus text-white',
        refreshButtonClassName: 'bg-blue-500 mx-2 rounded px-4 py-2 text-xl',
        refreshButtonIcon: 'fas text-white fa-sync'
    },


    components: {
        errorMessage: {
            wrapper: 'p-4 bg-red-400 text-white flex items-center flex-col justify-center',
            action: 'rounded bg-red-200 px-4 py-2'
        },
        successMessage: {
            wrapper: 'p-4 bg-teal-400 text-white flex items-center flex-col justify-center',
            action: 'rounded bg-teal-200 px-4 py-2',
        },
        messageWithActions: {
            message: 'text-xl font-bold mb-4'
        },
        singleActionMessage: {
            message: 'text-xl',
        },
        noItemComponent: {
            action: 'rounded py-2 px-4 bg-red-200 text-black mt-4',
            wrapper: 'rounded bg-red-400 text-white text-center p-4'
        }
    },

}

