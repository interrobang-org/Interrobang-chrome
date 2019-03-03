import * as React from 'react';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';

const textareaPlaceholder = 
`Live coverage of the rendezvous and docking aired on NASA television and the agency\'s website, with the next highlight due at about 8:30 a.m. Eastern with the hatch opening. It’s been a big weekend for commercial spaceflight. Tourists flocked to the Kennedy Space Center in Florida to watch the launch of the Falcon 9 rocket at 2:49 a.m. Saturday. President Donald Trump congratulated SpaceX in a tweet Saturday afternoon.

The inaugural flight, known as Demo-1, is an important mission designed to test the end-to-end capabilities of the new system, NASA said. It paves the way for Demo-2, a test flight with a crew to carry NASA astronauts Bob Behnken and Doug Hurley to the ISS. That flight is currently slated for July.

Crew Dragon will remain connected to the space station for five days, and will depart on Friday. The mission will not be complete until the spacecraft safely departs from the station and deploys parachutes as part of its splashdown in the Atlantic Ocean.

In 2014, NASA awarded SpaceX and Boeing combined contracts worth as much as $6.8 billion to fly U.S. astronauts to the space station. The agency chose two companies for the unique public-private partnership to assure safe, reliable and cost-effective access to space while avoiding the perils of one provider having a monopoly. The U.S. government is also eager to have the ability to fly to the ISS without buying seats on Russian Soyuz capsules.`;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  width: 705px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 20px;
`;

const Textarea = styled.textarea`
  border: 1px solid #a2a2a2;
  border-radius: 3px;
  display: block;
  font-size: 13px;
  height: 250px;
  margin: 20px 0 10px;
  outline: none;
  padding: 6px 7px;
  resize: none;
  width: 100%;
`;

const Button = styled.p`
  cursor: pointer;
  font-size: 16px;
  outline: none;
  text-decoration: underline;

  &:hover {
    color: #2828bd;
  }
`;

const ResultGroup = styled.div`
  color: #545454;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  width: 100%;

  > div {
    width: 48%;
  }
`;

const Result = ({
  title,
  label,
}) => {
  return (
    <div>
      <div>{title}</div>
      <ResultBox>{label}</ResultBox>
    </div>
  );
};

const ResultBox = styled.div`
  background-color: #f7f7f7;
  border-radius: 3px;
  font-size: 13px;
  height: 140px;
  margin-top: 9px;
  padding: 5px 6px;
`;

const Credit = styled.div`
  color: gray;
  margin-top: 20px;

  span {
    margin-right: 12px;
    
  }

  a {
    text-decoration: none;
  }
`;

const Root = () => {
  return (
    <StyledRoot>
      <GlobalStyle />
      <Wrapper>
        <Title>
          Interrobang - Playground
        </Title>
        <Subtitle>
          subtitle
        </Subtitle>
        <Textarea>
          {textareaPlaceholder}
        </Textarea>
        <Button>convert</Button>
        <ResultGroup>
          <Result
            label="blabla"
            title={'Summary'}
          />
          <Result 
            label="fwle"
            title={'Questions'}
          />
        </ResultGroup>
        <Credit>
          <div>
            <span>Interrobang</span>
            <span><a href="https://github.com/interrobang-org">Github</a></span>
          </div>
        </Credit>
      </Wrapper>
    </StyledRoot>
  );
};


export default Root;
