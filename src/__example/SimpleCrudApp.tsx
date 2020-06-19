import React, {Component} from 'react';
import AutoCrud from "../Root/AutoCrud";
import TextField from "raf-tailwind-components/dist/TextField/TextField";
import TextArea from "raf-tailwind-components/dist/TextAreaField/TextAreaField";
import ToggleActionPage from "../Page/Base/ToggleActionPage";

class SimpleCrudApp extends Component {
    render() {
        return (
            <div>
                <AutoCrud name={'books'}
                          mainTitle={'Books'}
                          endpointRoot={'http://localhost:8080/books/'}
                          pages={[
                              {
                                  name: 'toggle', route: '/toggle', options: {
                                      action: {
                                          icon: 'fas fa-save text-xl',
                                          className: 'inline-flex items-center justify-center bg-gray-600 px-4 py-2 rounded w-16 text-white'
                                      }
                                  }, pageComponent: ToggleActionPage
                              }
                          ]}
                          updatePage={{options: {action: {hideInPage: true}}}}
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
                              {
                                  as: TextArea,
                                  name: 'email',
                                  placeholder: 'Write Some Description...'
                              },
                          ]}
                />
            </div>
        );
    }
}

export default SimpleCrudApp;