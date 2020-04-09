interface IToolbarDefault {
    wrapperClassName: string;
    searchInputClassName: string;
    searchInputPlaceholder: string;
}

export const ToolbarDefaults: IToolbarDefault = {
    wrapperClassName: 'items-center flex justify-between',
    searchInputClassName: 'p-2 rounded border',
    searchInputPlaceholder: '',
};