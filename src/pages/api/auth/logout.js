export default async function logout(req, res) {
  try {
    // Clear the user's session (e.g., remove JWT token or session cookie)
    // You may also want to invalidate the token on the server if necessary

    // For example, to clear a cookie:
    res.setHeader('Set-Cookie', 'yourAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict');

    // Respond with a success message or status code
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
