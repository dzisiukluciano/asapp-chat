const { dbWrite, dbRead } = require('../utils/DB');
const { MESSAGE_TABLE } = require('../configs/DBConfig');
const serializeData = require('../utils/serializeData');

const MessageRepository = module.exports;

MessageRepository.saveMessage = async (messageData) => {
  const serializedData = serializeData.toPostgres(messageData);

  const [result] = await dbWrite.insert(serializedData).into(MESSAGE_TABLE).returning(['id', 'created_at']);

  return result;
};

MessageRepository.findMessages = async (recipientId, start, limit) => (
  dbRead.select('*')
    .from(MESSAGE_TABLE)
    .where('recipient', recipientId)
    .andWhere('id', '>=', start)
    .limit(limit)
);
