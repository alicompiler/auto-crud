import React, {Component} from 'react';
import CrudRoot from "../root/CrudRoot";
import {AxiosDataSource} from "auto-collection";
import {IndexPage} from "../Page/CrudPage/Index/IndexPage";

class SimpleCurdApp extends Component {
    render() {
        return (
            <div>
                <CrudRoot name={'books'} collections={[]} modals={[]} operations={[]} routeRoot={'/books'}
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