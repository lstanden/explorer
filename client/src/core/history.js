
import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history = (process.env.BROWSER ? createHistory : createMemoryHistory)();

export default history;
