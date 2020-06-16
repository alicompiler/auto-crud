export interface IDefaultLocalization {
    save: string;
    refresh: string;
    toggle: string;
    are_you_sure: string;
    operation_failed: string;
    operation_done_successfully: string;
    confirmation_fail_message: string;
    confirmation_message: string;

    fail_to_delete_message: string;
    are_you_sure_of_delete: string;
    delete_success_message: string;

    no_item_selected: string;


    cancel: string;
    delete: string;
    main: string;
    confirmation: string;

    loading_data: string,
    fail_to_fetch_data: string,
    data_empty: string,
    try_again: string,
    search: string;
}

export const localizationDefaults: IDefaultLocalization = {
    save: 'Save',
    refresh: 'Refresh',
    toggle: "Toggle",
    are_you_sure: "Are You Sure",
    confirmation_fail_message: 'confirmation code is not correct',
    confirmation_message: 'enter confirmation code',
    fail_to_delete_message: 'delete action failed, check your internet connection and try again',
    are_you_sure_of_delete: 'are you sure of the delete action?',
    delete_success_message: 'data has been deleted!',
    cancel: 'Cancel',
    delete: 'Delete',
    main: 'Main',
    confirmation: 'Confirmation',
    data_empty: 'Data Empty',
    fail_to_fetch_data: 'Fail To Fetch Data',
    loading_data: 'Loading Data...',
    try_again: 'Try Again',
    search: 'Search',
    no_item_selected: 'No Item Selected',
    operation_done_successfully: 'Operation Done Successfully',
    operation_failed: 'Operation Failed'

}