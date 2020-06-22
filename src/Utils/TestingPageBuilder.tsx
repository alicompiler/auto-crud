import {CrudContextValue} from "../Root/CrudContext";
import {BasePageOptions} from "../Page/Base/BaseCrudPage/BasePageOptions";
import TextField from "react-auto-form-core/dist/DefaultElement/TextField";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import {mount} from "enzyme";

export default class TestingPageBuilder<T extends BasePageOptions = BasePageOptions> {

    private context?: CrudContextValue;
    private pageName?: string;
    private pageIndexName?: string;
    private component?: any;
    private options?: T;
    private props: any = {};
    private getState?: any;
    private updateState?: any;
    private updatePageOptions?: any;
    private refCallback?: (ref: any) => any;
    private fields?: any[];
    private toolbar?: any;
    private pageState?: any;


    public static contextTemplate: CrudContextValue = {
        config: {
            name: 'text',
            fields: [],
            endpointRoot: '/api/',
            indexPage: {name: 'index'},
            createPage: {name: 'create'},
            updatePage: {name: 'update'},
            deletePage: {name: 'delete'},
            detailsPage: {name: 'details'},
            pages: [],
        },
        state: {},
        updateState: () => null,
        updatePageOptions: () => null,
        getState: () => null
    }

    public setContext(context: any): TestingPageBuilder {
        this.context = context;
        return this;
    }

    public setToolbar(toolbar: any): TestingPageBuilder {
        this.toolbar = toolbar;
        return this;
    }

    public setHistoryProp(history: any): TestingPageBuilder {
        this.props.history = history;
        return this;
    }

    public setPageName(name: string): TestingPageBuilder {
        this.pageName = name;
        return this;
    }

    public setPageIndex(index: string): TestingPageBuilder {
        this.pageIndexName = index;
        return this;
    }

    public setComponent(component: any): TestingPageBuilder {
        this.component = component;
        return this;
    }


    public setOptions(options: T): TestingPageBuilder {
        this.options = options;
        return this;
    }

    public setGetState(func: any): TestingPageBuilder {
        this.getState = func;
        return this;
    }

    public setUpdateState(func: any): TestingPageBuilder {
        this.updateState = func;
        return this;
    }

    public setUpdatePageOptions(func: any): TestingPageBuilder {
        this.updatePageOptions = func;
        return this;
    }

    public setRefCallback(func: (ref  :any) => any): TestingPageBuilder {
        this.refCallback = func;
        return this;
    }

    public setFields(fields: any[]): TestingPageBuilder {
        this.fields = fields;
        return this;
    }

    public setDefaultFields(filedName: string = 'test'): TestingPageBuilder {
        this.fields = [{as: TextField, name: filedName}];
        return this;
    }

    public mount(): any {
        let context = this.buildContext();
        let props = this.buildComponentProps(context);
        props = {...props, ...this.props};

        const Component = this.component;
        if (!this.component) {
            throw Error("Component not found to mount");
        }


        return mount(<MemoryRouter>
            <Component {...props}/>
        </MemoryRouter>);
    }

    public buildComponentProps(context: any) {
        const props: any = {context: context};
        if (this.refCallback) {
            props.ref = this.refCallback;
        }
        if (this.pageName) {
            props.name = this.pageName;
        }
        return props;
    }


    public buildContext() {
        let context: any = this.context ?? JSON.parse(JSON.stringify(TestingPageBuilder.contextTemplate));
        if (this.pageIndexName) {
            if (this.options) {
                context.config[this.pageIndexName].options = this.options;
            }
            if (this.toolbar) {
                context.config[this.pageIndexName].toolbar = this.toolbar;
            }
        }
        if (this.pageName && this.pageState) {
            context.getState = () => ({uiState: {pages: {[this.pageName!]: this.pageState}}})
        }
        if (this.fields) {
            context.config.fileds = this.fields;
        }
        if (this.getState) {
            context.getState = this.getState;
        }
        if (this.updateState) {
            context.updateState = this.updateState;
        }
        if (this.updatePageOptions) {
            context.updatePageOptions = this.updatePageOptions;
        }
        return context;
    }

    public setPageState(pageState: any): TestingPageBuilder {
        this.pageState = pageState;
        return this;
    }
}