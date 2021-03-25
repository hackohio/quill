import { User } from '../Types/UserType';
import useFetch, { STATUS } from './useFetch';

const USER_URL = '/api/user';

/**
 * Hook that returns current user data.
 * Returns null while loading
 */
export default function useCurrentUser(): User | null {
  const userData = useFetch(USER_URL);

  if (userData.status != STATUS.FETCHED) {
    return null;
  }
  return userData.data as User;
}
