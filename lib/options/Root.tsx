import * as React from 'react';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';

const StyledRoot = styled.div`
  color: blue;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;
`;

const Textarea = styled.textarea`
  display: block;
  resize: none;
  width: 600px;
`;

const ResultGroup = styled.div``;

const Root = () => {
  return (
    <StyledRoot>
      <GlobalStyle />
      <Wrapper>
        <Textarea />
        <button>convert</button>
        <ResultGroup>
          <div>3</div>
          <div>4</div>
        </ResultGroup>
      </Wrapper>
    </StyledRoot>
  );
};


export default Root;
