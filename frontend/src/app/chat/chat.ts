import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface Message {
  author: string;
  text: string;
  time: string;
}

interface Channel {
  name: string;
}

interface DM {
  user: string;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  // Views: 'server' | 'dm'
  view: 'server' | 'dm' = 'server';
  showSettings = false;

  currentUser = 'You';

  // Server
  channels: Channel[] = [
    { name: 'general' },
    { name: 'random' },
    { name: 'announcements' },
    { name: 'off-topic' }
  ];
  activeChannel = 'general';
  // DMs
  dms: DM[] = [];
  activeDm: string | null = null;

  messages: Record<string, Message[]> = {
    general: [
      { author: 'Alice', text: 'Hey everyone!', time: '12:00 PM' },
      { author: 'Bob', text: 'Welcome to the server!', time: '12:01 PM' }
    ],
    random: [],
    announcements: [
      { author: 'Admin', text: 'Server is live!', time: '11:00 AM' }
    ],
    'off-topic': []
  };

  messageInput = '';

  get activeKey(): string {
    return this.view === 'server' ? this.activeChannel : (this.activeDm ?? '');
  }

  get activeMessages(): Message[] {
    return this.messages[this.activeKey] ?? [];
  }

  get headerLabel(): string {
    if (this.showSettings) return 'Settings';
    if (this.view === 'dm') return this.activeDm ? `@${this.activeDm}` : 'Direct Messages';
    return `#${this.activeChannel}`;
  }

  selectChannel(name: string) {
    this.activeChannel = name;
    this.showSettings = false;
  }

  selectDm(user: string) {
    this.activeDm = user;
    this.showSettings = false;
  }

  switchToServer() {
    this.view = 'server';
    this.showSettings = false;
  }

  switchToDm() {
    this.view = 'dm';
    this.showSettings = false;
  }

  openSettings() {
    this.showSettings = true;
  }

  sendMessage() {
    const text = this.messageInput.trim();
    if (!text || this.showSettings) return;
    const key = this.activeKey;
    if (!key) return;
    if (!this.messages[key]) this.messages[key] = [];
    this.messages[key].push({
      author: this.currentUser,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.messageInput = '';
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
