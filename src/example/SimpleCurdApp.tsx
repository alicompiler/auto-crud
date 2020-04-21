import React, {Component} from 'react';
import AutoCrud from "../Root/AutoCrud";
import {AxiosDataSource} from "auto-collection";
import TextField from "raf-tailwind-components/dist/TextField/TextField";
import TextArea from "raf-tailwind-components/dist/TextAreaField/TextAreaField";

class SimpleCurdApp extends Component {
    render() {
        return (
            <div>
                <AutoCrud name={'books'}
                          routeRoot={'/books'}
                          endpointRoot={'http://localhost:8080/api/books/'}
                          fields={[
                              {as: TextField, name: 'name', placeholder: 'Name'},
                              {as: TextField, name: 'author', placeholder: 'Author'},
                              {as: TextArea, name: 'description', placeholder: 'Write Some Description...'},
                          ]}
                          createPage={{options: {pageTitle: 'Create'}}}
                          indexPage={{
                              name: 'index',
                              options: {
                                  url: '',
                                  pageTitle: 'Main'
                              },
                          }}
                          mainTitle='Books'
                />
            </div>
        );
    }
}

export default SimpleCurdApp;