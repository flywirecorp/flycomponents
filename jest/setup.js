import 'raf/polyfill';
import 'core-js/stable';
import 'regenerator-runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
