import { Injectable } from '@angular/core';

import { AppConfigService } from '../../app-config.service';
import { RxStompService } from './rx-stomp.service';
import { AbisProjectModel } from '../models/abis-project';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveMqService {
  constructor() { }

  setUpConfig(abisProjectData: AbisProjectModel) {
    let ctkRxStompConfig = {
      // Which server?
      //brokerURL: `ws://${abisProjectData.url}/ws`,
      brokerURL: `${abisProjectData.url}`,
      // Headers
      // Typical keys: login, passcode, host
      connectHeaders: {
        login: abisProjectData.username,
        passcode: abisProjectData.password,
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeatIncoming: 0, // Typical value 0 - disabled
      heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 500 (500 milli seconds)
      reconnectDelay: 0,

      // Will log diagnostics on console
      // It can be quite verbose, not recommended in production
      // Skip this key to stop logging to console
      debug: (msg: string): void => {
        console.log(new Date(), msg);
      },
    }
    const rxStomp = rxStompServiceFactory(ctkRxStompConfig);
    return rxStomp;
  }

  sendToQueue(rxStompService: RxStompService, abisProjectData: AbisProjectModel, message: string) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`abisProjectData: ${abisProjectData}`);
        if (rxStompService.connected()) {
          rxStompService.publish({ destination: `${abisProjectData.outboundQueueName}`, body: message });
          resolve({
            "status": "success"
          })
        } else {
          resolve({
            "status": "failure"
          })
        }
      } catch (e) {
        console.log(e);
        resolve({
          "status": "failure"
        })
      }
    });
  }

  readFromQueue(rxStompService: RxStompService, abisProjectData: AbisProjectModel, message: string) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`abisProjectData: ${abisProjectData}`);
        if (rxStompService.connected()) {
          rxStompService
            .watch('abis-to-mosip')
            .subscribe((message: Message) => {
              console.log(message.body);
              //this.receivedMessages.push(message.body);
              resolve( message.body);
            });
        } else {
          resolve({
            "status": "failure"
          })
        }
      } catch (e) {
        console.log(e);
        resolve({
          "status": "failure"
        })
      }
    });
  }

} 