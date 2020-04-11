import React, {Component} from 'react';
import AutoCrud from "../Root/AutoCrud";
import {AxiosDataSource} from "auto-collection";
import {IndexPage} from "../Page/CrudPage/Index/IndexPage";
import CreatePage from "../Page/CrudPage/Create/CreatePage";
import TextField from "raf-tailwind-components/dist/TextField/TextField";
import TextArea from "raf-tailwind-components/dist/TextAreaField/TextAreaField";

class SimpleCurdApp extends Component {
    render() {
        return (
            <div>
                <AutoCrud name={'books'}
                          routeRoot={'/books'}
                          endpointRoot={'http://localhost:8080/api/books'}
                          fields={[
                              {as: TextField, name: 'name'},
                              {as: TextField, name: 'author'},
                              {as: TextArea, name: 'description'},
                          ]}
                          createPage={{
                              name: 'create',
                              route: '/create',
                              options: {pageTitle: 'Create'},
                              pageComponent: {
                                  as: CreatePage,
                              }
                          }}
                          indexPage={{
                              name: 'index',
                              route: '/',
                              options: {
                                  dataSource: new AxiosDataSource({
                                      url: 'https://api.npoint.io/b8cab438591b6a238751',
                                      method: 'get'
                                  }),
                                  onSearch: (value: any) => console.log('onSearch', value),
                                  renderOptionsConfig: {
                                      overrideColumns: {
                                          id: {
                                              name: 'id',
                                              title: 'OPEN',
                                              cellClassName: 'bg-red-400'
                                          }
                                      }
                                  },
                                  pageTitle: 'Main'
                              },

                              pageComponent: {
                                  as: IndexPage
                              }
                          }}
                          mainTitle='Books'
                />
            </div>
        );
    }
}

export default SimpleCurdApp;