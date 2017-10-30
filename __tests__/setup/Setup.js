import { shallow, mount, render } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('NetInfo', () => {
  return {
    fetch: () => new Promise((accept, resolve) => { accept(true) }),
    addEventListener: jest.fn()
  }
});

global.shallow = shallow
global.render = render
global.mount = mount
