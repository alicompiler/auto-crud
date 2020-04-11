export interface ICrudRootHeaderDefaults {
    wrapperClassName: string;
    homeButtonClassName: string;
    homeButtonIconClassName: string;
    renderButton?: () => any;
}


export const CrudRootHeaderDefault: ICrudRootHeaderDefaults = {
    wrapperClassName: 'flex justify-between',
    homeButtonClassName: 'px-4 py-2 text-xl text-white bg-blue-500 rounded',
    homeButtonIconClassName: `fas fa-home`,
};