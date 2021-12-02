/** @format */

const ErrorMessage = (props) => {
    const { touched, errors } = props;

    return (
        <>
            <p className="signin-error">{touched && errors}</p>
        </>
    );
};

export default ErrorMessage;
