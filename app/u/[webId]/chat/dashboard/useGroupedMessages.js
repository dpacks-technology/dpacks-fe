import { useMemo } from 'react';

const useGroupedMessages = (messages) => {
    return useMemo(() => {
        const groupedMessages = messages.reduce((groups, message) => {
            if (!groups[message.visitorId]) {
                groups[message.visitorId] = [];
            }
            groups[message.visitorId].push(message);
            return groups;
        }, {});

        return Object.entries(groupedMessages).map(([visitorId, messages]) => ({
            visitorId,
            visitorName: messages[0].visitorName,
            lastMessage: messages[messages.length - 1],
        }));
    }, [messages]);
};

export default useGroupedMessages;
