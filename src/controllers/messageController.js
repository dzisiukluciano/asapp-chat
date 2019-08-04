const messageService = require('../services/messageService');
const {
  resolveCreateResponse,
  resolveResponse,
} = require('../handlers/responseHandler');

const MessageController = module.exports;

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     TextSpec:
 *       required:
 *         - type
 *         - text
 *       properties:
 *         type:
 *           type: string
 *         text:
 *           type: string
 *     ImageSpec:
 *       required:
 *         - type
 *         - url
 *         - height
 *         - width
 *       properties:
 *         type:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         height:
 *           type: integer
 *         width:
 *           type: integer
 *     VideoSpec:
 *       required:
 *         - type
 *         - url
 *         - source
 *       properties:
 *         type:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         source:
 *           type: string
 *           enum:
 *             - youtube
 *             - vimeo
 *     ContentSpec:
 *       description: Message content (one of three possible types).
 *       required:
 *         - type
 *       properties:
 *         type:
 *           type: string
 *       discriminator:
 *         propertyName: type
 *         mapping:
 *           text: "#/components/schemas/TextSpec"
 *           image: "#/components/schemas/ImageSpec"
 *           video: "#/components/schemas/VideoSpec"
 *       oneOf:
 *         - $ref: "#/components/schemas/TextSpec"
 *         - $ref: "#/components/schemas/ImageSpec"
 *         - $ref: "#/components/schemas/VideoSpec"
 *     MessageSpec:
 *       required:
 *         - sender
 *         - recipient
 *         - content
 *       properties:
 *         sender:
 *           type: integer
 *           format: int64
 *           description: User ID of sender.
 *         recipient:
 *           type: integer
 *           format: int64
 *           description: User ID of recipient.
 *         content:
 *           $ref: "#/components/schemas/ContentSpec"
 *     MessageCreatedResp:
 *       required:
 *         - id
 *         - timestamp
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Message ID.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp for this message, as recorded on the server.
 *     Message:
 *       required:
 *         - id
 *         - timestamp
 *         - sender
 *         - recipient
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Message ID.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: UTC Timestamp at which server received this message.
 *         sender:
 *           type: integer
 *           format: int64
 *           description: User ID of message sender.
 *         recipient:
 *           type: integer
 *           format: int64
 *           description: User ID of message recipient.
 *         content:
 *           $ref: "#/components/schemas/ContentSpec"
 *     Messages:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Message"
 *     Error:
 *       type: object
 *     Errors:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Error"
 *   responses:
 *       Error:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Errors"
 *       Unauthorized:
 *         description: Unauthorized
 *       No-Content:
 *         description: No-Content
 */

/**
 * @swagger
 *
 * /messages:
 *   post:
 *     summary: Send a message from one user to another.
 *     operationId: sendMessage
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Message
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MessageSpec"
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageCreatedResp"
 *       '400':
 *         $ref: "#/components/responses/Error"
 */
MessageController.sendMessage = async (req, res) => {
  const resp = await resolveCreateResponse(messageService.sendMessage(req.body));
  res.status(resp.status).json(resp.data);
};

/**
 * @swagger
 *
 * /messages:
 *   get:
 *     summary: Fetch all existing messages to a given recipient, within a range of message IDs.
 *     operationId: getMessages
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: recipient
 *         in: query
 *         required: true
 *         description: User ID of recipient.
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: start
 *         in: query
 *         required: true
 *         description: Starting message ID.
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit the response to this many messages.
 *         schema:
 *           type: integer
 *           default: 100
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Messages"
 *       '400':
 *         $ref: "#/components/responses/Error"
 */
MessageController.getMessages = async (req, res) => {
  const resp = await resolveResponse(messageService.getMessages(req.query));
  res.status(resp.status).json(resp.data);
};
