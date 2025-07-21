const ErrorInput = ({ error }: { error: string }) => {
  return <p className="text-xs -my-2 mb-2 text-start text-red-600">{error}</p>;
};

export default ErrorInput;
