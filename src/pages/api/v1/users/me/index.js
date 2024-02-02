import { defaultHandler, unauthorized } from '@/utils/server/api-helpers'
import User from '@/models/User'

export async function getServerSideProps(context) {
  const { profileID } = context.params;

  // Extract session and query parameters from the context
  const { req, res, query, session } = context;

  // Check if the session exists and matches the query parameter
  if (!session || session.user.email !== query.userid) {
    return {
      redirect: {
        destination: '/login', // Redirect to login page if session doesn't exist or doesn't match
        permanent: false,
      },
    };
  }

  try {
    // Fetch user data based on the query parameter
    const user = await User.findById(query.userid);

    if (!user) {
      return {
        notFound: true, // Return 404 if user is not found
      };
    }

    // Pass user data as props to the component
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      props: {
        error: 'Server Error',
      },
    };
  }
}

const handler = async (req, res) =>
  defaultHandler(
    req,
    res,
    {
      GET: getServerSideProps,
    },
    {
      requiresAuth: true,
      requiresAdmin: false,
    }
  )

export default handler
