const sinon = require('sinon');
const assert = require('assert');
const interactionController = require('../../controllers/interactionController');

describe('interactionController', () => {
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
            interactionController.sendRequestResponse(req, res, result);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.send, result);
        });
        it('should send a 404 response with error message', () => {
            const result = null;
            const req = { params: { id: 123 } }
            const res = mockResponse();
            interactionController.sendRequestResponse(req, res, result);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.send, {message: 'Interaction id "123" not found'});
        });
    });

    describe('catchRequestError', () => {
        it('should send a 404 response with correct message', () => {
            const result = { error: {} };
            const req = { params: { id: 123 } }
            const res = mockResponse();
            interactionController.catchRequestError(req, res, result);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.send, result);
        });
    });
});