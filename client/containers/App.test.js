import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import App from './App.js';

describe("App", () => {
  it("should render Hello from React!!", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual(<h1>Hello from React!!</h1>);
  });
});
