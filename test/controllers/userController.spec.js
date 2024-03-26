const sinon = require('sinon');
const assert = require('assert');
const userController = require('../../controllers/userController');

describe('userController', () => {
    const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
        return res;
    };

    describe('sendRequestResponse', () => {
        it('should send a 200 response with correct message', () => {
            const result = {};
            const req = { params: { id: 123 } }
            const res = mockResponse();
            userController.sendRequestResponse(req, res, result);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.send, result);
        });
        it('should send a 404 response with error message', () => {
            const result = null;
            const req = { params: { id: 123 } }
            const res = mockResponse();
            userController.sendRequestResponse(req, res, result);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.send, { message: `User id "123" doesn't exists` });
        });
    });

    describe('catchRequestError', () => {
        it('should send a 404 response with correct message', () => {
            const error = { kind: 'ObjectId' };
            const req = { params: { id: 123 } }
            const res = mockResponse();
            userController.catchRequestError(req, res, error);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.send, { message: `User id "123" not valid` });
        });
        it('should send a 400 response with correct message if age is not valid', () => {
            const error = { errors: { age: { message: '"Age" must be a number' } } };
            const req = { params: { id: 123 } }
            const res = mockResponse();
            userController.catchRequestError(req, res, error);
            sinon.assert.calledWith(res.status, 400);
            sinon.assert.calledWith(res.send, { message: `"Age" must be a number` });
        });
        it('should send a 404 response with default error message', () => {
            const error = { errors: { message: 'Error message' } };
            const req = { params: { id: 123 } }
            const res = mockResponse();
            userController.catchRequestError(req, res, error);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.send, { message: `Error message` });
        });
    });

});