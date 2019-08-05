const userService = require('../services/userService');
const {
  resolveCreateResponse,
  resolveResponse,
} = require('../handlers/responseHandler');

const UserController = module.exports;

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UserSpec:
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minimum: 1
 *           maximum: 50
 *         password:
 *           type: string
 *           format: password
 *     UserCreateResp:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *     UserLoggedResp:
 *       required:
 *         - id
 *         - token
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: User ID of the user who logged in.
 *         token:
 *           type: string
 *           description: Authentication token to use for API calls on behalf of\nthis user.
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
 * /users/:
 *   post:
 *     summary: Create a user in the system.
 *     operationId: createUser
 *     tags:
 *       - user
 *     requestBody:
 *       description: User
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserSpec"
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserCreateResp"
 *       '400':
 *         $ref: "#/components/responses/Error"
 */
UserController.createUser = async (req, res) => {
  const resp = await resolveCreateResponse(userService.createUser(req.body));
  res.status(resp.status).json(resp.data);
};

/**
 * @swagger
 *
 * /login/:
 *   post:
 *     summary: Log in as an existing user.
 *     operationId: login
 *     tags:
 *       - user
 *     requestBody:
 *       description: User
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserSpec"
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserLoggedResp"
 *       '400':
 *         $ref: "#/components/responses/Error"
 */
UserController.login = async (req, res) => {
  const resp = await resolveResponse(userService.login(req.body));
  res.status(resp.status).json(resp.data);
};
