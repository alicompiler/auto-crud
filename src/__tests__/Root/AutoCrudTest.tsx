import AutoCrud from "../../Root/AutoCrud";
import * as React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {IndexPage} from "../../Page/CrudPage/Index/IndexPage";
import CreatePage from "../../Page/CrudPage/Create/CreatePage";
import UpdatePage from "../../Page/CrudPage/Update/UpdatePage";
import DeletePage from "../../Page/CrudPage/DeletePage/DeletePage";
import DetailsPage from "../../Page/CrudPage/Details/DetailsPage";
import {MemoryRouter} from "react-router-dom";
import CrudRootHeader from "../../Components/CrudRootHeader/CrudRootHeader";
import CrudLayout from "../../Root/CrudLayout";


configure({adapter: new Adapter()});

describe('AutoCrud', () => {

    it('should setup config', function () {
        let instance: AutoCrud | null = null;
        mount(
            <MemoryRouter>
                <AutoCrud ref={ref => instance = ref} endpointRoot={'http://localhost:8080'} name={'books'}
                          fields={[]}/>
            </MemoryRouter>
        );
        const context = instance!.getContextValue();
        expect(String(context.config)).toEqual({
            name: 'books',
            header: () => <CrudRootHeader/>,
            layout: () => <CrudLayout/>,
            endpointRoot: 'http://localhost:8080',
            routeRoot: '/books',
            fields: [],
            indexPage: {route: '/books', pageComponent: IndexPage, skip: false, options: {}, name: 'index'},
            createPage: {route: '/books/create', pageComponent: CreatePage, skip: false, options: {}, name: 'create'},
            updatePage: {route: '/books/edit', pageComponent: UpdatePage, skip: false, options: {}, name: 'update'},
            deletePage: {route: '/books/remove', pageComponent: DeletePage, skip: false, options: {}, name: 'delete'},
            detailsPage: {
                route: '/books/details',
                pageComponent: DetailsPage,
                skip: false,
                options: {},
                name: 'details'
            },
            pages: [],
        }.toString());
    });

    it('should setup ui state', function () {
        let instance: AutoCrud | null = null;
        mount(
            <MemoryRouter>
                <AutoCrud ref={ref => instance = ref} endpointRoot={'http://localhost:8080'} name={'books'}
                          fields={[]}/>
            </MemoryRouter>
        );
        const state = instance!.getContextValue().getState();
        expect(state.uiState).toEqual({
            pages: {
                index: {}, create: {}, update: {}, delete: {}, details: {}
            },
            modals: {}
        });
    });

    it('should update state', function (done) {
        let instance: AutoCrud | null = null;
        mount(
            <MemoryRouter>
                <AutoCrud ref={ref => instance = ref} endpointRoot={'http://localhost:8080'} name={'books'}
                          fields={[]}/>
            </MemoryRouter>
        );

        instance!.getContextValue().updateState({uiState: {pages: {index: {test: true}}}}, (state: any) => {
            expect(state.uiState.pages.index).toEqual({test: true});
            done();
        });
    });

    it('should update page options', function (done) {
        let instance: AutoCrud | null = null;
        mount(
            <MemoryRouter>
                <AutoCrud ref={ref => instance = ref} endpointRoot={'http://localhost:8080'} name={'books'}
                          fields={[]}/>
            </MemoryRouter>
        );

        instance!.getContextValue().updatePageOptions('index', {test: true}, () => {
            expect(instance!.getContextValue().config.indexPage.options).toEqual({test: true});
            expect(instance!.getContextValue().state.config.indexPage.options).toEqual({test: true});
            done();
        });
    });

});