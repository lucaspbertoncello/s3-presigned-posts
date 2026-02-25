type ResponseParams = {
  statusCode: number;
  body?: Record<string, unknown> | string;
};

export function response(params: ResponseParams) {
  let body = "";
  if (params.body !== undefined) {
    if (typeof params.body === "string") {
      body = params.body;
    } else {
      body = JSON.stringify(params.body);
    }
  }

  return {
    statusCode: params.statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
}
