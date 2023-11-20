/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "neighbour";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GetNeighbourRequest {
  name: string;
  latitude: number;
  longitude: number;
}

export interface GetNeighbourResponse {
  id: string;
  name: string;
  coordinates: Coordinates | undefined;
}

export interface createNeighbourRequest {
  name: string;
}

export interface createNeighbourResponse {
  name: string;
}

export const NEIGHBOUR_PACKAGE_NAME = "neighbour";

export interface neighbourServiceClient {
  getNeighbour(request: GetNeighbourRequest): Observable<GetNeighbourResponse>;

  createNeighbour(request: createNeighbourRequest): Observable<createNeighbourResponse>;
}

export interface neighbourServiceController {
  getNeighbour(
    request: GetNeighbourRequest,
  ): Promise<GetNeighbourResponse> | Observable<GetNeighbourResponse> | GetNeighbourResponse;

  createNeighbour(
    request: createNeighbourRequest,
  ): Promise<createNeighbourResponse> | Observable<createNeighbourResponse> | createNeighbourResponse;
}

export function neighbourServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getNeighbour", "createNeighbour"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("neighbourService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("neighbourService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NEIGHBOUR_SERVICE_NAME = "neighbourService";
