export const createError = (error: unknown, response?: Response) => {
  console.log("createError", error, response);
};

export const getRequestHeaders = (csrfToken?: string, cookies?: string[]) => {
  return {
    "Content-Type": "application/json",
    ...(!!csrfToken && { "X-XSRF-TOKEN": csrfToken }),
    ...(cookies?.length && {
      Cookie: `${cookies.join(";")}`,
    }),
  };
};
