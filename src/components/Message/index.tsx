
type ErrorMessageProps = {
    error: string | undefined
}


function ErrorMessage({error}: ErrorMessageProps) {

    return (
        <small className="text-red-600">{error}</small>
    )

}

export default ErrorMessage