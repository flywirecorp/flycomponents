import React from 'react';
import { shallow, mount } from 'enzyme';
import { Rating, Star } from './Rating';

describe('Rating', () => {
  const props = {
    rating: '3'
  };

  test('renders the stars', () => {
    const wrapper = shallow(<Rating {...props} />);
    const stars = wrapper.find(Star);

    expect(stars.length).toEqual(5);
  });

  test('displays received errors', () => {
    const ownProps = { ...props, errorText: 'An error' };
    const wrapper = mount(<Rating {...ownProps} />);
    const firstStar = wrapper.find(Star).first();

    expect(firstStar.find('.error').length).toEqual(1);
  });

  test('doest not display an error if no error received', () => {
    const wrapper = shallow(<Rating {...props} />);
    const firstStar = wrapper.find(Star).first();

    expect(firstStar.hasClass('error')).toEqual(false);
  });

  test('calls onclick with the star value', async () => {
    const starStub = { target: { getAttribute: () => 4 } };
    const onClick = jest.fn();
    const ownProps = { ...props, onClick };
    const wrapper = shallow(<Rating {...ownProps} />);
    const star = wrapper.find(Star).first();
    star.simulate('click', starStub);

    expect(onClick).toHaveBeenCalledWith(4);
  });
});
