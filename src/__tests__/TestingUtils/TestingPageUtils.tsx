import {CrudContextValue} from "../../Root/CrudContext";
import TextField from "react-auto-form-core/dist/DefaultElement/TextField";
import {MemoryRouter} from "react-router-dom";
import {mount} from "enzyme";
import React from "react";

export class TestingPageUtils {

    public static cloneContextForPage(context: any, pageIndexName: string, fields: any[], options?: any): CrudContextValue {
        const _context = JSON.parse(JSON.stringify(context));
        let pageOptions = {pageTitle: ''};
        if (options) {
            pageOptions = {...pageOptions, ...options};
        }
        _context.config[pageIndexName].options = pageOptions;
        _context.config.fields = fields ?? [];
        _context.getState = () => ({uiState: {pages: {}}});
        return _context;
    }

    public static cloneContextForFormPage(pageIndexName: string, fields?: any[], context?: any, options?: any, fieldName: string = "test"): CrudContextValue {
        if (!context) {
            context = TestingPageUtils.contextTemplate;
        }
        if (!fields) {
            fields = [{as: TextField, name: fieldName}];
        }
        return TestingPageUtils.cloneContextForPage(context, pageIndexName, fields, options);
    }

    public static contextTemplate: CrudContextValue = {
        config: {
            name: 'text',
            fields: [],
            endpointRoot: '/base-api/',
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


    public static getPageJSXComponent(context: any, component: any, pageName: any, ref?: any) {
        const ComponentPage = component;
        return <MemoryRouter>
            <ComponentPage ref={ref} name={pageName} context={context} history={(() => null) as any}
                           location={{} as any}
                           match={{} as any}/>
        </MemoryRouter>
    }

    public static getMountedPage(pageIndexName: string, pageName: string, component: any, componentNameAsString: string, ref?: any, context?: any,) {
        if (!context) {
            context = TestingPageUtils.cloneContextForFormPage(pageIndexName);
        }
        const pageWrapper = mount(TestingPageUtils.getPageJSXComponent(context, component, pageName, ref));
        const page: any = pageWrapper.find(componentNameAsString).getElement();
        return {
            wrapper: pageWrapper,
            page: page
        };
    }
}