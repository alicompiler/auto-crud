import FormPage from "../../FormPage/FormPage";

class DeletePage extends FormPage {
    getInitialValues = () => {
        return this.getState().initialValues
    }
}

export default DeletePage;