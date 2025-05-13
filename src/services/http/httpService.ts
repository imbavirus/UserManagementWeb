'use server';

export const callApiEndpoint = async (
  relativePath : string,
  method : string,
  body ?: object,
  queryParams ?: { [key : string] : string | number | boolean }
) => {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('API_BASE_URL is not configured in environment variables.');
  }

  let fullUrl = `${apiBaseUrl}${relativePath}`;

  // Append query parameters if needed
  if (queryParams) {
    const params = new URLSearchParams();
    for (const key in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        params.append(key, String(queryParams[key]));
      }
    }
    if (params.toString()) {
      fullUrl += `?${params.toString()}`;
    }
  }

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    try {
      const errorBody = await response.json();
      // Attempt to get a more specific message from your API's error response
      errorMessage = errorBody.message || errorBody.title || errorBody.detail || errorMessage;
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    throw new Error(errorMessage);
  }

  // Handle cases like 204 No Content where there's no JSON body
  if (response.status === 204) {
    return null;
  }
  return response.json();
};
