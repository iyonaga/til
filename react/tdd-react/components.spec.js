import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BeerListContainer from './components/BeerListContainer';
import InputArea from './components/InputArea';
import BeerList from './components/BeerList';

Enzyme.configure({ adapter: new Adapter() });


describe('BeerListContainer', () => {

  // アウトプットのテスト
  it('should render InputArea and BeerList', () => {
    const wrapper = shallow(<BeerListContainer/>);
    expect(wrapper.containsAllMatchingElements([
      <InputArea/>,
      <BeerList/>
    ])).to.equal(true);
  });

  // コンテナの状態のテスト
  it('sound start with an empty list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    expect(wrapper.state('beers')).to.eql([]);
  });

  // アイテムを追加する
  it('add items to the list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    wrapper.instance().addItem('Sam Adams');
    expect(wrapper.state('beers')).to.eql(['Sam Adams']);
  });

  // 関数を渡す
  it('passes addItem to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    expect(inputArea.prop('onSubmit')).to.eql(addItem);
  });

  // バインディングを確かめる
  it('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Sam Adams');
    expect(wrapper.state('beers')).to.eql(['Sam Adams']);
  });

  // アイテムのレンダリング
  // it('renders the items', () => {
  //   const wrapper = mount(<BeerListContainer/>);
  //   wrapper.instance().addItem('Sam Adams');
  //   wrapper.instance().addItem('Resin');
  //   expect(wrapper.find('li').length).to.equal(2);
  // });
});


describe('InputArea', () => {

  // Inputareaをポピュレートする
  it('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea/>);
    expect(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>
    ])).to.equal(true);
  });

  // 入力を受け取る
  it('should accept input', () => {
    const wrapper =  mount(<InputArea/>);
    const input = wrapper.find('input');
    input.simulate('change', {target: { value: 'Resin' }});
    expect(wrapper.state('text')).to.equal('Resin');
    // expect(input.prop('value')).to.equal('Resin');
  });

  // 「Add」ボタンを有効化する
  it('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({text: 'Octoberfest'});
    const addButton = wrapper.find('button');

    addButton.simulate('click');

    expect(addItemSpy.calledOnce).to.equal(true);
    expect(addItemSpy.calledWith('Octoberfest')).to.equal(true);
  });
})


describe('BeerList', () => {
  it('should render zero items', () => {
    const wrapper = shallow(<BeerList items={[]}/>);
      expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render undefined items', () => {
    const wrapper = shallow(<BeerList items={undefined}/>);
      expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render some items', () => {
    const items = ['A', 'B', 'C'];
    const wrapper = shallow(<BeerList items={items}/>);
      expect(wrapper.find('li')).to.have.length(3);
  });

})
