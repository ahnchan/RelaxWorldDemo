// import 'https://cdn.jsdelivr.net/npm/socket.io-client@3.1.0/dist/socket.io.js';
// import {entity} from './entity.js';

import io from 'socket.io-client'; 


export const network_controller = (() => {

  // class NetworkController extends entity.Component {

  class NetworkController {
    constructor(params) {
      // super();

      this.playerID_ = null;
      this.SetupSocket_();
    }

    GenerateRandomName_() {
      const names1 = [
          'Aspiring', 'Nameless', 'Cautionary', 'Excited',
          'Modest', 'Maniacal', 'Caffeinated', 'Sleepy',
          'Passionate', 'Medical',
      ];
      const names2 = [
          'Painter', 'Cheese Guy', 'Giraffe', 'Snowman',
          'Doberwolf', 'Cocktail', 'Fondler', 'Typist',
          'Noodler', 'Arborist', 'Peeper'
      ];
      const n1 = names1[
          Math.floor(Math.random() * names1.length)];
      const n2 = names2[
          Math.floor(Math.random() * names2.length)];
      return n1 + ' ' + n2;
    }

    SetupSocket_() {
      this.socket_ = io('ws://localhost:3000', {
          reconnection: false,
          transports: ['websocket'],
          timeout: 10000,
      });
  
      this.socket_.on("connect", () => {
        console.log(this.socket_.id);
        const randomName = this.GenerateRandomName_();
        // Input validation is for losers
        this.socket_.emit(
            'login.commit', randomName);
      });
  
      this.socket_.on("disconnect", () => {
        console.log('DISCONNECTED: ' + this.socket_.id); // undefined
      });
  
      this.socket_.onAny((e, d) => {
        this.OnMessage_(e, d);
      });
    }

    SendChat(txt) {
      this.socket_.emit('chat.msg', txt);
    }

    SendTransformUpdate(transform) {
      this.socket_.emit('world.update', transform);
    }

    SendActionAttack_() {
      this.socket_.emit('action.attack');
    }

    SendInventoryChange_(packet) {
      this.socket_.emit('world.inventory', packet);
    }

    GetEntityID_(serverID) {
      if (serverID == this.playerID_) {
        return 'player';
      } else {
        return '__npc__' + serverID;
      }
    }
    
    OnMessage_(e, d) {
      if (e == 'world.player') {
        console.log('entering world: ' + d.id);
        console.log(JSON.stringify(d));
        this.playerID_ = d.id;

      } else if (e == 'world.update') {
      } else if (e == 'chat.message') {
      } else if (e == 'world.inventory') {
      }
    }
  };

  return {
      NetworkController: NetworkController
  };
})();