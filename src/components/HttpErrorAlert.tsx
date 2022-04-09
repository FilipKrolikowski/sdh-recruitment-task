type HttpErrorAlertProps = {
  error: string;
};

export const HttpErrorAlert = ({ error }: HttpErrorAlertProps): JSX.Element => {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};
