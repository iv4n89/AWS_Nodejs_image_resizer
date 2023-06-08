import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ResponseBuilder {
    private json?: any = {};
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    public Json(json: any) {
        this.json = json;
        return this;
    }

    public Ok() {
        this.response = this.response.status(StatusCodes.OK);
        return this;
    }

    public BadGateway() {
        this.response = this.response.status(StatusCodes.BAD_GATEWAY);
        return this;
    }

    public BadRequest() {
        this.response = this.response.status(StatusCodes.BAD_REQUEST);
        return this;
    }

    public Forbidden() {
        this.response = this.response.status(StatusCodes.FORBIDDEN);
        return this;
    }

    public Unauthorized() {
        this.response = this.response.status(StatusCodes.UNAUTHORIZED);
        return this;
    }

    public ServerError() {
        this.response = this.response.status(StatusCodes.INTERNAL_SERVER_ERROR);
        return this;
    }

    public Created() {
        this.response = this.response.status(StatusCodes.CREATED);
        return this;
    }

    public Accepted() {
        this.response = this.response.status(StatusCodes.ACCEPTED);
        return this;
    }

    public NoContent() {
        this.response = this.response.status(StatusCodes.NO_CONTENT);
        return this.response;
    }

    public build() {
        return this.response.json(this.json);
    }
}