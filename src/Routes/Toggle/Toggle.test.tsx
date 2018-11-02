import * as React from 'react';
import { shallow, CommonWrapper } from 'enzyme';
import Toggle from './Toggle';

describe('Toggle component tests ', () => {
  const textContent = 'some test is here';
  const props = {
    children: jest.fn(() => <div>{textContent}</div>),
  };
  let wrapper: CommonWrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<Toggle {...props} />);
  });

  it('should call props.children with { toggle, isOpen }', () => {
    expect(props.children).toBeCalledTimes(1);
    expect(props.children).toHaveBeenCalledWith({
      isOpen: false,
      toggle: expect.any(Function),
    });
  });

  it('should render whatever children returns', () => {
    expect(wrapper.contains(<div>{textContent}</div>)).toEqual(true);
  });

  it('should toggle isOpen state when toggle method is called', () => {
    const { toggle } = props.children.mock.calls[0][0];
    const event = { preventDefault: () => { ''; } };

    toggle(event);

    expect(props.children).toHaveBeenCalledTimes(2);
    expect(props.children).toHaveBeenCalledWith({
      isOpen: true,
      toggle: expect.any(Function),
    });
  });
});
