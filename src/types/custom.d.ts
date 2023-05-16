import Buffer from "buffer";
import { IncomingMessage } from 'http';

declare module 'http' {
  interface IncomingMessage {
    raw_body: Buffer;
  }
}