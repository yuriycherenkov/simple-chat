import * as React from 'react';
import styledComponents from 'styled-components';
import UsersList from '../UsersList';

interface IProps {
  users: any;
}

const ChatWrapper = styledComponents.div`
    display: flex;
`;

const ChatBody = styledComponents.div`
    flex: 1 0 70%;
`;

const ChatHistory: React.SFC<IProps> = () => (
  (
    <ChatWrapper>
      <ChatBody>ChatHistory</ChatBody>
      <UsersList />
    </ChatWrapper>
  ));

export default ChatHistory;
