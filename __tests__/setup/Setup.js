import { shallow, mount, render } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


global.shallow = shallow
global.render = render
global.mount = mount
