import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import jsdom from 'jsdom';

enzyme.configure({ adapter: new Adapter() });

const _ref = typeof window !== 'undefined' ? window : global;
const { setTimeout } = _ref;
const { now } = _ref.Date;
// const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>')
const dom = new jsdom.JSDOM('<html><body><script></script></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.window.Date = Date;

declare global {
    interface Window {
        Date: any;
    }
}

window.Date = Date;
