/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * Interfaces definitions
 */
declare module app {

  interface Settings {
    httpPort: number;
  }

  interface Map<T> {
    [index: string]: T;
  }

  interface EventHandler<T> {
    (event: T): void;
  }

  interface KernelConfig {
    iopubPort: number;
    shellPort: number;
  }

  interface IKernel {
    id: string;
    config: KernelConfig;
    execute (request: ExecuteRequest): void;
    onExecuteReply (callback: EventHandler<ExecuteReply>): void;
    onExecuteResult (callback: EventHandler<ExecuteResult>): void;
    onKernelStatus (callback: EventHandler<KernelStatus>): void;
    shutdown (): void;
    start (): void;
  }

  interface IKernelManager {
    create (config: KernelConfig): IKernel;
    get (id: string): IKernel;
    list (): IKernel[];
    shutdown (id: string): void;
    shutdownAll (): void;
  }

  interface ISession {
    id: string;
    getKernelId (): string;
    getUserConnectionId (): string;
    updateUserConnection (connection: IUserConnection): void;
  }

  interface IUserConnection {
    id: string;
    getSessionId (): string;
    onDisconnect (callback: EventHandler<IUserConnection>): void;
    onExecuteRequest (callback: EventHandler<ExecuteRequest>): void;
    sendExecuteReply (reply: ExecuteReply): void;
    sendExecuteResult (result: ExecuteResult): void;
    sendKernelStatus (status: KernelStatus): void;
  }

  interface IUserConnectionManager {
    onConnect (callback: EventHandler<IUserConnection>): void;
    onDisconnect (callback: EventHandler<IUserConnection>): void;
  }

}