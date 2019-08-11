const logger = require('../utils/logger').getLogger('MessageService');
const userRepository = require('../repositories/userRepository');
const messageRepository = require('../repositories/messageRepository');
const cache = require('../utils/cache');

const MessageService = module.exports;


// shouldn't I validate if the sender is the authenticated user?
// that would be easy but the requirements don't mention that restriction
MessageService.sendMessage = async (body) => {
  const { sender: senderId, recipient: recipientId, content: messageContent } = body;
  const { type, ...content } = messageContent;
  const getUserPromises = [senderId, recipientId].map(id => userRepository.findOneById(id));
  const [sender, recipient] = await Promise.all(getUserPromises);
  if (!sender || !recipient) {
    throw new Error(`${!sender ? 'Sender' : 'Recipient'} user not found.`);
  }
  logger.debug(`Message from ${sender.username} to ${recipient.username}`);
  const { id, createdAt: timestamp } = await messageRepository.saveMessage({ ...body, type, content });
  cache.invalidateKeys(`msg-recipient:${recipientId}`);

  return { id, timestamp };
};

const fetchMessages = (recipientId, start, limit) => async () => {
  const records = await messageRepository.findMessages(recipientId, start, limit);

  /*
    The next map would be unnecessary but it must be done because of the
    swagger specification. In my opinion the "type" field should be outside
    of the "content" field, as I defined in the database schema.
  */
  return records.map(({
    id,
    createdAt: timestamp,
    sender,
    recipient,
    type,
    content,
  }) => ({
    id,
    timestamp,
    sender,
    recipient,
    content: { ...content, type },
  }));
};

MessageService.getMessages = async (params) => {
  const { recipient: recipientId, start, limit = 100 } = params;
  const recipientRecord = await userRepository.findOneById(recipientId);
  if (!recipientRecord) {
    throw new Error('Recipient not found.');
  }
  logger.debug(`Fetching ${limit} messages received by ${recipientRecord.username}`);

  return cache.remember(`msg-recipient:${recipientId}:start:${start}:limit:${limit}`,
    fetchMessages(recipientId, start, limit), 10);
};
