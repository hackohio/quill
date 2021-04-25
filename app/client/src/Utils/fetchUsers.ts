import useFetch, { STATUS } from './useFetch';

const USER_URL = '/api/users';
/**
 * Hook that returns current stats data.
 * Returns null while loading
 */
export default function fetchUsers() {
  const req = useFetch(USER_URL);
  console.log(req.data);
  if (req.status != STATUS.FETCHED) {
    return null;
  }

  return req.data;
}
