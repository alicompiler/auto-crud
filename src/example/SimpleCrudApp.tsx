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
                          endpointRoot={'http://localhost:8080/api/books/'}
                          fields={[
                              {
                                  as: TextField,
                                  name: 'name',
                                  placeholder: 'Name',
                                  validationRules: {length: {minimum: 2}},
                              },
                              {
                                  as: TextField,
                                  name: 'author',
                                  placeholder: 'Author',
                                  validationRules: {length: {minimum: 2}}
                              },
                              {as: TextArea, name: 'description', placeholder: 'Write Some Description...'},
                          ]}
                          mainTitle='Books'
                />
            </div>
        );
    }
}

export default SimpleCrudApp;