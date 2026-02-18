import { isAxiosError } from "axios";

export const handleApiError = (error: unknown): string => {
  if (isAxiosError(error)) {
    console.log("Axios error detected!");

    const response = error.response;

    if (response) {
      const { status, data } = response;

      console.log(data);

      switch (status) {
        case 400:
          return (
            data?.error?.message ||
            JSON.stringify(data?.error) || // Stringify generic error objects
            data?.message || // Handle simple error messages
            "Bad Request"
          );
        case 401:
          return data?.message || "Unauthorized User!";
        case 403:
          return data?.message || "Forbidden";
        case 404:
          return data?.message || data || "Resource not found";
        case 409:
          return data?.message || "A duplicate already exists";
        case 422:
          return JSON.stringify(data) || "Validation error";
        default:
          return data?.message || "An unexpected error occurred";
      }
    }

    return "Network error or server did not respond";
  }

  if (error instanceof Error) {
    return error.message || "Network error or server did not respond";
  }

  return "An unknown error occurred";
};
