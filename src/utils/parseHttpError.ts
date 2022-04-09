type Error = {
  response: {
    data: {
      message: string;
    };
  };
};

export const parseHttpError = (error: Error | undefined) => {
  return error?.response?.data?.message || "Something went wrong, please try again.";
};
