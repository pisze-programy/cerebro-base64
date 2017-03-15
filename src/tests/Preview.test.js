import React from 'react';
import expect from 'expect';
import { mount }  from 'enzyme';
import Preview from '../Preview';

describe('Preview component tests:', () => {
  const method = "ENCODE";

  const component = mount(<Preview method={method.toLowerCase()} />);

  it('Should render Preview component', () => {
    expect(component.length).toBeTruthy();
  });

  it('Should have one div child', () => {
    expect(component.find('div').length).toEqual(1);
  });

  it('Should show have h1 with lowercase string', () => {
    expect(component.find('div').find('h1').text()).toEqual('encode');
  });

  it('Should show have p with string', () => {
    expect(component.find('div').find('p').text().length).toBeTruthy();
  });

  it('Should show have p with method inside', () => {
    expect(component.find('div').find('p').text().match(/(.+)\encode/i)).toBeTruthy();
  });

  it('Should not show loading', () => {
    expect(component.find('div.loading').exists()).toBe(false);
  });

  it('Should show loading', () => {
    const componentWithLoading = mount(
      <Preview />
    );

    expect(componentWithLoading.find('div.loading').length).toBeTruthy();
  });
});
