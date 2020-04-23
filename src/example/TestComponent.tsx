import React from "react";

import Form from "react-auto-form-core/dist/Form/Form";
import FormRenderer from "react-auto-form-core/dist/DefaultElement/SimpleFormRenderer";

import TextField from "react-auto-form-core/dist/DefaultElement/TextField";

export class Testing extends React.Component {
    private form: any;

    render(): React.ReactNode {
        return <Form ref={ref => this.form = ref} fields={[
            {as: TextField, name: 'username'},
            {as: TextField, name: 'password'}
        ]}

                     services={{formRenderer: form => new FormRenderer(form)}}
                     initialValues={{username: 'ali'}}
                     renderOptions={{
                         form: {
                             renderButton: (form: any) => {
                                 return <button onClick={() => {
                                     if (form.validate()) {
                                         form.submit();
                                     }
                                 }}>SAVE</button>
                             }
                         }
                     }}
                     submitConfig={{method: 'post', url: 'http://google.com'}}/>

    }
}