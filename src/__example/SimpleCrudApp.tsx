import React, {Component} from 'react';
import AutoCrud from "../Root/AutoCrud";
import TextField from "raf-tailwind-components/dist/TextField/TextField";
import TextArea from "raf-tailwind-components/dist/TextAreaField/TextAreaField";

class SimpleCrudApp extends Component {
    render() {
        return (
            <div>
                <AutoCrud name={'books'}
                          routeRoot={'/books'}
                          endpointRoot={'http://localhost:8080/books/'}
                          fields={[
                              {
                                  as: TextField,
                                  name: 'name',
                                  placeholder: 'Name',
                                  validationRules: {length: {minimum: 2}},
                              },
                              {
                                  as: TextField,
                                  name: 'phone',
                                  placeholder: 'Phone',
                                  validationRules: {length: {minimum: 2}}
                              },
                              {as: TextArea, name: 'email', placeholder: 'Write Some Description...'},
                          ]}
                          deletePage={{options: {confirmationRequired: true}}}
                          mainTitle='Books'
                />
            </div>
        );
    }
}

export default SimpleCrudApp;