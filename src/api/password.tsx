const forgotPassword = async (email: string) => {
  const response = await fetch(`/api/v1/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
const resetPassword = async (params: { token: string | undefined, password: string }) => {
  const response = await fetch(`/api/v1/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      token: params.token,
      password: params.password,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
export {
  forgotPassword,
  resetPassword,
};