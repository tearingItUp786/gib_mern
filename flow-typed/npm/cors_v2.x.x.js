// flow-typed signature: e7e4e4365ed4a204f6de856d9f08729e
// flow-typed version: 606c536da0/cors_v2.x.x/flow_>=v0.53.x

// @flow
import type { $Request as Request, $Response as Response, NextFunction } from "express";

interface RequestHandler {
     (req: Request, res: Response, next?: NextFunction): mixed;
 }

type CustomOrigin = (
    requestOrigin: string,
    callback: (err: Error | null, allow?: boolean) => void
) => void;

type CorsOptions = {
    origin?: boolean | string | RegExp | string[] | RegExp[] | CustomOrigin;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
}

declare module "cors" {
    declare module.exports: (options?: CorsOptions) => RequestHandler;
}
